import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import UserForm from './pages/UserForm'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
          <h1 className="text-4xl font-bold mb-8">Welcome</h1>
          <a href="/registration" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
            Go to Registration
          </a>
        </div>
      } />
      <Route path="/registration" element={<Registration />} />
      <Route path="/user/new" element={<UserForm />} />
      <Route path="/user/edit/:id" element={<UserForm />} />
    </Routes>
  )
}

export default App
