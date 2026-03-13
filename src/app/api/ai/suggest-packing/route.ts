import { createSupabaseServer } from "@/lib/supabase/server";
import { generatePackingSuggestion } from "@/lib/ai/suggest-packing";
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
  const { tripId } = body;

  if (!tripId) {
    return NextResponse.json({ error: "Missing tripId" }, { status: 400 });
  }

  // Verify trip membership
  const { data: membership } = await supabase
    .from("trip_members")
    .select("id")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: "Not a trip member" }, { status: 403 });
  }

  // Fetch trip details
  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single();

  if (tripError || !trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  // Fetch user's gear inventory
  const { data: gearInventory, error: gearError } = await supabase
    .from("gear_items")
    .select("*")
    .eq("user_id", user.id);

  if (gearError) {
    return NextResponse.json({ error: gearError.message }, { status: 500 });
  }

  // Fetch existing packing items for this trip
  const { data: existingPacking, error: packingError } = await supabase
    .from("packing_items")
    .select("*, gear_item:gear_items(*)")
    .eq("trip_id", tripId);

  if (packingError) {
    return NextResponse.json({ error: packingError.message }, { status: 500 });
  }

  try {
    const suggestion = await generatePackingSuggestion({
      trip,
      gearInventory: gearInventory ?? [],
      existingPacking: existingPacking ?? [],
    });

    // Save suggestion to ai_suggestions table
    const { data: saved, error: saveError } = await supabase
      .from("ai_suggestions")
      .insert({
        trip_id: tripId,
        user_id: user.id,
        suggestion_type: "packing_list",
        input_context: {
          tripName: trip.name,
          terrain: trip.terrain,
          climate: trip.climate,
          inventoryCount: gearInventory?.length ?? 0,
          packedCount: existingPacking?.length ?? 0,
        },
        suggestion: suggestion as unknown as Record<string, unknown>,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Failed to save AI suggestion:", saveError.message);
    }

    return NextResponse.json({
      id: saved?.id,
      ...suggestion,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate suggestions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
