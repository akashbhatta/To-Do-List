import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TodoContext = createContext(null)

const todosKey = 'todo-items-v1'
const themeKey = 'todo-theme-v1'

const readTodos = () => {
  try {
    const raw = localStorage.getItem(todosKey)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const readTheme = () => {
  try {
    return localStorage.getItem(themeKey) || 'light'
  } catch {
    return 'light'
  }
}

const nextId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(readTodos)
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    localStorage.setItem(todosKey, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(themeKey, theme)
  }, [theme])

  const addTodo = (title, notes, priority) => {
    const trimmed = title.trim()
    if (!trimmed) return
    const item = {
      id: nextId(),
      title: trimmed,
      notes: notes?.trim() || '',
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodos((prev) => [item, ...prev])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo,
      ),
    )
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo,
      ),
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      removeTodo,
      updateTodo,
      clearCompleted,
      theme,
      toggleTheme,
    }),
    [todos, theme],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within TodoProvider')
  return ctx
}
