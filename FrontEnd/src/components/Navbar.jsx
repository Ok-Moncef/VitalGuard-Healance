import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/emergency', icon: '🚨', label: 'Emergency' },
  { to: '/map', icon: '🗺️', label: 'Map' },
  { to: '/incident', icon: '📋', label: 'Reports' },
];

export default function Navbar({ title = 'Healance', showUserInfo = true, userName = 'Alex S.', role = 'Patient' }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow">H</div>
          <span className="hidden sm:block">Healance</span>
          {title !== 'Healance' && (
            <span className="text-slate-400 font-normal text-base ml-1 hidden sm:block">/ {title}</span>
          )}
        </Link>

        {/* Mobile nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User info */}
        {showUserInfo && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800">{userName}</p>
              <p className="text-xs text-slate-500">{role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow">
              {userName.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
