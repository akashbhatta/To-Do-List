import TaskItem from './TaskItem'

function TaskList({ todos, onToggle, onDelete, onUpdate, emptyMessage }) {
  if (!todos.length) {
    return (
      <div className="surface-card surface-card--dashed p-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

export default TaskList
