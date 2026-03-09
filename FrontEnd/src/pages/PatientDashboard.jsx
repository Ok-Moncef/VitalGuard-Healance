import { useNavigate } from 'react-router-dom';

const AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG4nOOXN-AyUaxEkqhCOQZQcRDUxhiDHpvtVGtpLQKei3h0wkFvD7gTtLrAeCNDmcSqZ5vJ9tb6M3MGfiYGuTrz1Yin4IXyvG5symKz-doJuHT3lwXU4nqA6YBtdwvVgSVUH4wPPvMJnsDD5GeizFeOFzq0zjz0QZj-Lb4brbWjjFzHjtel9EAUZJvO3XCTuRTrvjgyYU-6xNfo3j8UZpiuMjA4byt1GPT5_znIycOxAswQ4JW5_hrLiZTs7hlJvkvdFqp5AuYlTA';

const activityBars = [
  { h: '40%', fill: '60%' },
  { h: '60%', fill: '80%' },
  { h: '80%', fill: '40%' },
  { h: '100%', fill: '90%' },
  { h: '70%', fill: '50%' },
  { h: '50%', fill: '75%' },
  { h: '90%', fill: '30%' },
];

export default function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-100 px-6 md:px-10 py-3 bg-white sticky top-0 z-50">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Healance</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="flex gap-2">
              <button onClick={() => navigate('/notifications')} className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-900 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button onClick={() => navigate('/settings')} className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-900 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
              style={{ backgroundImage: `url(${AVATAR})` }} />
          </div>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 border-r border-slate-100 bg-white p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-sm font-semibold">Dashboard</p>
            </div>
            {[
              { icon: 'monitoring', label: 'Vitals History', path: '/vitals' },
              { icon: 'description', label: 'Medical Reports', path: '/medical-records' },
              { icon: 'notifications_active', label: 'Notifications', path: '/notifications' },
              { icon: 'settings', label: 'Settings', path: '/settings' },
            ].map((l) => (
              <div key={l.label} onClick={() => navigate(l.path)} className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg cursor-pointer transition-colors">
                <span className="material-symbols-outlined">{l.icon}</span>
                <p className="text-sm font-medium">{l.label}</p>
              </div>
            ))}
            {/* Emergency panic */}
            <div className="mt-auto p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-600 text-xs font-bold uppercase tracking-wider mb-2 text-center">Emergency Only</p>
              <button onClick={() => navigate('/emergency')}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex flex-col items-center justify-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-3xl">emergency_home</span>
                <span className="font-bold">PANIC BUTTON</span>
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6 md:p-10 flex flex-col gap-8 max-w-6xl mx-auto w-full pb-10">
            {/* Welcome */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Welcome back, Alex</h1>
                <p className="text-slate-500 text-lg mt-1">Your health overview for Tuesday, Oct 24.</p>
              </div>
              <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-slate-700">System Monitoring Active</span>
              </div>
            </section>

            {/* Vitals */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Heart Rate', val: '72', unit: 'BPM', icon: 'favorite', trend: '-2% from avg', trendColor: 'text-red-500', trendIcon: 'trending_down' },
                { label: 'SpO2', val: '98', unit: '%', icon: 'air', trend: 'Optimal level', trendColor: 'text-green-500', trendIcon: 'trending_up' },
                { label: 'Activity', val: 'Active', unit: '', icon: 'directions_run', trend: 'Movement detected', trendColor: 'text-green-500', trendIcon: 'check_circle' },
              ].map((v) => (
                <div key={v.label} className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm font-medium">{v.label}</p>
                    <span className="material-symbols-outlined text-primary">{v.icon}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-slate-900 text-3xl font-bold">{v.val}</p>
                    {v.unit && <p className="text-slate-500 text-sm">{v.unit}</p>}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold mt-2 ${v.trendColor}`}>
                    <span className="material-symbols-outlined text-sm">{v.trendIcon}</span>
                    <span>{v.trend}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* Bottom grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* AI Insight */}
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-primary text-white p-4 rounded-full">
                    <span className="material-symbols-outlined text-4xl">neurology</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 font-bold text-lg">AI Health Assistant Insight</h3>
                    <p className="text-slate-600 mt-1">Your vitals have been consistent for the last 4 hours. Great job staying hydrated. Your next medication is scheduled in 45 minutes.</p>
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-primary/90">Talk to AI</button>
                </div>

                {/* Activity Chart */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-slate-900">Activity Overview</h3>
                    <select className="bg-slate-50 border-none text-sm font-bold rounded-lg focus:ring-primary">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
                    {activityBars.map((b, i) => (
                      <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group" style={{ height: b.h }}>
                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: b.fill }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                {/* Notifications */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-xl text-slate-900 mb-4">Recent Notifications</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">medication</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Take Medication</p>
                        <p className="text-xs text-slate-500 mt-0.5">Metformin 500mg due at 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-l-4 border-primary bg-primary/5">
                      <div className="size-10 bg-primary/20 text-primary rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">calendar_month</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Upcoming Appointment</p>
                        <p className="text-xs text-slate-500 mt-0.5">Dr. Sarah Miller - Tomorrow at 2 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="size-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Daily Goal Reached</p>
                        <p className="text-xs text-slate-500 mt-0.5">You've hit 10,000 steps today!</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => navigate('/notifications')} className="w-full mt-4 text-primary text-sm font-bold py-2 border border-primary/20 rounded-lg hover:bg-primary/5">View All Notifications</button>
                </div>

                {/* Telehealth */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Telehealth Connect</h3>
                    <p className="text-slate-400 text-sm mb-4">Immediate video consultation available with a duty nurse.</p>
                    <button className="bg-primary text-white w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">video_call</span>
                      Start Call Now
                    </button>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-9xl">medical_services</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
