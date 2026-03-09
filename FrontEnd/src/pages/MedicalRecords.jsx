const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCefeUk6ACbE1FPy4k9RcB7xZHQqHaE-ihLOwyX00XSrY2RwVuIkd5Kz1ksZqxO0buO7Qk3CkUCHbWFQrllNlxn7A-nItPErlsx0sR6lGpHP03muzM-3r2NCFXIVW5PT4n4MwmjNgCX6EqKOuSNkFq-BHB1jdb5o8dFhHUaF5hfHQkTIMN0N66BTCSmBVuQZQclWrwn4GHgWRM7beQBDRuuDEn3mtzfRN3W9kDrVUqjvUrayUhhOFUVnTioPLEmYiYRxBj7p4lrgbE';

const records = [
  { icon: 'analytics', iconBg: 'bg-blue-100 text-blue-600', name: 'Annual Blood Panel', size: 'PDF Document • 2.4 MB', id: '#PT-8234', type: 'Lab Results', typeBg: 'bg-blue-100 text-blue-700', date: 'Oct 24, 2023', provider: 'City General Labs' },
  { icon: 'radiology', iconBg: 'bg-purple-100 text-purple-600', name: 'Chest X-Ray Results', size: 'DICOM Image • 45 MB', id: '#PT-1156', type: 'Radiology', typeBg: 'bg-purple-100 text-purple-700', date: 'Oct 22, 2023', provider: 'Diagnostic Imaging Center' },
  { icon: 'edit_note', iconBg: 'bg-green-100 text-green-600', name: 'Discharge Summary', size: 'PDF Document • 1.2 MB', id: '#PT-4421', type: 'Clinical Notes', typeBg: 'bg-green-100 text-green-700', date: 'Oct 20, 2023', provider: "St. Mary's Hospital" },
  { icon: 'prescriptions', iconBg: 'bg-orange-100 text-orange-600', name: 'Chronic Meds Renew', size: 'E-Rx File • 15 KB', id: '#PT-8234', type: 'Prescriptions', typeBg: 'bg-orange-100 text-orange-700', date: 'Oct 18, 2023', provider: 'Dr. Sarah Miller' },
];

export default function MedicalRecords() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 bg-white px-6 py-3 lg:px-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Healance</h2>
          </div>
          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
              <div className="text-slate-500 flex bg-slate-100 items-center justify-center pl-4">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="flex w-full min-w-0 flex-1 border-none bg-slate-100 focus:ring-0 h-full placeholder:text-slate-500 px-4 pl-2 text-sm outline-none" placeholder="Search records..." />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <nav className="hidden lg:flex items-center gap-6">
            <a className="text-slate-600 hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
            <a className="text-slate-600 hover:text-primary text-sm font-medium transition-colors" href="#">Patients</a>
            <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Records</a>
            <a className="text-slate-600 hover:text-primary text-sm font-medium transition-colors" href="#">Appointments</a>
          </nav>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700"><span className="material-symbols-outlined">notifications</span></button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700"><span className="material-symbols-outlined">help</span></button>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-slate-900">Dr. Sarah Miller</span>
              <span className="text-[10px] text-slate-500">Administrator</span>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20"
              style={{ backgroundImage: `url(${DOCTOR_AVATAR})` }} />
          </div>
        </div>
      </header>

      <div className="flex h-full flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white p-4 gap-2">
          <div className="mb-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Navigation</p>
            {[['dashboard', 'Overview', false], ['description', 'Medical Records', true], ['analytics', 'Lab Results', false], ['radiology', 'Radiology', false]].map(([icon, label, active]) => (
              <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}>
                <span className="material-symbols-outlined">{icon}</span>
                <p className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">System</p>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium">Settings</p>
            </div>
          </div>
          <div className="mt-auto bg-primary/5 rounded-xl p-4 border border-primary/10">
            <p className="text-xs font-bold text-primary mb-1">Storage Usage</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-2">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-[10px] text-slate-500">6.5 GB of 10 GB used</p>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
            {/* Title */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.033em]">Medical Records</h1>
                <p className="text-slate-500 text-sm">Repository for all patient-related clinical documentation</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold border border-slate-200">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Export All
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Upload New Record
                </button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit overflow-x-auto">
                {[['all_inclusive', 'All Records', true], ['science', 'Lab Results', false], ['image', 'Imaging', false], ['prescriptions', 'Prescriptions', false], ['edit_note', 'Clinical Notes', false]].map(([icon, label, active]) => (
                  <button key={label} className={`flex h-9 px-4 items-center justify-center gap-2 rounded-lg text-sm ${active ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 font-medium hover:text-slate-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Search + filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Search by patient name, ID, or record title..." type="text" />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <select className="bg-slate-50 border-none rounded-lg text-sm text-slate-600 focus:ring-1 focus:ring-primary py-2 px-4 outline-none">
                    <option>Last 30 days</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                  <select className="bg-slate-50 border-none rounded-lg text-sm text-slate-600 focus:ring-1 focus:ring-primary py-2 px-4 outline-none">
                    <option>Priority: All</option>
                    <option>Urgent</option>
                    <option>Normal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Record Name', 'Patient ID', 'Type', 'Date Modified', 'Provider', 'Actions'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((r) => (
                    <tr key={r.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`${r.iconBg} p-2 rounded`}><span className="material-symbols-outlined">{r.icon}</span></div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{r.name}</span>
                            <span className="text-xs text-slate-500">{r.size}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-slate-600">{r.id}</span></td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${r.typeBg}`}>{r.type}</span></td>
                      <td className="px-6 py-4 text-sm text-slate-600">{r.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{r.provider}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">download</span></button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">Showing 1 to 4 of 128 records</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                  {['1', '2', '3', '...', '32'].map((p) => (
                    <button key={p} className={`h-8 w-8 rounded-lg text-xs font-bold ${p === '1' ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-600'}`}>{p}</button>
                  ))}
                  <button className="p-2 rounded-lg hover:bg-slate-50"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                </div>
              </div>
            </div>

            {/* Bottom cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                  <h3 className="font-bold text-sm">Recent Activity</h3>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                  {[
                    { dot: 'bg-blue-500', text: <span>You uploaded <strong>Lab Results</strong> for patient #PT-8234</span>, time: '2 hours ago' },
                    { dot: 'bg-green-500', text: <span>Dr. Emily Watts viewed <strong>MRI Scan</strong></span>, time: '4 hours ago' },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={`size-2 mt-1.5 rounded-full ${a.dot}`} />
                      <div className="flex flex-col">
                        <p className="text-xs text-slate-700">{a.text}</p>
                        <p className="text-[10px] text-slate-400">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 bg-gradient-to-r from-primary to-[#009fb3] p-6 rounded-xl shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 size-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                <div className="flex flex-col gap-4 relative z-10">
                  <h3 className="text-white font-bold text-xl">Cloud Backup Active</h3>
                  <p className="text-white/80 text-sm max-w-md">Your medical records are securely encrypted and backed up in real-time. Compliant with HIPAA and regional healthcare data regulations.</p>
                  <div className="flex gap-3 mt-2">
                    <button className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold shadow-md">Check Status</button>
                    <button className="bg-black/10 text-white px-4 py-2 rounded-lg text-xs font-bold border border-white/20">Security Logs</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
