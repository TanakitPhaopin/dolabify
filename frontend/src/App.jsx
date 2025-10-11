import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        {/* Add Fall back route */}
        <Route path="*" element={<div className='text-2xl text-black'>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
