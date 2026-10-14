import { useState } from 'react'
import Dashboard from './pages/01-Dashboard.jsx'
import Voice from './pages/02-Voice.jsx'

function App() {
  // 現在表示している画面
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <>
      {currentPage === 'dashboard' && (
        <Dashboard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'voice' && (
        <Voice
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default App