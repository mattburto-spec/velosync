import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get trips where user is creator or member
  const { data: memberRows, error: memberError } = await supabase
    .from("trip_members")
    .select("trip_id")
    .eq("user_id", user.id);

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  const tripIds = memberRows?.map((r) => r.trip_id) ?? [];

  if (tripIds.length === 0) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("trips")
    .select("*, members:trip_members(id, user_id, role), packing_items(id)")
    .in("id", tripIds)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten counts for the client
  const trips = (data ?? []).map((trip) => ({
    ...trip,
    member_count: trip.members?.length ?? 0,
    item_count: trip.packing_items?.length ?? 0,
  }));

  return NextResponse.json(trips);
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Create the trip
  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .insert({ ...body, created_by: user.id })
    .select()
    .single();

  if (tripError) {
    return NextResponse.json({ error: tripError.message }, { status: 500 });
  }

  // Auto-add creator as owner
  const { error: memberError } = await supabase.from("trip_members").insert({
    trip_id: trip.id,
    user_id: user.id,
    role: "owner",
  });

  if (memberError) {
    // Rollback trip creation
    await supabase.from("trips").delete().eq("id", trip.id);
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json(
    { ...trip, member_count: 1, item_count: 0 },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Verify membership
  const { data: membership } = await supabase
    .from("trip_members")
    .select("role")
    .eq("trip_id", id)
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: "Not a trip member" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("trips")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Only owner can delete
  const { data: membership } = await supabase
    .from("trip_members")
    .select("role")
    .eq("trip_id", id)
    .eq("user_id", user.id)
    .single();

  if (!membership || membership.role !== "owner") {
    return NextResponse.json(
      { error: "Only the trip owner can delete" },
      { status: 403 }
    );
  }

  const { error } = await supabase.from("trips").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
