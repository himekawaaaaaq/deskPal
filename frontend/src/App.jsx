import { useState } from 'react'
import Dashboard from './pages/01-Dashboard.jsx'
import Voice from './pages/02-Voice.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  // 現在表示している画面
  const [currentPage, setCurrentPage] = useState('dashboard')

  // 実装済み
  if (currentPage === 'dashboard') {
    return (
      <Dashboard
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    )
  }

  if (currentPage === 'voice') {
    return (
      <Voice
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    )
  }

  // 未実装
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#101827',
        color: '#ffffff',
      }}
    >
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '24px',
        }}
      >
        <h1>現在準備中</h1>
        <p>( ･﹃･ )</p>

        <button
          type="button"
          onClick={() => setCurrentPage('dashboard')}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '10px',
            background: '#d57e9f',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          ダッシュボードに戻る
        </button>
      </main>
    </div>
  )
}

export default App