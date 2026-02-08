import { useState } from 'react'
import { useTodos } from '../../context/TodoContext'

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

function TaskInput() {
  const { addTodo } = useTodos()
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (event) => {
    event.preventDefault()
    addTodo(title, notes, priority)
    setTitle('')
    setNotes('')
    setPriority('medium')
  }

  const disabled = !title.trim()

  return (
    <form onSubmit={handleSubmit} className="surface-card p-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Task title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Plan the weekly sprint review"
            className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notes</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add details, context, or next steps"
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Priority</label>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200/80 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white sm:w-44"
            >
              {priorities.map((item) => (
                <option key={item.value} value={item.value} className="text-slate-900">
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-white dark:text-slate-900 dark:disabled:bg-slate-700"
          >
            Add task
          </button>
        </div>
      </div>
    </form>
  )
}

export default TaskInput
