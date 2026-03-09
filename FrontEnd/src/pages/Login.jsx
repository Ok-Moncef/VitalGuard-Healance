import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light font-display text-slate-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Healance</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/support')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Support</button>
          <button onClick={() => navigate('/doctor-onboarding')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Register</button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Hero gradient */}
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00cbe6 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="z-10 bg-white p-3 rounded-full shadow-lg">
                <span className="material-symbols-outlined text-primary text-4xl">lock_open</span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black tracking-tight mb-2">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Access your secure healthcare dashboard</p>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm" placeholder="dr.smith@healance.com" type="email" />
                  </div>
                </div>
                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <a className="text-xs font-bold text-primary hover:underline" href="#">Forgot?</a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                    <input className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm" placeholder="••••••••" type="password" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </div>
                </div>

                {/* Sign In */}
                <button onClick={() => navigate('/dashboard')} className="w-full bg-primary text-slate-900 font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2">
                  Sign In
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-slate-400 font-medium">Fast Access</span>
                  </div>
                </div>

                {/* Biometric */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
                    <span className="material-symbols-outlined text-lg">face</span>
                    FaceID
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
                    <span className="material-symbols-outlined text-lg">fingerprint</span>
                    TouchID
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency footer */}
            <div className="bg-slate-50 p-6 border-t border-slate-200">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="material-symbols-outlined text-sm font-bold">warning</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Emergency Services</span>
                </div>
                <p className="text-xs text-slate-500">Critical responders can bypass standard 2FA using verified hardware tokens.</p>
                <button className="w-full py-2.5 border-2 border-rose-500/20 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">emergency_home</span>
                  Emergency Responder Login
                </button>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {[['verified_user', 'HIPAA COMPLIANT'], ['security', 'AES-256 ENCRYPTED'], ['shield', 'SOC2 TYPE II']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                  <span className="text-[10px] font-bold">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">© 2024 Healance Systems. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
