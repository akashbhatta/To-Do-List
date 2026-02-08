import { useState } from 'react'

const priorityStyle = {
  low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  medium: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  high: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
}

function TaskItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [notes, setNotes] = useState(todo.notes)

  const handleSave = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onUpdate(todo.id, { title: trimmed, notes: notes.trim() })
    setIsEditing(false)
  }

  return (
    <div className="surface-card group p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-400 dark:border-slate-600"
          />
          <div>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white"
                />
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200/80 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700/80 dark:text-white"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm dark:bg-white dark:text-slate-900"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle(todo.title)
                      setNotes(todo.notes)
                      setIsEditing(false)
                    }}
                    className="rounded-full border border-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700/80 dark:text-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p
                  className={`text-base font-semibold ${
                    todo.completed
                      ? 'text-slate-400 line-through dark:text-slate-500'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {todo.title}
                </p>
                {todo.notes ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{todo.notes}</p> : null}
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  Created {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle[todo.priority] || priorityStyle.medium}`}
          >
            {todo.priority}
          </span>
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="rounded-full border border-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-slate-500"
          >
            {isEditing ? 'Close' : 'Edit'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-400 dark:border-rose-500/40 dark:text-rose-300 dark:hover:border-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
