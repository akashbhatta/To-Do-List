import { useMemo, useState } from 'react'
import StatsCard from '../components/todo/StatsCard'
import TaskInput from '../components/todo/TaskInput'
import TaskList from '../components/todo/TaskList'
import { useTodos } from '../context/TodoContext'

const sorters = {
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  priority: (a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  },
}

function HomePage() {
  const { todos, toggleTodo, removeTodo, updateTodo, clearCompleted } = useTodos()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [todos])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = query
      ? todos.filter((todo) =>
          [todo.title, todo.notes].some((field) => field.toLowerCase().includes(query)),
        )
      : todos
    return [...list].sort(sorters[sortBy] || sorters.newest)
  }, [todos, search, sortBy])

  return (
    <div className="space-y-8">
      <section className="surface-card relative overflow-hidden rounded-[2rem] p-8">
        <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-gradient-to-br from-slate-900/10 via-slate-500/10 to-transparent blur-2xl dark:from-slate-100/10 dark:via-slate-400/10 lg:block" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Today</p>
            <h1 className="section-title mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Keep every task visible and intentional.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Plan, prioritize, and close your loop with a clean workflow for all your daily activities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompleted}
              className="rounded-full border border-slate-200/80 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-slate-500"
            >
              Clear completed
            </button>
            <div className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-slate-900">
              {stats.pending} pending
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Total tasks" value={stats.total} subLabel="All tracked activities" />
        <StatsCard label="Completed" value={stats.completed} subLabel="Marked done" />
        <StatsCard label="Pending" value={stats.pending} subLabel="Awaiting action" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr] lg:items-start">
        <div className="space-y-6">
          <TaskInput />
          <div className="surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Quick overview
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              You have {stats.pending} tasks waiting and {stats.completed} completed. Stay focused by prioritizing the
              high-impact work first.
            </p>
          </div>
        </div>
        <div className="surface-card p-4">
          <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-4 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Search tasks</p>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or notes"
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white sm:w-64"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Sort by</p>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white sm:w-44"
              >
                <option value="newest" className="text-slate-900">Newest</option>
                <option value="oldest" className="text-slate-900">Oldest</option>
                <option value="priority" className="text-slate-900">Priority</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <TaskList
              todos={filtered}
              onToggle={toggleTodo}
              onDelete={removeTodo}
              onUpdate={updateTodo}
              emptyMessage="No tasks yet. Add your first activity on the left."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
