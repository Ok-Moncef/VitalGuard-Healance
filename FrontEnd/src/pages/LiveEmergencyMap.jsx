import { useNavigate } from 'react-router-dom';

const MAP_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy4phU28jpqXVf_Axrg-pro5H7RZD0hmZnA113zDirI38uIGbfA4w6p3aw7K0Ofh0njNg62JCW_V6pkx9ZgIXKuMab30EZ_h_NcFCJjrEc5guZxVFqzP0x5PVG3zG0PGWVT5C_0xI-jUx90SHZFO4p53FSyDgXCIVTQPVEHnxHCqAZX3AhGEnYHA72rgLjQlrEc2HN6S3oX3U3OXaFICNGFHWxWOWqqdxHkxTRcHYrVySoqAHZO7-X2t-BRPSUJuiGVAlMRMtR25Y';
const PATIENT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7PKAsg1dbbzTTz2RslMfgQ1Oa-HiE1lsbp2Eh-IuxF1CEHYxf4_NOUyym9yCtBXMxDygKJd_vq9qmbnUi1vk7-nTm3pC-XUMdzR1vDTGaQURUbtTmRPtBnsKay6k5iN9ejIo7jHFUDpVivk4r7nIS79kLinWmuuMKPLpWX7ji4YF8LH8Kkiklo-EHzwOolQ15PoYKghLsxwsCq_6tEBF6n6x2O0Q5QVXLFzyxZ2T8N8djXzYi1qpUt0qJaGllLrRcNtDoVuNULn0';
const DOCTOR_MOVING = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-aenk-tzppdUI9M9DcVVUkzPqeiW0FOGVL-QqWkqgBDsLXfXDaGPm7GYUoBA6jBvrhE2ay1z9zOxPNUsJ6KWNPnyywGDh9emeYThRzCxqm7ynob227sGBzwcgyVjIwfK7mh9db1K0AITQbXK9lfc27HhPn5C24kZyg54iY3wghjEeGNm9rsCh9aOynEWGsQgooGeA4od4ca-ijsAvnZVtvHSKhbhe7QPJAJLSW10SDvbZMMQ_zBOfcPUDOapbr-_6dtvsmHIU12M';
const DOCTOR_CARD = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza08OX1wQ8hCURlKjnmLs_zirRlaygXTtgks-RHUyd0_RV7IHBUbOUnTEM34t_lVrcH3nNXQqgG8cOYo1PgUQjhrF9FH7_Qt28VJnLm7UsYPodiASrpJ0BOPI2__yOwJtPo9P5iV9V_ctHQ5gvtFPim4hFqPAR50J-2bl9Jg77DduVlZSYBPsFjKJ7K79pz9deUjE5V2SSmv7Pk_G6AYpIngqOJmkazM6VjPOU7vvz8Ax7HJCykxyAmwH-w9ZY5HfbcbuDEKUk4U';

export default function LiveEmergencyMap() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden font-display text-slate-900">
      {/* Header */}
      <header className="z-50 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Healance</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full border border-red-100">
            <span className="material-symbols-outlined text-sm animate-pulse">emergency</span>
            <span className="text-xs font-bold uppercase tracking-wider">Live Emergency Response</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold">Alex Johnson</span>
            <span className="text-xs text-slate-500">ID: HEA-9921-X</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-primary">
            <img alt="Profile" className="h-full w-full object-cover" src={PATIENT_AVATAR} />
          </div>
        </div>
      </header>

      <div className="relative flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Icon sidebar */}
        <aside className="hidden md:flex flex-col w-20 bg-white border-r border-slate-200 py-6 items-center gap-8 shrink-0">
          {[
            { icon: 'dashboard', label: 'Home', to: '/dashboard', active: false },
            { icon: 'calendar_today', label: 'Plan', to: '#', active: false },
            { icon: 'location_on', label: 'Emergency', to: '/map', active: true },
            { icon: 'folder_shared', label: 'Records', to: '/incident', active: false },
          ].map((b) => (
            <button key={b.label} onClick={() => navigate(b.to)}
              className={`flex flex-col items-center gap-1 transition-colors ${b.active ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <span className="material-symbols-outlined">{b.icon}</span>
              <span className={`text-[10px] font-medium ${b.active ? 'border-b-2 border-primary pb-1' : ''}`}>{b.label}</span>
            </button>
          ))}
        </aside>

        {/* Map */}
        <main className="relative flex-1 bg-slate-100 overflow-hidden">
          {/* Map background */}
          <div className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url(${MAP_BG})` }} />

          {/* Map overlay controls */}
          <div className="absolute top-6 left-6 right-6 flex flex-col gap-4 pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 pointer-events-auto">
                <div className="flex items-center bg-white shadow-xl rounded-xl border border-slate-200 px-4 py-2 w-64 lg:w-96">
                  <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                  <input className="border-none focus:ring-0 text-sm w-full bg-transparent outline-none" placeholder="Search facilities..." type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2 pointer-events-auto">
                <div className="flex flex-col bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                  <button className="p-3 hover:bg-slate-50 text-slate-600 border-b border-slate-100">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="p-3 hover:bg-slate-50 text-slate-600">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
                <button className="p-3 bg-white rounded-xl shadow-xl border border-slate-200 text-primary pointer-events-auto">
                  <span className="material-symbols-outlined">near_me</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live pins */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Patient pin */}
            <div className="absolute" style={{ top: '40%', left: '45%' }}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative bg-primary text-white p-2 rounded-full shadow-lg border-4 border-white">
                    <span className="material-symbols-outlined text-lg">person_pin_circle</span>
                  </div>
                </div>
                <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md border border-slate-200 pointer-events-auto">
                  <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">My Location</p>
                </div>
              </div>
            </div>

            {/* Doctor pin */}
            <div className="absolute" style={{ top: '55%', left: '60%' }}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-6 bg-green-500/10 rounded-full" />
                  <div className="relative bg-white p-1 rounded-full shadow-2xl border-2 border-green-500">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img alt="Doctor" className="w-full h-full object-cover" src={DOCTOR_MOVING} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-0.5 rounded-full border-2 border-white">
                      <span className="material-symbols-outlined text-[12px]">medical_services</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg shadow-lg pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-[11px] font-bold text-white whitespace-nowrap">Dr. Mitchell • 4 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category shortcuts */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col md:flex-row gap-4 items-end justify-center">
            <div className="hidden lg:flex gap-2 pointer-events-auto mb-4 self-center">
              {[
                { icon: 'local_hospital', label: 'Hospitals' },
                { icon: 'local_pharmacy', label: 'Pharmacies' },
                { icon: 'clinical_notes', label: 'Clinics' },
              ].map((b) => (
                <button key={b.label} className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-slate-200 hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-primary text-sm">{b.icon}</span>
                  <span className="text-xs font-bold text-slate-700">{b.label}</span>
                </button>
              ))}
            </div>

            {/* Doctor info card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto">
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                        <img alt="Doctor Sarah Mitchell" className="w-full h-full object-cover" src={DOCTOR_CARD} />
                      </div>
                      <div className="absolute -top-2 -left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        ETA 4m
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900">Dr. Sarah Mitchell</h3>
                      <p className="text-sm text-slate-500 font-medium">Cardiologist • MD, Heart Care Clinic</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">star</span>
                        <span className="text-xs font-bold text-slate-700">4.9</span>
                        <span className="text-[10px] text-slate-400">(128 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>En Route</span>
                    <span className="text-primary">0.8 miles away</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-lg">call</span>
                    Call Doctor
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-900/20">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    Message
                  </button>
                </div>
              </div>

              {/* Status footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-[11px] font-semibold text-slate-600">Dispatched from Central Hospital</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-[11px] font-bold text-red-500 hover:underline">Cancel Request</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
