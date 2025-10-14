import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './pages/Signup'
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Add Fall back route */}
        <Route path="*" element={<div className='text-2xl text-black'>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
