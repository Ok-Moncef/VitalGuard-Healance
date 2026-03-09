import { useNavigate } from 'react-router-dom';

const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnVKwdE9oTtbLHuW-PvL5CCc7Oa__zCVzojYaapy6NaLdBtvkwp0jryKBE_kJP3zZNEgOqUqqMalOYwI6usM6O3UiVH4A8mT0TYRTY3a9vDy5e0D38qSKbgQytVkjCGPjwujyX7sbUKQ5IvSHGo-27KE2Df3-4aolsyeMy1XNm4fzRP-jwWzkhIx1sqg5gpSXBlnp5LFm5QqFu_LHK5iVPKUQsOSK0LHjYlLPLjEuo-L1oJ92qU-EpwR2oUcNY9uZ-fMnW8Xc3qZY';

export default function DoctorNavigation() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light font-display text-slate-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 lg:px-10 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">medical_services</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Healance</h2>
          </div>
          <div className="flex-1 max-w-xl hidden md:block px-8">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary/50 text-sm outline-none" placeholder="Search patients, rooms, or staff..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1" />
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">Dr. Julianne</p>
                <p className="text-[10px] text-slate-500 font-medium">On-call Surgeon</p>
              </div>
              <img className="size-9 rounded-full object-cover border-2 border-primary/20" src={DOCTOR_AVATAR} alt="Dr. Julianne" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden lg:flex">
          <nav className="p-4 space-y-2">
            {[
              { icon: 'dashboard', label: 'Dashboard', to: '/doctor-alert', active: false },
            ].map(l => (
              <a key={l.label} onClick={() => navigate(l.to)} href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">{l.icon}</span>
                <span className="text-sm font-medium">{l.label}</span>
              </a>
            ))}
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors">
              <span className="material-symbols-outlined">map</span>
              <span className="text-sm font-semibold">Patient Map</span>
            </a>
            {[
              { icon: 'monitoring', label: 'Live Vitals', to: '/doctor-nav' },
              { icon: 'folder_shared', label: 'Medical Records', to: '/incident' },
            ].map(l => (
              <a key={l.label} onClick={() => navigate(l.to)} href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">{l.icon}</span>
                <span className="text-sm font-medium">{l.label}</span>
              </a>
            ))}
            <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Alerts</div>
            <a onClick={() => navigate('/doctor-alert')} href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <span className="material-symbols-outlined">error</span>
              <span className="text-sm font-semibold">Emergency Dept</span>
            </a>
          </nav>
          <div className="mt-auto p-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs font-semibold text-slate-500 mb-2">Shift Status</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold">Active: 4h 12m</span>
              </div>
              <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:shadow-sm transition-all">Clock Out</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Map Section */}
          <div className="flex-1 relative bg-slate-200 min-h-[400px]">
            {/* Map overlay elements */}
            <div className="absolute inset-0 p-6 pointer-events-none">
              <div className="flex flex-col h-full justify-between">
                {/* Search bar on map */}
                <div className="max-w-md w-full pointer-events-auto">
                  <div className="bg-white shadow-xl rounded-xl p-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 ml-2">location_on</span>
                    <input className="flex-1 border-none focus:ring-0 text-sm py-2 outline-none" placeholder="Find room or ward..." type="text" />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold">GO</button>
                  </div>
                </div>
                {/* Map controls */}
                <div className="flex flex-col gap-2 items-end pointer-events-auto">
                  <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                    <button className="p-3 hover:bg-slate-50 border-b border-slate-100 transition-colors">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="p-3 hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                  </div>
                  <button className="p-3 bg-white rounded-lg shadow-lg hover:bg-slate-50 transition-colors border border-slate-200">
                    <span className="material-symbols-outlined">near_me</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="absolute size-24 bg-primary/20 rounded-full animate-ping" />
                <div className="size-6 bg-primary border-4 border-white rounded-full shadow-lg z-10" />
              </div>
            </div>

            {/* Grid background for map look */}
            <div className="absolute inset-0 -z-10 opacity-30"
              style={{ backgroundImage: 'linear-gradient(rgba(100,116,139,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Bottom emergency banner */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-auto">
              <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 border-l-8 border-primary flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded uppercase">Priority: High</span>
                    <p className="text-xl font-bold tracking-tight">Emergency: Room 402</p>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    Patient: <span className="text-slate-900 font-bold">Marcus Thorne</span> | Distance: <span className="text-primary font-bold">120 meters</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-slate-100 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Details</button>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-105 transition-all">I'm Arrived</button>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals Side Panel */}
          <aside className="w-full md:w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-lg">Live Patient Vitals</h3>
              <span className="material-symbols-outlined text-slate-400">more_vert</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Vitals cards */}
              <div className="grid grid-cols-1 gap-4">
                {/* Heart Rate */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Heart Rate</span>
                    <span className="material-symbols-outlined text-red-500">favorite</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">112</span>
                    <span className="text-sm font-medium text-slate-500">BPM</span>
                    <div className="ml-auto flex items-center text-red-500 text-xs font-bold">
                      <span className="material-symbols-outlined text-xs">trending_up</span>
                      <span>+15%</span>
                    </div>
                  </div>
                  <div className="mt-4 h-12 flex items-end gap-1">
                    {[32, 40, 24, 48, 44, 48, 36].map((h, i) => (
                      <div key={i} className="w-1 bg-red-500 rounded-full" style={{ height: h * 1.5 + 'px', opacity: 0.3 + i * 0.1 }} />
                    ))}
                  </div>
                </div>

                {/* SpO2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SpO2</span>
                    <span className="material-symbols-outlined text-blue-500">water_drop</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">94</span>
                    <span className="text-sm font-medium text-slate-500">%</span>
                    <div className="ml-auto flex items-center text-red-500 text-xs font-bold">
                      <span className="material-symbols-outlined text-xs">trending_down</span>
                      <span>-2%</span>
                    </div>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Pressure</span>
                    <span className="material-symbols-outlined text-emerald-500">monitor_heart</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">145/95</span>
                    <span className="text-sm font-medium text-slate-500">mmHg</span>
                  </div>
                </div>
              </div>

              {/* Emergency Protocols */}
              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Emergency Protocols</h4>
                <div className="space-y-3">
                  <div className="flex gap-4 p-3 rounded-xl bg-red-50 border border-red-100">
                    <div className="size-8 rounded-lg bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-900">Prepare Defibrillator</p>
                      <p className="text-xs text-red-700/70 leading-relaxed">Arrive at Room 402 with AED unit immediately.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl border border-slate-200">
                    <div className="size-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">medication</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Administer Epinephrine</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Check patient record for allergies before dosage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200">
              <button className="w-full py-3 bg-background-dark text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined">call</span>
                Contact Ward Nurse
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
