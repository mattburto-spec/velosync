import { GearGrid } from "@/components/gear/GearGrid";

export const metadata = {
  title: "Gear Inventory | VeloSync",
};

export default function GearPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-text">Gear Inventory</h1>
        <p className="mt-1 text-sm text-muted">
          Track all your bikepacking gear in one place.
        </p>
      </div>
      <GearGrid />
    </div>
  );
}
