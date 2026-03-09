const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgtY5j1SPROf4v26YqatMvKQ0SZtfHtGhmDUUsLk5_f05OcL7D6PzDEMuJLa0NDZTAFR9_ZoF00S_nBo9RQ0D5awI8__xMPCZKZnfRzBg0tgzKTtu_vOkCPXsiXXCv9GOzn0bQBWkogjVzNmY1TOck7g3P-A7ha0Ri8rhFviTltcl_463FG-0l8aO0Fiu3jCk6HCD8gig_OAZRefHh5eP2263_vRhS5I0CXva2jS-9pnns9PQ16gw8CyeMpzGyhVdyn2YXguUTGKg';

const steps = [
  { icon: 'check', label: 'Personal Info', sub: 'Verified via Identity Link', done: true, active: false },
  { icon: 'edit', label: 'Medical Credentials', sub: 'Currently in progress', done: false, active: true },
  { icon: 'shield_person', label: 'Background Check', sub: 'Locked', done: false, active: false },
  { icon: 'verified', label: 'Final Review', sub: 'Last step', done: false, active: false },
];

export default function DoctorOnboarding() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-slate-900">
          <div className="text-primary"><span className="material-symbols-outlined text-4xl">health_metrics</span></div>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Healance</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-slate-900 text-sm font-semibold">Dr. Julian Smith</p>
            <p className="text-slate-500 text-xs">Onboarding ID: #HL-4429</p>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
            style={{ backgroundImage: `url(${DOCTOR_AVATAR})` }} />
        </div>
      </header>

      <main className="flex-1 flex justify-center py-8 px-4 md:px-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stepper sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment</span>
                Onboarding Progress
              </h3>
              <div className="flex flex-col gap-0">
                {steps.map((s, i) => (
                  <div key={s.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`rounded-full p-1 flex items-center justify-center ${s.done || s.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'} ${s.active ? 'border-4 border-primary/20' : ''}`}>
                        <span className="material-symbols-outlined text-base">{s.icon}</span>
                      </div>
                      {i < steps.length - 1 && <div className={`w-0.5 h-12 ${s.done || s.active ? 'bg-primary' : 'bg-slate-200'}`} />}
                    </div>
                    <div className="pt-0.5 pb-6">
                      <p className={`font-semibold text-sm ${s.active ? 'text-primary font-bold' : s.done ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</p>
                      <p className="text-slate-500 text-xs">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completion Rate</span>
                  <span className="text-sm font-bold text-primary">25%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h4 className="text-sm font-bold text-slate-800 mb-2">Need Help?</h4>
              <p className="text-sm text-slate-600 mb-4">Our verification team is available 24/7 to assist you with your onboarding.</p>
              <button className="w-full py-2 bg-white border border-primary/20 text-primary rounded-lg text-sm font-semibold hover:bg-primary/5 transition-colors">Contact Support</button>
            </div>
          </aside>

          {/* Main form */}
          <section className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h1 className="text-2xl font-bold text-slate-900">Medical Credentials</h1>
                <p className="text-slate-600 mt-1">Provide your professional details to begin the verification process. This information will be kept strictly confidential.</p>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Medical License Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                      <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900" placeholder="e.g. 1234567890" type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Medical Specialization</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 bg-white">
                      <option value="">Select your specialty</option>
                      <option>Cardiology</option>
                      <option>Dermatology</option>
                      <option>General Practice</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Primary Hospital Affiliation</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">apartment</span>
                      <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900" placeholder="Full name of the medical institution" type="text" />
                    </div>
                  </div>
                </div>

                {/* Upload */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Professional Certifications</h3>
                  <p className="text-sm text-slate-500">Upload high-quality scans of your Medical Degree and Board Certifications.</p>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                    </div>
                    <p className="text-slate-900 font-semibold mb-1">Click to upload or drag and drop</p>
                    <p className="text-slate-500 text-xs">PDF, JPG or PNG (max. 10MB per file)</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <div className="text-primary bg-primary/10 p-2 rounded">
                        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Medical_License_2024.pdf</p>
                        <p className="text-xs text-slate-400">2.4 MB</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 text-slate-600 font-semibold hover:text-slate-900 transition-colors order-2 sm:order-1">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Previous Step
                  </button>
                  <button className="w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-105 transition-all order-1 sm:order-2">
                    Save &amp; Continue
                  </button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
              {[['lock', '256-bit Encryption'], ['gpp_good', 'HIPAA Compliant'], ['shield', 'GDPR Protected']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">{icon}</span>
                  <span className="text-xs font-medium text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">© 2024 Healance Health Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
