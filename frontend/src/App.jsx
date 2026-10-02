import { useState } from 'react'
import Dashboard from './pages/01-Dashboard.jsx'
import Voice from './pages/02-Voice.jsx'
import SkillManagement from './pages/03-SkillManagement.jsx'
import Log from './pages/04-Log.jsx'

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

      {currentPage === 'skill' && (
        <SkillManagement
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'log' && (
        <Log
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default App