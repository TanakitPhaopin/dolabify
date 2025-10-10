import { useEffect } from 'react'
import './App.css'
import API from './api'

function App() {

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await API.get('/test/ocheer');
        console.log('Response from /test:', response.data);
      } catch (error) {
        console.error('Error fetching /test:', error);
      }
    };

    fetchTest();
  }, []);

  return (
    <>
      <div>
        <p>Home page</p>
      </div>
    </>
  )
}

export default App
