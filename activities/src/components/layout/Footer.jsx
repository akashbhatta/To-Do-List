import { NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import { useTodos } from '../../context/TodoContext'

function Footer() {
  const year = new Date().getFullYear()
  const { todos, clearCompleted } = useTodos()
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    return { total, completed, pending: total - completed }
  }, [todos])

  return (
    <footer className="border-t border-slate-200/70 bg-white/70 py-8 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-6">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                TL
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-white">TaskFlow</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Professional to-do companion</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Built for focus, clarity, and calm task management. Keep priorities visible and confidence high.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                Syncs locally
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                Offline ready
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                Privacy first
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Workflow
            </p>
            <NavLink to="/" className="block text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              All tasks
            </NavLink>
            <NavLink to="/pending" className="block text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              Pending focus
            </NavLink>
            <NavLink to="/completed" className="block text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              Completed archive
            </NavLink>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Status
            </p>
            <p className="text-slate-600 dark:text-slate-300">Total tasks: {stats.total}</p>
            <p className="text-slate-600 dark:text-slate-300">Pending: {stats.pending}</p>
            <p className="text-slate-600 dark:text-slate-300">Completed: {stats.completed}</p>
            <button
              type="button"
              onClick={clearCompleted}
              className="mt-2 rounded-full border border-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-slate-500"
            >
              Clear completed
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200/70 pt-4 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row">
          <p>© {year} TaskFlow. Crafted for intentional progress.</p>
          <p>Made with clarity, built for consistency.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
