// components/dashboard/DashboardLayout.tsx
import StatsCard from "./StatsCard";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Users" value="1,204" />
        <StatsCard title="Sales" value="$9,870" />
        <StatsCard title="Growth" value="24%" />
      </div>
    </div>
  );
}
