const USER_PHOTO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF8qPDmdoA8WX4sBB4XrGDl4DdUMXqKp-gHDNi2XZ2sQTfawqPX8--nxZ8OBemqUe9CPxw9OakwHm15QWsEP9p7zfDKNzcKaHcfVIXN-591uu6OedZoVuct-qVKlsZ_gQ7m5Q7ipTWE26KwX1141e2MO1jlYcKvb4IxfCXBHRi0OTPSfK_Y5SdvQjtalBLJd-uAd4mu5T5Rr-pPvyyw_29r05ixx2iIWrlB260-UL-842lSiY4AwJNaBDQfpvVLxKfCam7jGGFVWI';
const PROFILE_PHOTO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ94pE-3Xpn_hf8Pmp-DOH4wUPJiqo5KEu5K1ehgSBaLvS5fx4GBrZncUlxs7szy7Y3iVB6SEtk7MUlUrO-PYxEIKqKmicdNoddcmgw-T91r0TH39esjNJq7XN3C9pTpHIehDUlXhjT-jN65vjuUsZzzOnUHvj4GZN-kX64X54p7x9CTxpW6oAak4Tjyz8uA0XwUgt53M5Tdf9YCbRbKODQXOKSt_6cT-JzCDZI-6spvoWroH3_trmi88Ip76F6sY_jJZFUABidcY';

const Toggle = ({ checked = false }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input defaultChecked={checked} className="sr-only peer" type="checkbox" />
    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
  </label>
);

export default function Settings() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light font-display text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 lg:px-40 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">health_metrics</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Healance Settings</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-slate-100 text-slate-900 px-3 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-slate-100 text-slate-900 px-3 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>
        </div>
      </header>

      <main className="px-4 lg:px-40 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-2">
          <div className="p-4 mb-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="rounded-full size-10 bg-cover bg-center" style={{ backgroundImage: `url(${USER_PHOTO})` }} />
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-sm font-bold">Alex Johnson</h1>
              <p className="text-primary text-xs font-medium">Premium Member</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined">person</span><span>Account</span>
            </a>
            {[['contact_emergency', 'Emergency Contacts'], ['security', 'Security'], ['notifications_active', 'Notifications']].map(([icon, label]) => (
              <a key={label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">{icon}</span><span>{label}</span>
              </a>
            ))}
            <div className="my-4 border-t border-slate-200" />
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
              <span className="material-symbols-outlined">logout</span><span>Sign Out</span>
            </a>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Profile section */}
          <section className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Personal Profile</h2>
                <p className="text-sm text-slate-500">Manage your basic health information and public profile.</p>
              </div>
              <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm">Save Changes</button>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <div className="size-32 rounded-full border-4 border-primary/20 bg-slate-100 overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${PROFILE_PHOTO})` }} />
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                    <input className="hidden" type="file" />
                  </label>
                </div>
                <p className="text-xs text-slate-400">JPG, GIF or PNG. Max 2MB.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
                {[
                  { label: 'Full Name', type: 'text', val: 'Alex Johnson' },
                  { label: 'Email Address', type: 'email', val: 'alex.j@example.com' },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-700">{f.label}</label>
                    <input className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none" type={f.type} defaultValue={f.val} />
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Blood Type</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none">
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => <option key={bt} selected={bt === 'O+'}>{bt}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Allergies</label>
                  <input className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none" type="text" defaultValue="Peanuts, Shellfish" />
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Emergency Contacts</h2>
                <p className="text-sm text-slate-500">People to be notified in case of medical emergency.</p>
              </div>
              <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-4">
              {[
                { initials: 'SJ', name: 'Sarah Johnson', rel: 'Spouse • +1 (555) 123-4567', bg: 'bg-primary/20 text-primary' },
                { initials: 'MJ', name: 'Michael Johnson', rel: 'Brother • +1 (555) 987-6543', bg: 'bg-slate-200 text-slate-600' },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className={`size-10 ${c.bg} rounded-full flex items-center justify-center font-bold`}>{c.initials}</div>
                    <div>
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-sm text-slate-500">{c.rel}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              {[
                { title: 'Health Alerts', desc: 'Get notified when vital signs or health metrics go out of range.', checked: true },
                { title: 'Appointment Reminders', desc: 'Receive alerts 24 hours before your scheduled health checkups.', checked: true },
                { title: 'System Updates', desc: 'Stay informed about new features and platform improvements.', checked: false },
                { title: 'Email Newsletters', desc: 'Weekly health tips and research curated for your profile.', checked: false },
              ].map((n) => (
                <div key={n.title} className="flex items-center justify-between">
                  <div className="flex-1 pr-8">
                    <h3 className="font-bold text-slate-900">{n.title}</h3>
                    <p className="text-sm text-slate-500">{n.desc}</p>
                  </div>
                  <Toggle checked={n.checked} />
                </div>
              ))}
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Data &amp; Privacy</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-medium">
                <span className="material-symbols-outlined">download</span>
                Export My Health Data
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium">
                <span className="material-symbols-outlined">delete_forever</span>
                Deactivate Account
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-around items-center">
        {[['home', 'Home'], ['analytics', 'Health'], ['settings', 'Settings']].map(([icon, label], i) => (
          <button key={label} className={`flex flex-col items-center gap-1 ${i === 2 ? 'text-primary' : 'text-slate-400'}`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
