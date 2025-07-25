// components/dashboard/StatsCard.tsx
type Props = {
  title: string;
  value: string;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-2xl font-bold text-blue-600 mt-1">{value}</p>
    </div>
  );
}
