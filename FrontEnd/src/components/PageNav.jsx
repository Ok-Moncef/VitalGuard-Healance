import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LINKS = [
  // Label, path, icon, group
  ['Landing Page', '/', 'home', 'Public'],
  ['Login', '/login', 'lock_open', 'Public'],
  ['Support', '/support', 'help', 'Public'],
  ['Doctor Onboarding', '/doctor-onboarding', 'assignment', 'Public'],
  ['Patient Dashboard', '/dashboard', 'dashboard', 'Patient'],
  ['Emergency Mode', '/emergency', 'emergency', 'Patient'],
  ['Notifications', '/notifications', 'notifications_active', 'Patient'],
  ['Medical Records', '/medical-records', 'description', 'Patient'],
  ['Vitals History', '/vitals', 'monitoring', 'Patient'],
  ['Settings', '/settings', 'settings', 'Patient'],
  ['Live Emergency Map', '/map', 'map', 'Doctor'],
  ['Doctor Alert', '/doctor-alert', 'notification_important', 'Doctor'],
  ['Doctor Navigation', '/doctor-nav', 'navigation', 'Doctor'],
  ['Doctor Profile', '/doctor-profile', 'person', 'Doctor'],
  ['Incident Report', '/incident', 'summarize', 'Doctor'],
  ['Admin Dashboard', '/admin', 'admin_panel_settings', 'Admin'],
];

const GROUP_COLORS = {
  Public: 'text-slate-500',
  Patient: 'text-primary',
  Doctor: 'text-green-600',
  Admin: 'text-amber-600',
};

export default function PageNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const groups = [...new Set(LINKS.map(l => l[3]))];

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl hover:bg-slate-700 transition-all active:scale-95"
        title="Navigate between pages"
      >
        <span className="material-symbols-outlined">{open ? 'close' : 'menu_open'}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 left-6 z-[9998] w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
              <span className="text-white font-bold text-sm">Healance Navigator</span>
            </div>
            <span className="text-slate-400 text-xs">{LINKS.length} pages</span>
          </div>

          {/* Links grouped */}
          <div className="overflow-y-auto max-h-[60vh] py-2">
            {groups.map(group => (
              <div key={group} className="mb-1">
                <p className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 ${GROUP_COLORS[group]}`}>
                  {group}
                </p>
                {LINKS.filter(l => l[3] === group).map(([label, path, icon]) => {
                  const active = location.pathname === path;
                  return (
                    <button
                      key={path}
                      onClick={() => { navigate(path); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-xl ${active ? 'text-primary' : 'text-slate-400'}`}>
                        {icon}
                      </span>
                      <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-4 py-2 bg-slate-50">
            <p className="text-[9px] text-slate-400 text-center">Click any page to navigate instantly</p>
          </div>
        </div>
      )}
    </>
  );
}
