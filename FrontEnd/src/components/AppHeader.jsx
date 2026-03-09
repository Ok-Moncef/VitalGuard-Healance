/** AppHeader – shared top bar used across all authenticated pages */
export default function AppHeader({ userName = '', avatarSrc = null, showSearch = false, children }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 md:px-10 sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 text-slate-900">
        <div className="bg-primary p-1.5 rounded-lg text-white flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Healance</h2>
      </div>

      {/* Search (optional) */}
      {showSearch && (
        <div className="relative flex-1 max-w-md mx-6 hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Search patient IDs, doctors, or reports..."
            type="text"
          />
        </div>
      )}

      {/* Right slot */}
      <div className="flex flex-1 justify-end gap-3 items-center">
        {children}
        <div className="flex gap-2">
          <button className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
        {avatarSrc ? (
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
            style={{ backgroundImage: `url(${avatarSrc})` }}
          />
        ) : (
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        )}
      </div>
    </header>
  );
}
