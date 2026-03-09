import { useNavigate } from 'react-router-dom';

const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB053gJIynYOe0GT_cSQjGo7Yq6lAD_rlOKIOibI_IA9YQTeo7R_d244pzArys259PrpmXDUthtpbFvYBAX3RIrkIyQiSsowfsan77S1kM8cifUSqK65VIAzMzfPDPeMkyrzfHcTpG6CR1mr50Ic9Ct4EZ9xicJwMfVXjyjkhB-IjY1ydz3ejByvEstJDbXaQXd5IqDpNuxcL1qsbbeeZ3THhvPOTteXmxQ3qdASMWwgHZRdw0egzYfmtbKW62qmfgV8LvGzq2WztA';

const timelineItems = [
  { icon: 'notifications_active', bg: 'bg-primary', iconColor: 'text-white', time: '10:42 AM', title: 'Emergency Alert Triggered', desc: 'Initial notification received from bedside monitoring system (Room 402).', active: true },
  { icon: 'travel', bg: 'bg-slate-200', iconColor: 'text-slate-600', time: '10:45 AM', title: 'Team Response', desc: 'Rapid response team arrived on site. Vitals stabilization initiated.', active: false },
  { icon: 'medication', bg: 'bg-slate-200', iconColor: 'text-slate-600', time: '10:51 AM', title: 'Medication Administered', desc: 'IV Epinephrine (0.5mg) administered as per ACLS protocols.', active: false },
];

export default function IncidentReport() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-display text-slate-900">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-10 py-3 bg-white">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">medical_services</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Healance</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a onClick={() => navigate('/admin')} href="#" className="text-slate-600 hover:text-primary text-sm font-medium leading-normal transition-colors">Dashboard</a>
              <a onClick={() => navigate('/dashboard')} href="#" className="text-slate-600 hover:text-primary text-sm font-medium leading-normal transition-colors">Patients</a>
              <a href="#" className="text-slate-900 border-b-2 border-primary text-sm font-medium leading-normal">Reports</a>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200"
              style={{ backgroundImage: `url(${DOCTOR_AVATAR})` }} />
          </div>
        </header>

        <main className="flex flex-1 justify-center py-8 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">
            {/* Page Title */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">description</span>
                Clinical Documentation
              </div>
              <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">Incident Report</h1>
              <p className="text-slate-500 text-base font-normal leading-normal">Detailed documentation of clinical intervention and patient response.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2 flex flex-col gap-8">
                {/* Intervention Summary Card */}
                <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">Intervention Summary</h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Patient ID', val: '#PX-8821' },
                      { label: 'Patient Name', val: 'Sarah Jenkins' },
                      { label: 'Intervention Type', val: 'Emergency Response' },
                    ].map((f) => (
                      <div key={f.label} className="flex flex-col gap-1 p-3 bg-background-light rounded-lg">
                        <p className="text-slate-500 text-xs font-semibold uppercase">{f.label}</p>
                        <p className="text-slate-900 text-sm font-bold">{f.val}</p>
                      </div>
                    ))}
                    <div className="flex flex-col gap-1 p-3 bg-background-light rounded-lg">
                      <p className="text-slate-500 text-xs font-semibold uppercase">Status</p>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-primary text-sm font-bold">In Progress</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Event Timeline */}
                <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">Event Timeline</h2>
                  </div>
                  <div className="p-6">
                    <div className="relative flex flex-col gap-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-200">
                      {timelineItems.map((item) => (
                        <div key={item.title} className="relative pl-10">
                          <span className={`absolute left-0 top-1 size-6 rounded-full ${item.bg} flex items-center justify-center ${item.iconColor} ring-4 ring-white`}>
                            <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                          </span>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <h4 className="text-slate-900 font-bold text-sm">{item.title}</h4>
                              <span className="text-slate-500 text-xs font-medium">{item.time}</span>
                            </div>
                            <p className="text-slate-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {/* Medical Notes */}
                <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-slate-900 text-lg font-bold leading-tight">Medical Notes</h2>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-700 text-sm font-medium">Clinical Observations</label>
                      <textarea
                        className="w-full h-48 p-3 rounded-lg border border-slate-200 bg-background-light text-slate-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all"
                        placeholder="Enter detailed observations, patient response, and follow-up requirements..."
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-lg">info</span>
                      <p className="text-slate-600 text-xs">Notes are automatically timestamped and signed by the active session user.</p>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">send</span>
                    Finalize &amp; Submit Report
                  </button>
                  <button className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    Save as Draft
                  </button>
                  <button onClick={() => navigate('/admin')} className="w-full py-3 px-6 bg-transparent border border-slate-200 text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                    Cancel
                  </button>
                </div>

                {/* Report Integrity sidebar */}
                <div className="p-5 border border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                  <h3 className="text-slate-900 text-sm font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    Report Integrity
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {['HIPAA Compliant storage', 'Immutable audit trail', 'Encryption at rest'].map((item) => (
                      <li key={item} className="text-slate-500 text-xs flex gap-2">
                        <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-auto py-8 px-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs">© 2024 Healance Clinical Solutions. All incident reports are confidential medical records.</p>
        </footer>
      </div>
    </div>
  );
}
