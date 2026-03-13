import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const type = formData.get("type") as "gear" | "bike" | null;
  const parentId = formData.get("parentId") as string | null;

  if (!file || !type || !parentId) {
    return NextResponse.json(
      { error: "Missing file, type, or parentId" },
      { status: 400 }
    );
  }

  // Build storage path
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const storagePath = `${user.id}/${type}/${parentId}/${timestamp}.${ext}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("photos").getPublicUrl(storagePath);

  // Insert photo record
  const table = type === "gear" ? "gear_photos" : "bike_photos";
  const foreignKey = type === "gear" ? "gear_item_id" : "bike_id";

  // Count existing photos to determine sort order
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(foreignKey, parentId);

  const isPrimary = (count ?? 0) === 0;

  const { data: photoRecord, error: insertError } = await supabase
    .from(table)
    .insert({
      [foreignKey]: parentId,
      photo_url: publicUrl,
      storage_path: storagePath,
      is_primary: isPrimary,
      sort_order: count ?? 0,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      url: publicUrl,
      path: storagePath,
      id: photoRecord.id,
    },
    { status: 201 }
  );
}
