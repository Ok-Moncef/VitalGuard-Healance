export default function MapPlaceholder({ markers = [], height = 'h-80', showRoute = false }) {
  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-green-100 border border-slate-200`}>
      {/* Grid pattern simulating map tiles */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Road lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#94a3b8" strokeWidth="6" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#94a3b8" strokeWidth="4" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#94a3b8" strokeWidth="6" />
        <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#94a3b8" strokeWidth="4" />
        {showRoute && (
          <polyline
            points="30,80 30,60 65,60 65,40 85,40"
            fill="none" stroke="#2563eb" strokeWidth="4"
            strokeDasharray="8,4" className="animate-pulse"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
          />
        )}
      </svg>

      {/* Block fills */}
      <div className="absolute top-[10%] left-[5%] w-[22%] h-[25%] rounded-lg bg-slate-200 opacity-50" />
      <div className="absolute top-[10%] left-[35%] w-[25%] h-[20%] rounded-lg bg-slate-200 opacity-50" />
      <div className="absolute top-[10%] right-[5%] w-[20%] h-[25%] rounded-lg bg-blue-200 opacity-40" />
      <div className="absolute bottom-[10%] left-[5%] w-[20%] h-[22%] rounded-lg bg-green-200 opacity-50" />
      <div className="absolute bottom-[10%] right-[5%] w-[28%] h-[20%] rounded-lg bg-slate-200 opacity-50" />

      {/* Markers */}
      {markers.map((m, i) => (
        <div key={i}
          className="absolute flex flex-col items-center gap-1 z-10"
          style={{ left: m.x ?? `${30 + i * 25}%`, top: m.y ?? `${40 + i * 15}%`, transform: 'translate(-50%, -100%)' }}
        >
          <div className={`flex items-center gap-1.5 ${m.type === 'doctor' ? 'bg-brand-600' : 'bg-emergency-600'} text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg whitespace-nowrap`}>
            <span>{m.type === 'doctor' ? '👨‍⚕️' : '📍'}</span>
            <span>{m.label}</span>
          </div>
          <div className={`w-3 h-3 rounded-full ${m.type === 'doctor' ? 'bg-brand-600' : 'bg-emergency-600'} ring-4 ring-white shadow-lg`} />
        </div>
      ))}

      {/* Compass */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold text-slate-700">N</div>

      {/* Scale */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1">
        <div className="w-16 h-1 bg-slate-500 rounded" />
        <span className="text-xs text-slate-600 font-medium">0.5 mi</span>
      </div>

      {/* Map label */}
      <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 shadow-sm">
        <span className="text-xs text-slate-600 font-semibold">Live Map</span>
      </div>
    </div>
  );
}
