/** Stitch-faithful stat card matching the Admin Dashboard design */
export default function StatCard({ label, value, icon, badge, badgeColor = 'green' }) {
  const badgeColors = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    slate: 'text-slate-500 bg-slate-100',
    amber: 'text-amber-600 bg-amber-50',
  };
  const iconColors = {
    red: 'bg-red-50 text-red-600',
    primary: 'bg-primary/10 text-primary',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${iconColors[icon.color] || 'bg-primary/10 text-primary'}`}>
          <span className="material-symbols-outlined">{icon.name}</span>
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${badgeColors[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
    </div>
  );
}
