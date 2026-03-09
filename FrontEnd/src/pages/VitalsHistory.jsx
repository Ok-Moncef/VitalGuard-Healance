const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuALQ9Fld-cWxxbmSpt0JSSA-lAj6BcSuQyUIUipFyOSlZmseuNfgyZLav5n7nIUtrxdUfp4gs7V_ZJbiWR2_RUK40pI7JhZz2tb3xbiscY_Gf_Qd0WmTOsJGv3TVR7SCAcWShY25IfQraG6rXGNVbGjDvT_KNCXuJ4e0sHxqZtphfEp6AqHolz9D0Pk2VGYDmWa-43ewrjTqGgsm88lSp2PvGRBNjULX9HDw1cnO3yW_JrQGbuGQOIg_AW9OnY3o0f0lZUTyBruP_M';

// Heart rate SVG path from Stitch HTML
const HR_PATH = 'M0 109C15.4 109 15.4 21 30.8 21C46.2 21 46.2 41 61.6 41C77 41 77 93 92.4 93C107.8 93 107.8 33 123.2 33C138.6 33 138.6 101 154 101C169.4 101 169.4 61 184.8 61C200.2 61 200.2 45 215.6 45C231 45 231 121 246.4 121C261.8 121 261.8 149 277.2 149C292.6 149 292.6 1 308 1C323.4 1 323.4 81 338.8 81C354.2 81 354.2 129 369.6 129C385 129 385 25 400 25';
const HR_FILL = 'M0 109C15.4 109 15.4 21 30.8 21C46.2 21 46.2 41 61.6 41C77 41 77 93 92.4 93C107.8 93 107.8 33 123.2 33C138.6 33 138.6 101 154 101C169.4 101 169.4 61 184.8 61C200.2 61 200.2 45 215.6 45C231 45 231 121 246.4 121C261.8 121 261.8 149 277.2 149C292.6 149 292.6 149 308 149H0V109Z';
const SPO2_PATH = 'M0 50C20 50 30 55 50 55C70 55 80 45 100 45C120 45 130 52 150 52C170 52 180 48 200 48C220 48 230 50 250 50C270 50 280 42 300 42C320 42 330 45 350 45C370 45 380 48 400 48';
const SPO2_FILL = 'M0 50C20 50 30 55 50 55C70 55 80 45 100 45C120 45 130 52 150 52C170 52 180 48 200 48C220 48 230 50 250 50C270 50 280 42 300 42C320 42 330 45 350 45C370 45 380 48 400 48V150H0V50Z';

const vitalCards = [
  { label: 'Avg Heart Rate', val: '72 BPM', delta: '-2%', deltaColor: 'text-red-500', iconBg: 'bg-red-50 text-red-600', icon: 'favorite', note: 'Compared to last month' },
  { label: 'Avg SpO2', val: '98%', delta: '+1%', deltaColor: 'text-green-500', iconBg: 'bg-blue-50 text-blue-600', icon: 'air', note: 'Normal range' },
  { label: 'Blood Pressure', val: '120/80', delta: 'Stable', deltaColor: 'text-slate-400', iconBg: 'bg-green-50 text-green-600', icon: 'medical_services', note: 'Last reading: 2h ago' },
  { label: 'Active Status', val: 'Healthy', delta: '', deltaColor: '', iconBg: 'bg-primary/10 text-primary', icon: 'check_circle', note: 'Patient monitoring active' },
];

const historyRecords = [
  { icon: 'lab_profile', label: 'Annual Blood Work Panel', type: 'Laboratory', typeBg: 'bg-blue-100 text-blue-600', provider: 'Quest Diagnostics', date: 'Oct 12, 2023' },
  { icon: 'cardiology', label: 'ECG Resting Stress Test', type: 'Cardiology', typeBg: 'bg-red-100 text-red-600', provider: 'Healance Medical Center', date: 'Sep 28, 2023' },
  { icon: 'clinical_notes', label: 'Dermatology Consultation', type: 'Visit Note', typeBg: 'bg-green-100 text-green-600', provider: 'Dr. Sarah Laine', date: 'Sep 15, 2023' },
  { icon: 'radiology', label: 'Abdominal MRI Scan', type: 'Imaging', typeBg: 'bg-purple-100 text-purple-600', provider: 'Sunrise Radiology', date: 'Aug 30, 2023' },
];

export default function VitalsHistory() {
  return (
    <div className="flex h-screen overflow-hidden font-display text-slate-900 bg-background-light">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full size-10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <div>
              <h1 className="text-slate-900 text-lg font-bold leading-none">Healance</h1>
              <p className="text-primary text-xs font-medium uppercase tracking-wider">Medical Platform</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[['dashboard', 'Dashboard', false], ['monitoring', 'Vitals History', true], ['description', 'Medical Reports', false], ['smart_toy', 'AI Assistant', false]].map(([icon, label, active]) => (
            <a key={label} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-primary/5 hover:text-primary'}`}>
              <span className="material-symbols-outlined">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </div>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full overflow-hidden">
                <img alt="Dr. Julian Vance" className="w-full h-full object-cover" src={DOCTOR_AVATAR} />
              </div>
              <div>
                <p className="text-xs font-bold">Dr. Julian Vance</p>
                <p className="text-[10px] text-slate-500">Cardiologist</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background-light">
        <header className="sticky top-0 z-10 bg-background-light/80 backdrop-blur-md px-8 py-6 border-b border-primary/5">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Patient Records &amp; Vitals History</h2>
              <p className="text-slate-500 mt-1">Comprehensive view of health metrics and medical documentation.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-700 hover:bg-slate-50">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Date Range
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-lg">add</span>
                New Record
              </button>
            </div>
          </div>
        </header>

        <div className="px-8 py-6 space-y-6">
          {/* Summary vitals */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vitalCards.map((v) => (
              <div key={v.label} className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{v.label}</span>
                  <div className={`${v.iconBg} p-1.5 rounded-lg`}>
                    <span className="material-symbols-outlined text-lg">{v.icon}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{v.val}</span>
                  {v.delta && <span className={`text-xs font-medium ${v.deltaColor}`}>{v.delta}</span>}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{v.note}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Heart Rate chart */}
            <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Heart Rate Trend</h3>
                  <p className="text-xs text-slate-400">Last 30 days performance</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">72 BPM</p>
                  <p className="text-[10px] text-red-500 font-bold">-2.4% vs avg</p>
                </div>
              </div>
              <div className="h-40 w-full">
                <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 400 150" width="100%">
                  <path d={HR_PATH} stroke="#00cbe6" strokeLinecap="round" strokeWidth="3" />
                  <path d={HR_FILL} fill="url(#hr_grad)" />
                  <defs>
                    <linearGradient id="hr_grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#00cbe6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#00cbe6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between mt-4">
                {['Day 1', 'Day 15', 'Day 30'].map(d => <span key={d} className="text-[10px] text-slate-400 font-bold uppercase">{d}</span>)}
              </div>
            </div>
            {/* SpO2 chart */}
            <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Oxygen Saturation (SpO2)</h3>
                  <p className="text-xs text-slate-400">30-day saturation analysis</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900">98%</p>
                  <p className="text-[10px] text-green-500 font-bold">+0.5% Normal</p>
                </div>
              </div>
              <div className="h-40 w-full">
                <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 400 150" width="100%">
                  <path d={SPO2_PATH} stroke="#10b981" strokeLinecap="round" strokeWidth="3" />
                  <path d={SPO2_FILL} fill="url(#spo2_grad)" />
                  <defs>
                    <linearGradient id="spo2_grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between mt-4">
                {['Day 1', 'Day 15', 'Day 30'].map(d => <span key={d} className="text-[10px] text-slate-400 font-bold uppercase">{d}</span>)}
              </div>
            </div>
          </div>

          {/* Records table */}
          <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Search medical records, reports, or providers..." type="text" />
              </div>
              <div className="flex items-center gap-3">
                <select className="bg-slate-50 border-none rounded-lg text-xs font-semibold py-2 pl-3 pr-8 text-slate-600 outline-none">
                  <option>Record Type: All</option>
                  <option>Laboratory</option>
                  <option>Radiology</option>
                </select>
                <select className="bg-slate-50 border-none rounded-lg text-xs font-semibold py-2 pl-3 pr-8 text-slate-600 outline-none">
                  <option>Sort by: Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    {['Record Name', 'Type', 'Provider', 'Date', 'Actions'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {historyRecords.map((r) => (
                    <tr key={r.label} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">{r.icon}</span>
                          </div>
                          <span className="text-sm font-semibold">{r.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 ${r.typeBg} text-[10px] font-bold rounded uppercase`}>{r.type}</span></td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{r.provider}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{r.date}</td>
                      <td className="px-6 py-4 text-right"><button className="text-primary hover:text-primary/70 font-bold text-xs">View Report</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] text-slate-500 font-medium">Showing 4 of 124 records</p>
              <div className="flex gap-1">
                {['chevron_left', '1', '2', '3', 'chevron_right'].map((p, i) => (
                  p.startsWith('chevron') ? (
                    <button key={i} className="size-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined text-lg">{p}</span>
                    </button>
                  ) : (
                    <button key={i} className={`size-8 flex items-center justify-center rounded border text-xs font-bold ${p === '1' ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary'}`}>{p}</button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Insights panel */}
      <aside className="w-80 border-l border-primary/5 bg-white flex flex-col p-6 space-y-6 hidden xl:flex">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          <h3 className="font-bold text-slate-900">AI Health Insights</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <p className="text-xs font-bold text-primary uppercase mb-2">Observation</p>
            <p className="text-sm text-slate-700 leading-relaxed">Patient's resting heart rate has decreased by 2% over the last 30 days, suggesting improved cardiovascular efficiency.</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-500 text-sm">warning</span>
              <p className="text-xs font-bold text-amber-600 uppercase">Upcoming Task</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">Lipid Panel follow-up is recommended in 14 days based on historical patterns.</p>
            <button className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors">Schedule Now</button>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-[10px] text-slate-400 text-center mb-4">Powered by Healance Medical AI v2.4</p>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-bold mb-2">Need help with records?</p>
            <div className="flex items-center gap-2">
              <input className="flex-1 bg-white border-none text-[10px] rounded-lg py-1.5 focus:ring-1 focus:ring-primary/30 outline-none" placeholder="Ask AI Assistant..." type="text" />
              <button className="size-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
