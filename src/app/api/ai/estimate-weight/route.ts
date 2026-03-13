import { createSupabaseServer } from "@/lib/supabase/server";
import { estimateItemWeight } from "@/lib/ai/estimate-weight";
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
  const { name, category, brand, model } = body;

  if (!name || !category) {
    return NextResponse.json(
      { error: "Missing name or category" },
      { status: 400 }
    );
  }

  try {
    const estimate = await estimateItemWeight({ name, category, brand, model });
    return NextResponse.json(estimate);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to estimate weight";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
