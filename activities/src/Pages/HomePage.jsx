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
      <section className="surface-card landing-hero relative overflow-hidden rounded-[2rem] p-8">
        <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-gradient-to-br from-slate-900/10 via-slate-500/10 to-transparent blur-2xl dark:from-slate-100/10 dark:via-slate-400/10 lg:block" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="landing-kicker text-sm font-semibold uppercase tracking-[0.2em]">Today</p>
            <h1 className="section-title landing-title mt-3 text-3xl font-semibold">
              Keep every task visible and intentional.
            </h1>
            <p className="landing-lead mt-3 max-w-2xl text-sm">
              Plan, prioritize, and close your loop with a clean workflow for all your daily activities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompleted}
              className="landing-action rounded-full border px-5 py-2 text-sm font-semibold transition"
            >
              Clear completed
            </button>
            <div className="landing-chip rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
              {stats.pending} pending
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats grid gap-4 md:grid-cols-3">
        <StatsCard label="Total tasks" value={stats.total} subLabel="All tracked activities" />
        <StatsCard label="Completed" value={stats.completed} subLabel="Marked done" />
        <StatsCard label="Pending" value={stats.pending} subLabel="Awaiting action" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr] lg:items-start">
        <div className="space-y-6">
          <TaskInput />
          <div className="surface-card p-4">
            <p className="landing-panel-title text-xs font-semibold uppercase tracking-[0.2em]">
              Quick overview
            </p>
            <p className="landing-panel-copy mt-3 text-sm">
              You have {stats.pending} tasks waiting and {stats.completed} completed. Stay focused by prioritizing the
              high-impact work first.
            </p>
          </div>
        </div>
        <div className="surface-card p-4">
          <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-4 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="landing-panel-title text-sm font-semibold">Search tasks</p>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or notes"
                className="landing-input mt-2 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none transition sm:w-64"
              />
            </div>
            <div>
              <p className="landing-panel-title text-sm font-semibold">Sort by</p>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="landing-select mt-2 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none transition sm:w-44"
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
