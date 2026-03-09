import { useNavigate } from 'react-router-dom';

const ADMIN_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7L2FvJsj_R522G26YlMJJeeSlG-EzvbCE5M1cFx9cdAmEh3Y1cu-CnTJtqnFDw8DjDYb0-27ednY2fqp_IrNlDqhi0wKI29h5t5Ljvi9Ii7NkugOsWtUN5GmD9B_V5EaPwBcDwba-K2VsrLVfh3HzLAeWb4RKLtLNSECTpThnlok7eux850NcUbus693jnnhB9VHzD5afCyOSz0fleCnpfYJM1t8ahbl3lFyU1gUNKywwGvebWhTZg2pJBRr3fnXqfrLxguydabc';
const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuASAidve_OCzdvvciKfiCbh1zzI3Z1t7QOeg2GybigJZO0AWz-K1fJwlj3RPY1XE_DX9d4iczxw_DR0TvV27ahOXRgN9Isg6GJhM3EXheZivTINiYzJWyuT7bJ5ccfRPXhmDChPKnixFX8FheeCwunwc2WvZSnILa8XD3L0wUCBp6HBd3yxvyBOzY8RbExJoQCswn7CN0QBKyP8cUgIoGPxoFMawW1Naza_lrjtRkfLJPAfOVOIRSPBgD7bW8GvrBfiq8z6vQlfoFA';
const DOCTOR1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfQsEFfpOee0W9yY_BZCKBWG19Pr0IPoYsrlleJuSle_w4TLIa87qMBEsmlXOup644QuFj6zrp_9a_N7Y4TSRU5BNE4TnP8PSWo3Is6dqgAYfmziOIHw44FSo7wGIvBdFQWbC-YcluKgIEHHOOBGyg53QZ2GX1A4KvX7cd-PEpu2HieAm8e4xriqniA0IKgxlzhE19Z94Jrq4uoOHbpq8HnpJBSV4-y9MsM9fnHiEFjKw5h8VXIkL8gYzWyE9avMVCSn_Fj_YTfyw';
const DOCTOR2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA608JkSHbiAHgYkGCw-iegqgY1TndbVI1tZ2b02fVFOfTWKD7Yhu-aXTqeTXI7cXZ_ROcYRRrQGslw5KFPLeukS9GHwLfulsRz7WOUi33Wn_6oLVtSNsnsa4f09uHedH4rAwdBB6_PzJchX6bjnyi1zcjmPyF6Gs4_GubdNw3BkTG7LKLD1ADhNZYaDYXsrFa74PakgGHRzncP27PWnfHAQIzfiti62uDnu2zAoC2nuJCga1GMZIizmll8Xwgotel0pDIUocxCfRE';
const DOCTOR3 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuACcAX3iBCGQvVkUItHsX_mXc_ge1SrtWl0dTkhLI3h53s_bSPBFvtNCwoNkqpngKB4gFZ_5J6xAIj7fhaFC3PfRj1zWKGqlwG71zyGws5Z_yuOqw20-m9BdA1-UNVYOq4SyJFQOFrAfzqrPlUQ-p8y-0NVgT1a1oScsy-9A4o5AOtiKz0uPe92_w4T5zNtY_TOrHzR5kMZpOueSoY_KhdUclAvWPI4pTbCDhk1o2D6HLovq5XX2Tgv-8L0NraYed_epWFBUwWwtgE';

const stats = [
  { icon: 'emergency', val: '24', label: 'Active Emergencies', badge: '+12%', badgeBg: 'text-green-600 bg-green-50', iconBg: 'bg-red-50 text-red-600' },
  { icon: 'medical_services', val: '142', label: 'Available Doctors', badge: 'Stable', badgeBg: 'text-slate-500 bg-slate-100', iconBg: 'bg-primary/10 text-primary' },
  { icon: 'timer', val: '4m 12s', label: 'Avg. Response Time', badge: '-4s', badgeBg: 'text-red-600 bg-red-50', iconBg: 'bg-amber-50 text-amber-600' },
  { icon: 'check_circle', val: '94.2%', label: 'Success Rate', badge: '99.9%', badgeBg: 'text-green-600 bg-green-50', iconBg: 'bg-green-50 text-green-600' },
];

const emergencyRows = [
  { id: '#E-2941', name: 'Robert Jenkins', initials: 'RJ', status: 'En Route', statusBg: 'bg-amber-100 text-amber-700', statusDot: 'bg-amber-700', priority: 'Critical', priorityBg: 'bg-red-100 text-red-700', time: '12 mins' },
  { id: '#E-2942', name: 'Maria Alverez', initials: 'MA', status: 'Assigned', statusBg: 'bg-blue-100 text-blue-700', statusDot: 'bg-blue-700', priority: 'High', priorityBg: 'bg-orange-100 text-orange-700', time: '4 mins' },
  { id: '#E-2943', name: 'Sam Kolder', initials: 'SK', status: 'Treated', statusBg: 'bg-green-100 text-green-700', statusDot: 'bg-green-700', priority: 'Medium', priorityBg: 'bg-slate-100 text-slate-700', time: '28 mins' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden font-display text-slate-900 bg-background-light">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined">health_and_safety</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Healance</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium" href="#">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </a>
          {[
            { icon: 'emergency', label: 'Emergencies', to: '/doctor-alert' },
            { icon: 'medical_services', label: 'Doctors', to: '/doctor-profile' },
            { icon: 'analytics', label: 'Analytics', to: '/incident' },
            { icon: 'group', label: 'Users', to: '#' },
          ].map(l => (
            <a key={l.label} onClick={() => navigate(l.to)} href="#"
              className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined">{l.icon}</span> {l.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2">
            <img className="size-10 rounded-full object-cover" src={ADMIN_AVATAR} alt="Dr. Sarah Chen" />
            <div>
              <p className="text-sm font-semibold">Dr. Sarah Chen</p>
              <p className="text-xs text-slate-500">System Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto bg-white">
        {/* Top nav */}
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="Search patient IDs, doctors, or reports..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Case
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${s.iconBg}`}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${s.badgeBg}`}>{s.badge}</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
                <h3 className="text-2xl font-bold mt-1">{s.val}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Activity Map */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Doctor Activity Map</h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium bg-slate-100 rounded-full">All Teams</button>
                    <button className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">Emergency Only</button>
                  </div>
                </div>
                <div className="aspect-video relative bg-slate-200">
                  <div className="absolute inset-0 opacity-40"
                    style={{ backgroundImage: `url(${MAP_IMG})`, backgroundSize: 'cover' }} />
                  {/* Map markers */}
                  <div className="absolute top-1/4 left-1/3 size-4 bg-primary rounded-full animate-ping" />
                  <div className="absolute top-1/4 left-1/3 size-3 bg-primary rounded-full border-2 border-white" />
                  <div className="absolute bottom-1/3 right-1/4 size-4 bg-red-500 rounded-full animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 size-3 bg-red-500 rounded-full border-2 border-white" />
                  <div className="absolute top-1/2 left-1/2 size-3 bg-primary rounded-full border-2 border-white" />
                  {/* Floating stats */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-xl border border-slate-200 max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="size-2 bg-primary rounded-full" />
                      <p className="text-xs font-medium">12 Units Active in Central District</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergencies table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Active Emergencies</h2>
                  <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Patient Name</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Time</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {emergencyRows.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-slate-500">{r.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{r.initials}</div>
                              <span className="font-medium">{r.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${r.statusBg}`}>
                              <span className={`size-1.5 rounded-full ${r.statusDot}`} />
                              {r.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${r.priorityBg}`}>{r.priority}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">{r.time}</td>
                          <td className="px-6 py-4">
                            <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-8">
              {/* Staff on Duty */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Staff on Duty</h2>
                <div className="space-y-6">
                  {[
                    { name: 'Dr. James Wilson', status: 'Available', specialty: 'Cardiology', statusColor: 'text-green-500', src: DOCTOR1 },
                    { name: 'Dr. Alex Rivera', status: 'In Surgery', specialty: 'Trauma', statusColor: 'text-amber-500', src: DOCTOR2 },
                    { name: 'Dr. Emily Blunt', status: 'Available', specialty: 'ER', statusColor: 'text-green-500', src: DOCTOR3 },
                  ].map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img className="size-10 rounded-full object-cover" src={d.src} alt={d.name} />
                        <div>
                          <p className="text-sm font-semibold">{d.name}</p>
                          <p className={`text-xs ${d.statusColor}`}>{d.status} • {d.specialty}</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                      </button>
                    </div>
                  ))}
                  <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Manage Rosters</button>
                </div>
              </div>

              {/* System Analytics */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  System Analytics
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Bandwidth Usage', val: '64%', w: '64%' },
                    { label: 'Server Uptime', val: '99.98%', w: '98%' },
                    { label: 'Cloud Storage', val: '1.2 TB / 2 TB', w: '60%' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{item.label}</span>
                        <span className="text-primary">{item.val}</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: item.w }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border border-primary/10 flex items-center gap-4">
                  <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">Security Monitor</p>
                    <p className="text-[10px] text-slate-500 uppercase">Status: Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
