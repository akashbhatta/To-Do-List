import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './Pages/HomePage'
import CompletedPage from './Pages/CompletedPage'
import PendingPage from './Pages/PendingPage'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <TodoProvider>
      <div className="app-shell flex min-h-screen flex-col text-slate-900 dark:text-white">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 lg:px-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TodoProvider>
  )
}

export default App
