import { createSupabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { tripId, email } = body;

  if (!tripId || !email) {
    return NextResponse.json(
      { error: "Missing tripId or email" },
      { status: 400 }
    );
  }

  // Verify the current user is a member (ideally owner) of the trip
  const { data: membership } = await supabase
    .from("trip_members")
    .select("role")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: "Not a trip member" }, { status: 403 });
  }

  // Look up the invited user by email using the admin client
  // (auth.users is only accessible with the service role key)
  const { data: usersData, error: lookupError } =
    await supabaseAdmin.auth.admin.listUsers();

  if (lookupError) {
    return NextResponse.json(
      { error: "Failed to look up user" },
      { status: 500 }
    );
  }

  const invitedAuthUser = usersData.users.find((u) => u.email === email);

  if (!invitedAuthUser) {
    return NextResponse.json(
      { error: "User not found. They need to sign up first." },
      { status: 404 }
    );
  }

  // Check if already a member
  const { data: existingMember } = await supabase
    .from("trip_members")
    .select("id")
    .eq("trip_id", tripId)
    .eq("user_id", invitedAuthUser.id)
    .single();

  if (existingMember) {
    return NextResponse.json(
      { error: "User is already a member of this trip" },
      { status: 409 }
    );
  }

  // Add as member
  const { data: newMember, error: insertError } = await supabase
    .from("trip_members")
    .insert({
      trip_id: tripId,
      user_id: invitedAuthUser.id,
      role: "member",
    })
    .select("*, user:users(*)")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(newMember, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const tripId = searchParams.get("tripId");
  const userId = searchParams.get("userId");

  if (!tripId || !userId) {
    return NextResponse.json(
      { error: "Missing tripId or userId" },
      { status: 400 }
    );
  }

  // Verify the current user is the owner
  const { data: membership } = await supabase
    .from("trip_members")
    .select("role")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .single();

  if (!membership || membership.role !== "owner") {
    return NextResponse.json(
      { error: "Only the trip owner can remove members" },
      { status: 403 }
    );
  }

  // Don't allow owner to remove themselves
  if (userId === user.id) {
    return NextResponse.json(
      { error: "Cannot remove yourself as owner" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("trip_members")
    .delete()
    .eq("trip_id", tripId)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
