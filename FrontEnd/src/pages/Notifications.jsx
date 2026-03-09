const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEjDf9afu-PUBmTcFaJPj3lFvXXv64svH_96JPkDg_H1tUbfziSjOF3UQ6BZjexzaOEX_UO7ITJhIVMmUoKXZ4bt2-Py6tbC5iLr3XC2u6ITcsUkLQ4QQrfXty-lsYM4nqSdIJQuMJHIf7kFxlTJgdhqEOLmv-OoLKIbWODFjtx6fv-grNln6mwimQuPIMjkJcJK7547wnmqlvFzQChHN0xQjvwgIn9eFa-o9GyiViAnu9AAjfTYdgs-8VYs6Rrc4I73cDFs566Q0';

const notifications = {
  Today: [
    { icon: 'warning', iconBg: 'bg-red-500', iconColor: 'text-white', cardBg: 'bg-red-50 border-red-100', title: 'Emergency: High Heart Rate Detected', titleColor: 'text-red-900', body: 'Your heart rate exceeded 100bpm while at rest for 5 minutes. Please take a moment to sit down and rest.', bodyColor: 'text-red-700', time: '2m ago', timeColor: 'text-red-600', dot: 'bg-red-500', unread: true },
    { icon: 'medication', iconBg: 'bg-primary/10', iconColor: 'text-primary', cardBg: 'bg-white border-slate-100', title: 'Health Reminder: Medication', titleColor: 'text-slate-900', body: 'Time to take your Vitamin D and Magnesium supplements as scheduled.', bodyColor: 'text-slate-500', time: '45m ago', timeColor: 'text-slate-400', dot: 'bg-primary', unread: true },
    { icon: 'update', iconBg: 'bg-slate-100', iconColor: 'text-slate-500', cardBg: 'bg-white border-slate-100 opacity-75', title: 'System Update Complete', titleColor: 'text-slate-700', body: 'Healance OS has been updated to version 2.4.0. New health insights are now available.', bodyColor: 'text-slate-500', time: '3h ago', timeColor: 'text-slate-400', dot: '', unread: false },
  ],
  Yesterday: [
    { icon: 'fitness_center', iconBg: 'bg-primary/10', iconColor: 'text-primary', cardBg: 'bg-white border-slate-100 opacity-75', title: 'Goal Achieved!', titleColor: 'text-slate-900', body: 'Congratulations! You reached your 10,000 steps goal for the 5th day in a row.', bodyColor: 'text-slate-500', time: 'Yesterday, 9:30 PM', timeColor: 'text-slate-400', dot: '', unread: false },
    { icon: 'sync', iconBg: 'bg-slate-100', iconColor: 'text-slate-500', cardBg: 'bg-white border-slate-100 opacity-75', title: 'Data Export Ready', titleColor: 'text-slate-700', body: 'Your monthly health report is ready for download in the documents section.', bodyColor: 'text-slate-500', time: 'Yesterday, 10:00 AM', timeColor: 'text-slate-400', dot: '', unread: false },
  ],
};

export default function Notifications() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 lg:px-40 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined text-xl">notifications_active</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Healance Notifications</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 lg:gap-8">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 hover:bg-primary/20 transition-colors" title="Mark all as read">
              <span className="material-symbols-outlined">done_all</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 hover:bg-primary/20 transition-colors" title="Filter">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30"
            style={{ backgroundImage: `url(${USER_AVATAR})` }} />
        </div>
      </header>

      <main className="flex flex-1 justify-center py-6 px-4 lg:px-40">
        <div className="flex flex-col max-w-[960px] flex-1">
          {/* Tabs */}
          <div className="pb-6">
            <div className="flex border-b border-slate-200 gap-8 overflow-x-auto">
              {[['emergency', 'Emergency', true], ['monitor_heart', 'Health', false], ['settings_suggest', 'System', false]].map(([icon, label, active]) => (
                <a key={label} href="#" className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-all ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                    <p className="text-sm font-bold leading-normal tracking-wide">{label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(notifications).map(([group, items]) => (
            <div key={group} className="mb-8">
              <h3 className="text-lg font-bold leading-tight px-2 pb-4">{group}</h3>
              <div className="flex flex-col gap-2">
                {items.map((n) => (
                  <div key={n.title} className={`flex items-center gap-4 ${n.cardBg} border rounded-xl px-4 min-h-[88px] py-3 justify-between cursor-pointer hover:shadow-md transition-shadow`}>
                    <div className="flex items-center gap-4">
                      <div className={`${n.iconBg} ${n.iconColor} flex items-center justify-center rounded-lg shrink-0 size-12 shadow-sm`}>
                        <span className="material-symbols-outlined">{n.icon}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className={`${n.titleColor} text-base font-bold leading-normal line-clamp-1`}>{n.title}</p>
                        <p className={`${n.bodyColor} text-sm font-normal leading-normal line-clamp-2`}>{n.body}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <p className={`${n.timeColor} text-xs font-semibold uppercase tracking-wider`}>{n.time}</p>
                      {n.dot && <span className={`size-2 rounded-full ${n.dot}`} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-auto py-10 border-t border-slate-200 text-center">
            <p className="text-slate-400 text-sm mb-4">Need help managing your alerts?</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-sm hover:brightness-105 transition-all">Notification Settings</button>
              <button className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-50 transition-all">Clear All</button>
            </div>
          </div>
        </div>
      </main>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
