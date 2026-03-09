import { useNavigate } from 'react-router-dom';

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtTaJuZ2i1ja0kx19mo_uYn7MmxlM7hE1foT5KkCFFhqIaDqmi5pffw9EIYEJshUeVLgGf6L7ngNpAVk8NHFs8WsOsssgjyLaJTef63HvLBDxjUFm0zwU39joLaJjWHjmV8eSTkXynPeD2gjaSVLUHCiOUoEVcq5B9ZBvRMx8qHNJmTSZF0JSjCKIYxFxRZTtIfcAXsBseoKs7rEoNY8IMjPByrbSf-WRW7xJtlnC8bBTBtPdtmwgnwfYFX0lR4LcR7c0MBbABW7I';
const DOCTORS_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwDMr9JWsgQHgDwwers3oIS-RGbltq_PDiU99vC6mkx5a1HGTb_9poCFoZY6ccgxIYkIqCEORF5LjqMYKNh86ilSVPJYhC6TdMCrLrKIMb1pFRhV-RkTyEzOE3tdq7l9AO2ZxvZrCYgQTdoox42DSRZNJ29gvaOKjWgQ_6pNm6I8toxM1uVnOFwvhYvaSCAibTtzwoGmAgCHkiX7TaQr6q1XOhIzjq-hsN7W2SOQov4q_XVOGtZtGlVQWvKQqTUZaFKBi0OcTZKvE';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-slate-900 bg-background-light">
      <div className="layout-container flex h-full grow flex-col">

        {/* ── Nav ── */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">medical_services</span>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Healance</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-8">
              <a className="text-slate-600 text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
              <a className="text-slate-600 text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
              <a className="text-slate-600 text-sm font-medium hover:text-primary transition-colors" href="#doctors">Doctors</a>
            </nav>
            <div className="flex gap-3">
              <button onClick={() => navigate('/emergency')} className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-slate-900 text-sm font-bold transition-transform active:scale-95">
                Get Help
              </button>
              <button onClick={() => navigate('/login')} className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-100 text-slate-900 text-sm font-bold">
                Login
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-slate-900">menu</span>
          </div>
        </header>

        <main className="flex flex-col">
          {/* ── Hero ── */}
          <section className="px-6 md:px-20 py-12 md:py-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex flex-col gap-8 flex-1">
                <div className="flex flex-col gap-4">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 w-fit px-3 py-1 rounded-full">Always On Standby</span>
                  <h1 className="text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight">
                    Healance — When Every Second Matters
                  </h1>
                  <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
                    Connecting you to emergency medical response in seconds. Our AI-driven platform ensures professional help is always a tap away, anywhere, anytime.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => navigate('/emergency')} className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-6 bg-primary text-slate-900 text-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    Get Help Now
                  </button>
                  <button onClick={() => navigate('/doctor-onboarding')} className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-6 bg-white border border-slate-200 text-slate-900 text-lg font-bold hover:bg-slate-50 transition-all">
                    Join as Doctor
                  </button>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400" />
                  </div>
                  <span>Trusted by 10k+ users and 500+ certified doctors.</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  <img alt="Emergency Medical Response" className="w-full h-full object-cover" src={HERO_IMG} />
                </div>
              </div>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="bg-white px-6 md:px-20 py-20 border-y border-slate-100" id="how-it-works">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 mb-16 text-center items-center">
                <h2 className="text-slate-900 text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-2xl">3 Simple Steps to Safety</h2>
                <p className="text-slate-600 text-lg max-w-xl">Our streamlined process ensures you get the care you need without delay during critical moments.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: 'emergency_share', title: '1. Trigger Alert', desc: 'Tap the emergency button in the app. Your live location and medical profile are shared with our dispatch team instantly.' },
                  { icon: 'near_me', title: '2. Instant Dispatch', desc: 'Our AI locates the nearest qualified medical responder and dispatches them with the fastest route optimized for current traffic.' },
                  { icon: 'stethoscope', title: '3. Medical Care', desc: 'Receive immediate professional care while being stabilized for transport if necessary. All data is synced with the destination hospital.' },
                ].map((s, i) => (
                  <div key={i} className="group flex flex-col gap-6 p-8 rounded-2xl bg-background-light border border-slate-100 hover:border-primary transition-all">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                      <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-slate-900 text-xl font-bold">{s.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Features ── */}
          <section className="px-6 md:px-20 py-20" id="features">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                {[
                  { icon: 'gps_fixed', title: 'Live GPS', desc: 'Real-time tracking of responders', mt: '' },
                  { icon: 'history_edu', title: 'Health Vault', desc: 'Secure medical history access', mt: 'mt-8' },
                  { icon: 'groups', title: 'Family Sync', desc: 'Auto-notify your emergency contacts', mt: '-mt-8' },
                  { icon: 'video_chat', title: 'Tele-Triage', desc: 'Instant video call with doctors', mt: '' },
                ].map((f, i) => (
                  <div key={i} className={`bg-primary/5 p-6 rounded-2xl border border-primary/10 ${f.mt}`}>
                    <span className="material-symbols-outlined text-primary mb-2 block">{f.icon}</span>
                    <h4 className="font-bold text-slate-900">{f.title}</h4>
                    <p className="text-xs text-slate-500">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <h2 className="text-slate-900 text-3xl md:text-4xl font-black">Advanced Technology for Human Care</h2>
                <p className="text-slate-600 text-lg">Healance isn't just an app; it's a sophisticated ecosystem designed to minimize the response gap. Our technology handles the complexity so you can focus on staying safe.</p>
                <ul className="flex flex-col gap-4">
                  {['AI-powered hospital load balancing', 'Encrypted end-to-end medical data transfer', 'Integrated 24/7 medical dispatch center'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Doctors ── */}
          <section className="bg-slate-900 text-white px-6 md:px-20 py-20 rounded-t-[3rem]" id="doctors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex flex-col gap-6 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black leading-tight">Our Network of Dedicated Professionals</h2>
                <p className="text-slate-400 text-lg">We partner with certified ER doctors, paramedics, and first responders who undergo rigorous vetting to ensure you receive top-tier care in every emergency.</p>
                <div className="flex gap-12 mt-4">
                  <div><div className="text-3xl font-bold text-primary">500+</div><div className="text-slate-500 text-sm">Active Doctors</div></div>
                  <div><div className="text-3xl font-bold text-primary">120+</div><div className="text-slate-500 text-sm">Partner Hospitals</div></div>
                  <div><div className="text-3xl font-bold text-primary">4.9/5</div><div className="text-slate-500 text-sm">User Rating</div></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
                  <img alt="Professional medical team" className="rounded-xl w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-500" src={DOCTORS_IMG} />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-xl text-slate-900 shadow-xl hidden md:block">
                  <p className="font-bold text-xl italic">"Saving lives through speed and technology."</p>
                  <p className="text-sm mt-2 opacity-80">— Dr. Sarah Chen, Chief Medical Officer</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="px-6 md:px-20 py-24 bg-primary">
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
              <h2 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight">Ready to secure your peace of mind?</h2>
              <p className="text-slate-800 text-lg md:text-xl font-medium opacity-90">Download Healance today and ensure that professional medical help is never more than a few seconds away.</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <button className="flex items-center gap-3 px-8 h-16 bg-slate-900 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">ios</span>
                  App Store
                </button>
                <button className="flex items-center gap-3 px-8 h-16 bg-slate-900 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Google Play
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="bg-white px-6 md:px-20 py-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">medical_services</span>
                <h2 className="text-slate-900 text-lg font-bold">Healance</h2>
              </div>
              <p className="text-slate-500 text-sm">Next-generation emergency medical response platform. Saving lives through innovation.</p>
              <div className="flex gap-4">
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
              </div>
            </div>
            {[
              { title: 'Product', links: ['How it Works', 'App Features', 'Pricing Plans', 'Safety Protocols'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Our Doctors', 'Newsroom'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-slate-900 mb-6">{col.title}</h4>
                <ul className="flex flex-col gap-4 text-sm text-slate-500">
                  {col.links.map(l => <li key={l}><a className="hover:text-primary" href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 text-center md:text-left">
            <p className="text-slate-400 text-xs">© 2026 Healance Inc. All rights reserved. Professional medical advice should always be sought for non-emergencies.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
