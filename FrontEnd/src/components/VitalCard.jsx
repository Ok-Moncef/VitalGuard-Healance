/** Vital card matching Patient Dashboard style */
export default function VitalCard({ label, value, unit, icon, trend, trendColor = 'green' }) {
  const trendColors = {
    green: 'text-green-500',
    red: 'text-red-500',
  };
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-slate-900 text-3xl font-bold">{value}</p>
        {unit && <p className="text-slate-500 text-sm">{unit}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-bold mt-2 ${trendColors[trendColor]}`}>
          <span className="material-symbols-outlined text-sm">{trendColor === 'green' ? 'trending_up' : 'trending_down'}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
