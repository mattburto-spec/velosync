import { createSupabaseServer } from "@/lib/supabase/server";
import { BikeDetail } from "@/components/garage/BikeDetail";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ bikeId: string }>;
}

export default async function BikeDetailPage({ params }: PageProps) {
  const { bikeId } = await params;
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: bike } = await supabase
    .from("bikes")
    .select("*, photos:bike_photos(*), bag_slots(*)")
    .eq("id", bikeId)
    .eq("user_id", user.id)
    .single();

  if (!bike) {
    notFound();
  }

  return <BikeDetail bike={bike} />;
}
