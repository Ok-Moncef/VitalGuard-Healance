import { useNavigate } from 'react-router-dom';

const DOCTOR_PHOTO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1nVPPGVzzbYKMty_mswxV-6-Iyz9JsfDw-hdwWcUAKa8CsIV2a2tOv1fxudMWQQULyFZ5ZJ9Xe99SIXAvLCnF7ZgjpJmkNEiG4h-8GcleYzJD5r8NvlzDqTXRLtMVyYocQ1A7Q54ZcZzEawf1jKw3-JMPB5ydo6H3wDvIS7BFllAVnizHhgGzKYOaZZVpgs-rLBqjFXLGPIZKkwT_CyJQv2-07vAFtbK7oTdBDVEgkQ23Qi-C5yXEjGV0pg-AUsGuETy94ygott8';
const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVF03GyEfMTVzdUkwaiPJpppVAFQ6O1oTRIT3-Xl0n4entUmQ-s5B6tCNNgyzUg9syhjV9jVLeDfP4JcqEkXhxlpARqqW94BFQWwHt7kL0W1wtS7eiTMGmPq6R1YmJAYwziKJR-PvgIgsr4d3CKYgm9CuPu4xc3hF34a_RMEUxVc3WujhKWxmKEfjWq0qQlEWGtcbZIKeMp7gUUm22dbUFZCBPAiVeO69Rjwzvjpevy4tv1E8U-3yEgLIWbDyLchtBIRWZKpFxcgY';

export default function DoctorProfile() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-display text-slate-900">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-40 py-3 bg-white sticky top-0 z-50">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="size-8 text-primary">
              {/* Healance logo SVG from Stitch */}
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor" />
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285Z" fill="currentColor" fillRule="evenodd" />
                </g>
                <defs><clipPath id="clip0_6_543"><rect fill="white" height="48" width="48" /></clipPath></defs>
              </svg>
            </div>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Healance</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
              style={{ backgroundImage: `url(${USER_AVATAR})` }} />
          </div>
        </header>

        <main className="flex-1 max-w-[960px] mx-auto w-full px-4 py-8 pb-10">
          {/* Doctor Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
            <div className="flex gap-6 items-center">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl size-32 shadow-lg border-4 border-white"
                style={{ backgroundImage: `url(${DOCTOR_PHOTO})` }} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Dr. Sarah Jenkins</h1>
                  <span className="material-symbols-outlined text-primary" title="Verified Professional">verified</span>
                </div>
                <p className="text-primary font-semibold text-lg">Senior Cardiologist</p>
                <p className="text-slate-500 font-medium">MD, PhD — 15 Years Experience</p>
              </div>
            </div>
            <button onClick={() => navigate('/doctor-alert')}
              className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98]">
              Book Appointment
            </button>
          </div>

          {/* Badges */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            <div className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4">
              <span className="material-symbols-outlined text-primary scale-75">workspace_premium</span>
              <p className="text-primary text-sm font-bold">Hero Badge</p>
            </div>
            <div className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4">
              <span className="material-symbols-outlined text-amber-600 scale-75">star</span>
              <p className="text-amber-700 text-sm font-bold">Top Rated</p>
            </div>
            <div className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4">
              <span className="material-symbols-outlined text-emerald-600 scale-75">bolt</span>
              <p className="text-emerald-700 text-sm font-bold">Fast Responder</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Total Patients', val: '2,480+', icon: 'group', iconColor: 'text-primary/60' },
              { label: 'Experience', val: '15 Yrs', icon: 'history_edu', iconColor: 'text-primary/60' },
              { label: 'Avg Rating', val: '4.9', valSuffix: '/5', icon: 'star_rate', iconColor: 'text-amber-400' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2 rounded-2xl p-6 bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 text-sm font-medium">{s.label}</p>
                  <span className={`material-symbols-outlined ${s.iconColor}`}>{s.icon}</span>
                </div>
                <p className="text-slate-900 text-3xl font-bold">
                  {s.val}{s.valSuffix && <span className="text-lg text-slate-400 font-normal">{s.valSuffix}</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* About */}
              <section>
                <h2 className="text-slate-900 text-xl font-bold mb-4">About Dr. Jenkins</h2>
                <p className="text-slate-600 leading-relaxed">
                  Dr. Sarah Jenkins is a board-certified cardiologist with over 15 years of experience in managing complex cardiovascular conditions. She specializes in preventive cardiology, heart failure management, and advanced diagnostic imaging. Her patient-centered approach emphasizes lifestyle modification alongside cutting-edge medical treatments.
                </p>
              </section>

              {/* Specializations */}
              <section>
                <h2 className="text-slate-900 text-xl font-bold mb-4">Specialization</h2>
                <div className="flex flex-wrap gap-2">
                  {['Interventional Cardiology', 'Echocardiography', 'Hypertension Specialist', 'Heart Failure', 'Cardiac Rehabilitation'].map(s => (
                    <span key={s} className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 text-sm font-medium">{s}</span>
                  ))}
                </div>
              </section>

              {/* Emergency History */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-slate-900 text-xl font-bold">Emergency History</h2>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Reliable &amp; Responsive</span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: 'emergency', bg: 'bg-red-100', iconColor: 'text-red-600', title: 'Rapid Response Unit', date: 'Oct 2023', desc: 'Successfully led an emergency triage for acute myocardial infarction. Response time: ', bold: '4 mins' },
                    { icon: 'medical_services', bg: 'bg-blue-100', iconColor: 'text-blue-600', title: 'Critical Care Stabilization', date: 'Aug 2023', desc: 'Stabilized two patients post-cardiac arrest during the Metropolitan Hospital surge.', bold: '' },
                  ].map((e) => (
                    <div key={e.title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white">
                      <div className={`p-2 ${e.bg} rounded-lg`}>
                        <span className={`material-symbols-outlined ${e.iconColor}`}>{e.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-slate-900">{e.title}</h4>
                          <span className="text-xs text-slate-400">{e.date}</span>
                        </div>
                        <p className="text-sm text-slate-500">{e.desc}{e.bold && <span className="font-bold text-slate-700">{e.bold}</span>}{e.bold && '.'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar info */}
            <div className="flex flex-col gap-6">
              {/* Availability */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-4">Availability</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Monday - Friday</span>
                    <span className="font-bold">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Saturday</span>
                    <span className="font-bold">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Emergency 24/7</span>
                    <span className="text-emerald-500 font-bold">On Call</span>
                  </div>
                </div>
                <hr className="my-4 border-slate-200" />
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="material-symbols-outlined scale-75">location_on</span>
                  <span>City General Hospital, Wing B</span>
                </div>
              </div>

              {/* Location */}
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="text-slate-900 font-bold mb-3">Location</h3>
                <div className="rounded-xl overflow-hidden h-40 bg-slate-200 mb-4">
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl">map</span>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 text-primary font-bold hover:underline transition-all">
                  <span className="material-symbols-outlined scale-75">directions</span>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-10 px-6 md:px-40 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900">Healance</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a className="hover:text-primary" href="#">Privacy Policy</a>
              <a className="hover:text-primary" href="#">Terms of Service</a>
              <a className="hover:text-primary" href="#">Help Center</a>
            </div>
            <p className="text-xs text-slate-400">© 2024 Healance Health Services. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
