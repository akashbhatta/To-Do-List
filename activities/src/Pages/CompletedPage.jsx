import { useMemo, useState } from 'react'
import TaskList from '../components/todo/TaskList'
import { useTodos } from '../context/TodoContext'

function CompletedPage() {
  const { todos, toggleTodo, removeTodo, updateTodo } = useTodos()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return todos
      .filter((todo) => todo.completed)
      .filter((todo) =>
        query ? [todo.title, todo.notes].some((field) => field.toLowerCase().includes(query)) : true,
      )
  }, [todos, search])

  return (
    <div className="space-y-6">
      <header className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Completed</p>
        <h2 className="section-title mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Celebrate the wins.</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Review what you have already finished.</p>
      </header>

      <section className="surface-card p-4">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Search completed</p>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search completed tasks"
          className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white sm:w-64"
        />
      </section>

      <TaskList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={removeTodo}
        onUpdate={updateTodo}
        emptyMessage="No completed tasks yet. Finish a task to see it here."
      />
    </div>
  )
}

export default CompletedPage
