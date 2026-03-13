import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const tripId = searchParams.get("tripId");

  if (!tripId) {
    return NextResponse.json({ error: "Missing tripId" }, { status: 400 });
  }

  // Verify membership
  const { data: membership } = await supabase
    .from("trip_members")
    .select("id")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: "Not a trip member" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("packing_items")
    .select("*, gear_item:gear_items(*, photos:gear_photos(*))")
    .eq("trip_id", tripId)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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
  const { trip_id, gear_item_id, bag_slot_id, is_shared } = body;

  if (!trip_id || !gear_item_id) {
    return NextResponse.json(
      { error: "Missing trip_id or gear_item_id" },
      { status: 400 }
    );
  }

  // Verify membership
  const { data: membership } = await supabase
    .from("trip_members")
    .select("id")
    .eq("trip_id", trip_id)
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: "Not a trip member" }, { status: 403 });
  }

  // Get max sort_order for the bag slot
  const { data: existing } = await supabase
    .from("packing_items")
    .select("sort_order")
    .eq("trip_id", trip_id)
    .eq("bag_slot_id", bag_slot_id ?? null)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextSort = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;

  const { data, error } = await supabase
    .from("packing_items")
    .insert({
      trip_id,
      gear_item_id,
      bag_slot_id: bag_slot_id ?? null,
      packed_by: user.id,
      is_shared: is_shared ?? false,
      quantity: body.quantity ?? 1,
      sort_order: nextSort,
    })
    .select("*, gear_item:gear_items(*, photos:gear_photos(*))")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
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

  const { data, error } = await supabase
    .from("packing_items")
    .update(updates)
    .eq("id", id)
    .eq("packed_by", user.id)
    .select("*, gear_item:gear_items(*, photos:gear_photos(*))")
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

  const { error } = await supabase
    .from("packing_items")
    .delete()
    .eq("id", id)
    .eq("packed_by", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
