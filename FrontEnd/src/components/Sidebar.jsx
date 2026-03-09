import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ links = [], userName = 'Dr. Smith', role = 'On-call Physician', avatarSrc = null }) {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white min-h-screen">
      {/* User profile area */}
      <div className="flex items-center gap-3 p-4 pt-5">
        {avatarSrc ? (
          <div
            className="size-12 rounded-full bg-cover bg-center bg-no-repeat border border-slate-200 flex-shrink-0"
            style={{ backgroundImage: `url(${avatarSrc})` }}
          />
        ) : (
          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary">account_circle</span>
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-slate-900 text-base font-bold">{userName}</h1>
          <p className="text-slate-500 text-xs font-medium">{role}</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-3 pb-4">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              className={active ? 'nav-link-active' : 'nav-link'}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
              {link.badge && (
                <span className="ml-auto bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
