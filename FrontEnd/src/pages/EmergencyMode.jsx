import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PATIENT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqnmAIWVW4vegwRW4AxD4cZVIcEBC2kcvlTQzMTGbDogxQqJOw0-xhMsryp_n1YW3X8L077tCRiJNmEdyEH7rEBMMDNQX1OTnmxW4mn4ebfWNJb2KH_gCF8IUCTJwQPrhS2m0CGxONGreUdxLOkYPaD6_rKka9XGwSiX_oxJXUMH3JT5nw0I5EG-c4TEvJXoChxNXIq4lr4jiQOTyyI5_a0Vn2X7LmEP1difPE29kA0IMmNa4frJdrV2WnXWKPy6tYAhct-fJ8qag';
const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6UG5FSZ04k7dlQT1Q9L9wLQY-qhAUN8usQtMgpP1iHZnSl1M2vlNOvouohLU7JyOB5PLXUTs1QI9XCmpvT8_HLfDey7Y1mPhoQ2uNINd5f7UZGI4qo23Z_6l9oV72ikFR4hdyderqj3T4HKaI5piAeqarfzkHN5x499lWvsCHyjXsfvVSXXjTeeq65jsdio2l-2wS40IrWugURdodnqPIia1hDTYSnTldyri7AuNhOd1jcoXCz6PR_L4SWsgxG6j_tg9AThxfKxI';

export default function EmergencyMode() {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const fmtE = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden font-display text-slate-900">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 py-3 bg-white sticky top-0 z-50">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="size-6 text-red-500">
              <span className="material-symbols-outlined text-3xl">emergency</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Healance</h2>
            <div className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded tracking-wider">Active Alert</div>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 text-slate-900 px-3 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
              style={{ backgroundImage: `url(${PATIENT_AVATAR})` }} />
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center px-4 py-8 md:px-20 lg:px-40">
          <div className="layout-content-container flex flex-col max-w-[800px] w-full gap-6">
            {/* Status Header */}
            <div className="flex flex-col gap-3 p-6 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center justify-between">
                <h1 className="text-red-500 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Emergency Mode Active</h1>
                <div className="animate-pulse bg-red-500 rounded-full size-3" />
              </div>
              <p className="text-slate-600 text-base font-medium">Medical emergency detected. Help has been dispatched to your current coordinates.</p>
            </div>

            {/* Doctor Dispatch Tracking */}
            <div className="p-6 rounded-xl shadow-lg border border-slate-100 bg-white overflow-hidden">
              <div className="flex flex-col">
                <div className="flex flex-col items-stretch justify-start md:flex-row md:items-start gap-6">
                  {/* Map thumbnail */}
                  <div className="relative w-full md:w-1/2 bg-slate-200 aspect-video rounded-lg overflow-hidden border border-slate-200"
                    style={{ backgroundImage: `url(${MAP_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-slate-900/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex items-center justify-center p-2 bg-primary text-white rounded-full shadow-lg"
                        style={{ animation: 'pulse 2s infinite', boxShadow: '0 0 0 0 rgba(0,203,230,0.4)' }}>
                        <span className="material-symbols-outlined">medical_services</span>
                      </div>
                    </div>
                    <button onClick={() => navigate('/map')} className="absolute bottom-3 right-3 flex items-center justify-center rounded-lg h-9 px-4 bg-white/90 backdrop-blur text-slate-900 text-sm font-bold shadow-sm">
                      <span className="material-symbols-outlined text-sm mr-1">map</span> Expand Map
                    </button>
                  </div>
                  {/* ETA info */}
                  <div className="flex flex-1 flex-col justify-between py-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded uppercase">In Route</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-500 text-sm">Priority Dispatch</span>
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold leading-tight">Doctor ETA: 4 Minutes</h3>
                      <p className="text-slate-600 text-base">Dr. Sarah Mitchell is currently 1.2 miles away and moving towards you.</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-slate-900 text-sm font-bold">Progress</span>
                        <span className="text-slate-500 text-xs font-medium">850m remaining</span>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI First Aid */}
            <div className="bg-white rounded-xl border-l-4 border-red-500 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-red-500">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <h2 className="text-slate-900 text-xl font-bold">AI First Aid Assistant</h2>
              </div>
              <div className="space-y-3">
                <p className="text-slate-700 font-medium">Follow these steps immediately while you wait:</p>
                <ul className="space-y-4">
                  {[
                    'Ensure the patient is lying on a flat surface and is breathing normally.',
                    'Loosen any tight clothing around the neck or waist to assist blood flow.',
                    'Keep the patient warm and do not give them anything to drink.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="flex-none flex items-center justify-center size-6 rounded-full bg-slate-900 text-white text-xs font-bold">{i + 1}</span>
                      <p className={`text-slate-600 text-sm leading-relaxed ${i === 2 ? 'font-bold text-slate-900' : ''}`}>{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 w-full bg-red-500 text-white rounded-xl py-5 font-bold text-lg shadow-lg hover:bg-red-600 transition-transform active:scale-95">
                <span className="material-symbols-outlined">call</span>
                Call EMS (911)
              </button>
              <button onClick={() => navigate('/doctor-alert')} className="flex items-center justify-center gap-3 w-full bg-primary text-slate-900 rounded-xl py-5 font-bold text-lg shadow-lg hover:bg-primary/90 transition-transform active:scale-95">
                <span className="material-symbols-outlined">video_chat</span>
                Contact Doctor
              </button>
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-100 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-lg">share_location</span>
                Share Live Location
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-lg">medical_information</span>
                Emergency Medical ID
              </button>
              <button onClick={() => navigate('/dashboard')} className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-slate-200 text-slate-400 text-sm font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                <span className="material-symbols-outlined text-lg">close</span>
                Cancel Alert
              </button>
            </div>

            {/* Quick footer nav */}
            <div className="mt-8 flex justify-center gap-8">
              {[
                { icon: 'home', label: 'Home', to: '/dashboard', active: false },
                { icon: 'pulse_alert', label: 'Health', to: '/dashboard', active: false },
                { icon: 'emergency', label: 'Emergency', to: '/emergency', active: true },
                { icon: 'settings', label: 'Settings', to: '#', active: false },
              ].map((b) => (
                <div key={b.label} onClick={() => navigate(b.to)} className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className={`size-12 rounded-full flex items-center justify-center border shadow-sm group-hover:bg-primary/10 transition-colors ${b.active ? 'bg-primary border-primary shadow-primary/20' : 'bg-white border-slate-100'}`}>
                    <span className={`material-symbols-outlined ${b.active ? 'text-slate-900' : 'text-slate-600 group-hover:text-primary'}`}>{b.icon}</span>
                  </div>
                  <span className={`text-xs font-${b.active ? 'bold text-primary' : 'medium text-slate-500'}`}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
