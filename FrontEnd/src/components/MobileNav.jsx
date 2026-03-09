import { Link, useLocation } from 'react-router-dom';

export default function MobileNav({ links = [] }) {
  const location = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex items-center justify-around px-2 py-2">
      {links.map((link) => {
        const active = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[52px] transition-colors ${
              active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] leading-none">{link.icon}</span>
            <span className="text-[10px] font-semibold leading-none">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
