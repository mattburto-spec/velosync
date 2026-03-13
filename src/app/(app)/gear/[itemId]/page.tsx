import { createSupabaseServer } from "@/lib/supabase/server";
import { GearDetail } from "@/components/gear/GearDetail";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ itemId: string }>;
}

export default async function GearItemPage({ params }: PageProps) {
  const { itemId } = await params;
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: item } = await supabase
    .from("gear_items")
    .select("*, photos:gear_photos(*)")
    .eq("id", itemId)
    .eq("user_id", user.id)
    .single();

  if (!item) {
    notFound();
  }

  return <GearDetail item={item} />;
}
