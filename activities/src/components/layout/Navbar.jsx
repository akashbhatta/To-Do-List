import { NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import { useTodos } from '../../context/TodoContext'

const linkBase = 'px-3 py-2 rounded-full text-sm font-semibold transition focus-ring'
const linkActive = 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
const linkIdle =
  'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800/70'

function Navbar() {
  const { theme, toggleTheme, todos } = useTodos()
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    return { total, completed, pending: total - completed }
  }, [todos])
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
            TL
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">TaskFlow</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Personal productivity hub</p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`} end>
            All
          </NavLink>
          <NavLink to="/completed" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
            Completed
          </NavLink>
          <NavLink to="/pending" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
            Pending
          </NavLink>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:flex">
            <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/70">
              {today}
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/70">
              {stats.pending} pending
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/70">
              {stats.completed} done
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle focus-ring"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 3.2v2.2M12 18.6v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M3.2 12h2.2M18.6 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20.5 14.6a7.6 7.6 0 1 1-9.7-10 7 7 0 0 0 9.7 10Z" />
              </svg>
            )}
          </button>
          <NavLink
            to="/"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            Add Task
          </NavLink>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 pb-4 md:hidden lg:px-6">
        <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`} end>
          All
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
          Completed
        </NavLink>
        <NavLink to="/pending" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
          Pending
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
