import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './pages/Signup'
import Login from './pages/Login';
import MyProjects from './pages/MyProjects';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route path="/projects" element={
          <ProtectedRoute>
            <Sidebar>
              <MyProjects />
            </Sidebar>
          </ProtectedRoute>
        } />

        {/* Add Fall back route */}
        <Route path="*" element={<div className='text-2xl text-black'>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
