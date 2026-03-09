import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdVu-TRaG4c7lTFc0XG928xke5ZTsuE-ADZFMM403-w3BIrEJSNnrGNPdoMzYwelQxAKWBg5cPnCBi5cYy8CPJkOYQMvds2e4H2_0ha4Dc1ydKYd8jObvZFULVHWIY5lMr388oIu96tTf6szk_0EcEBSgpTg0DSH8e762r6Vy-5-bdvVKiRSV8qy7hkNJ9JmOIIthTO9FwKBPykR4SEu2leGyi1CCd94bvVZdhHagELYvEuAEdjpF4saWtFvqTsw6NYJuCCiB8M-k';
const SIDEBAR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5iVHErko93eTSjutSZGTCnLT1iYFU987uU40OAq2l6dLTgvm4CMM7HRdWw5Vd1E9E1MBQK8-9mvf-9WC7WQmafm1-y6Rlb7wnzySyOHEe3h1pKySL5FYkPp9oBXtd8crsHwY8lbHY7sL3K9cXo5jQIWwbu0wgBt2gkym0W-qApQVwxuPNVsGziNY4Ze4OFG-FXkk8W4UBum4RPx5-6-lVxoR6RmRuqR_15wfTtk8NKoE7RxzvzOwReYHCyGEnkC03k7FZrJvHSCw';
const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuASAidve_OCzdvvciKfiCbh1zzI3Z1t7QOeg2GybigJZO0AWz-K1fJwlj3RPY1XE_DX9d4iczxw_DR0TvV27ahOXRgN9Isg6GJhM3EXheZivTINiYzJWyuT7bJ5ccfRPXhmDChPKnixFX8FheeCwunwc2WvZSnILa8XD3L0wUCBp6HBd3yxvyBOzY8RbExJoQCswn7CN0QBKyP8cUgIoGPxoFMawW1Naza_lrjtRkfLJPAfOVOIRSPBgD7bW8GvrBfiq8z6vQlfoFA';

export default function DoctorAlert() {
  const navigate = useNavigate();
  const [timeLeft] = useState(15);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light text-slate-900">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 md:px-10 lg:px-40">
          <div className="flex items-center gap-4">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Healance</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200"
              style={{ backgroundImage: `url(${DOCTOR_AVATAR})` }} />
          </div>
        </header>

        <main className="flex-1 flex flex-col md:flex-row lg:px-40 py-8 gap-8 px-6">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                style={{ backgroundImage: `url(${SIDEBAR_AVATAR})` }} />
              <div className="flex flex-col">
                <h1 className="text-slate-900 text-base font-bold">Dr. Smith</h1>
                <p className="text-slate-500 text-xs font-medium">On-call Physician</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                <span className="material-symbols-outlined">home</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors border-r-4 border-primary" href="#">
                <span className="material-symbols-outlined">emergency</span>
                <span className="text-sm font-semibold">Active Alerts</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                <span className="material-symbols-outlined">groups</span>
                <span className="text-sm font-semibold">Patients List</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                <span className="material-symbols-outlined">calendar_today</span>
                <span className="text-sm font-semibold">Schedule</span>
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1 flex flex-col gap-6">
            {/* Alert heading */}
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 w-fit">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span className="text-xs font-bold uppercase tracking-wider">High Urgency</span>
              </div>
              <h2 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Emergency Alert</h2>
              <p className="text-slate-500 text-lg">Immediate response required for a critical cardiac event nearby.</p>
            </div>

            {/* Patient card */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
              {/* Map */}
              <div className="grid grid-cols-1">
                <div className="w-full h-48 bg-slate-200 relative">
                  <div className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url(${MAP_IMG})` }} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">distance</span>
                      0.8 miles away
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-6">
                  {/* Patient info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-slate-400">person</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">John Doe</h3>
                        <p className="text-slate-500 text-sm font-medium">Male, 58 years old • ID: #HEAL-9921</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reason for Alert</p>
                      <p className="text-red-500 font-bold text-lg">Potential Cardiac Arrest</p>
                    </div>
                  </div>

                  {/* Vitals grid - exact from Stitch */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Heart Rate', val: '142', unit: 'BPM', valColor: 'text-red-500' },
                      { label: 'Blood Pressure', val: '185/110', unit: '', valColor: 'text-slate-900' },
                      { label: 'SpO2', val: '91', unit: '%', valColor: 'text-amber-500' },
                      { label: 'Temp', val: '98.6', unit: '°F', valColor: 'text-slate-900' },
                    ].map((v) => (
                      <div key={v.label} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{v.label}</p>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-xl font-black ${v.valColor}`}>{v.val}</span>
                          {v.unit && <span className="text-xs font-medium text-slate-500">{v.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Timer */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-600">Request expires in</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-primary">{timeLeft}</span>
                        <span className="text-sm font-bold text-slate-400 uppercase">Seconds</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => navigate('/doctor-nav')}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">check_circle</span>
                      Accept Request
                    </button>
                    <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">cancel</span>
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Nearby Support</p>
                <p className="text-sm text-slate-600">An ambulance has been dispatched and is 4 minutes away from the patient's current location.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
