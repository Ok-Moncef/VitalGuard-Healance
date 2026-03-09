const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1z3dMTXZPpcLkt3tGW5k8nW4mHM0qh7aOr16Yw4Z7bwBB7ifi-KsW7XEjHbe5mzXEm-nP_c-s4NrQJlQLC-GlAuCwvTFu3E51KoNuxyUUC1KT77JpwW_Mwuz5nZwW06pdmXZdaa0hQXuYgOvCczR9kazM7MxEt22917GbCzUh-fWf3_fOaT9XIieCBuDA31zZkk0s9DM6ppLfB30hlFgNaADR5NmYyWA0DJ-T5tzKT26MwPYWNKKy56c0PBM6a2HRfARb8JdDbRw';

const categories = [
  {
    icon: 'info', title: 'How it Works', desc: 'Learn the basics of setting up your profile and using core features.',
    links: ['Getting started guide', 'Connecting your devices'],
  },
  {
    icon: 'lock', title: 'Privacy & Security', desc: 'Your health data is safe with us. Learn about our encryption standards.',
    links: ['Data protection policy', 'GDPR compliance'],
  },
  {
    icon: 'medical_services', title: 'For Doctors', desc: 'Dedicated support for healthcare providers and clinical staff.',
    links: ['Managing patient records', 'Scheduling & telehealth'],
  },
];

export default function SupportCenter() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md px-4 md:px-20 lg:px-40 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight tracking-tight">Healance Support</h2>
              <p className="text-xs font-medium text-primary uppercase tracking-widest">Knowledge Base</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              Go to Dashboard
            </button>
            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-10 w-10 rounded-full border-2 border-primary/20 bg-cover bg-center"
                style={{ backgroundImage: `url(${USER_AVATAR})` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 md:px-20 lg:px-40 py-16 bg-white border-b border-primary/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">How can we help you today?</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Search our knowledge base for articles, video tutorials, and guides to get the most out of Healance.</p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="block w-full p-4 pl-12 text-base text-slate-900 border-0 rounded-2xl bg-background-light ring-1 ring-inset ring-primary/20 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary transition-all shadow-sm outline-none"
                placeholder="e.g. How to sync my wearable device..."
                type="text"
              />
              <button className="absolute right-2.5 bottom-2.5 px-6 py-1.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm font-medium text-slate-500">Popular:</span>
              {['Billing', 'Doctor Appointments', 'Prescriptions'].map((t) => (
                <a key={t} className="text-sm font-medium text-primary hover:underline" href="#">{t}</a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 md:px-20 lg:px-40 py-12">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="group p-8 bg-white border border-primary/10 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-slate-600 mb-4">{cat.desc}</p>
                <div className="space-y-2">
                  {cat.links.map((link) => (
                    <a key={link} href="#" className="flex items-center text-sm font-medium text-primary hover:translate-x-1 transition-transform">
                      <span className="material-symbols-outlined text-sm mr-2">arrow_forward</span>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / Contact section */}
        <section className="px-4 md:px-20 lg:px-40 py-16 bg-slate-900 text-white rounded-t-[3rem] mt-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Still need help?</h2>
              <p className="text-slate-400 text-lg">Our support team is available 24/7 to assist you with any questions or technical issues.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                {[['chat_bubble', 'Average response', 'Under 5 minutes'], ['phone_in_talk', 'Call wait time', '~2 mins wait']].map(([icon, label, val]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{icon}</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
                      <p className="font-semibold">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button className="flex items-center justify-center gap-3 w-full md:w-64 py-4 bg-primary text-slate-900 font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">forum</span>
                Start Live Chat
              </button>
              <button className="flex items-center justify-center gap-3 w-full md:w-64 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined">call</span>
                Call Support
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 px-4 md:px-20 lg:px-40 py-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-primary text-sm">health_and_safety</span>
            <p className="text-sm text-slate-400">© 2024 Healance Health Support. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Status'].map((l) => (
              <a key={l} className="text-sm text-slate-400 hover:text-white transition-colors" href="#">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">question_answer</span>
        </button>
      </div>
    </div>
  );
}
