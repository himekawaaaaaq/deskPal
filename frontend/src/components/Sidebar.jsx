import './Sidebar.css'

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      {/* ロゴ */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✦</div>
        <div className="sidebar-logo-text">
          <h1>デスクPAL</h1>
          <p>机の上の、相棒。</p>
        </div>
      </div>

      {/* メインメニュー */}
      <nav className="sidebar-menu">
        <button
          type="button"
          className={currentPage === 'dashboard' ? 'sidebar-menu-item active' : 'sidebar-menu-item'}
          onClick={() => setCurrentPage('dashboard')}
        >
          <span className="sidebar-menu-icon">⌂</span>
          <span>ダッシュボード</span>
        </button>

        <button
          type="button"
          className={currentPage === 'voice' ? 'sidebar-menu-item active' : 'sidebar-menu-item'}
          onClick={() => setCurrentPage('voice')}
        >
          <span className="sidebar-menu-icon">●</span>
          <span>ボイス設定</span>
        </button>

        <button
          type="button"
          className={currentPage === 'skill' ? 'sidebar-menu-item active' : 'sidebar-menu-item'}
          onClick={() => setCurrentPage('skill')}
        >
          <span className="sidebar-menu-icon">↗</span>
          <span>
            連携ツール・
            <br />
            Skill管理
          </span>
        </button>

        <button
          type="button"
          className={currentPage === 'log' ? 'sidebar-menu-item active' : 'sidebar-menu-item'}
          onClick={() => setCurrentPage('log')}
        >
          <span className="sidebar-menu-icon">▥</span>
          <span>データ・ログ確認</span>
        </button>
      </nav>

      {/* 下部メニュー */}
      <div className="sidebar-bottom">
        <button type="button" className="sidebar-menu-item">
          <span className="sidebar-menu-icon">⚙</span>
          <span>設定</span>
        </button>

        <button type="button" className="sidebar-menu-item">
          <span className="sidebar-menu-icon">👤</span>
          <span>ユーザー</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar