import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import './01-Dashboard.css'

function Dashboard({
  currentPage,
  setCurrentPage,
}) {
  // 現在日時
  const [now, setNow] = useState(new Date())

  // AI判断理由の詳細表示
  const [showAiDetail, setShowAiDetail] = useState(false)

  // 現在時刻を更新
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // 日付
  const dateText = now.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  })

  // 時刻
  const timeText = now.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // 今日の作業リズム
  const rhythmData = [
    16, 23, 19, 13, 18,
    27, 29, 38, 53, 75,
    94, 80, 73, 58, 50,
    54, 60, 41, 27, 20,
    33, 50, 62, 36,
  ]

  // 最近の介入履歴
  const interventionHistory = [
    {
      time: '21:30',
      title: '休憩を提案しました',
      description: '長時間の作業を検出しました',
      color: 'blue',
    },
    {
      time: '20:30',
      title: '集中モードを継続',
      description: '良い集中状態が続いています',
      color: 'green',
    },
    {
      time: '19:00',
      title: '通知を一時保留',
      description: '作業中のため通知を保留しました',
      color: 'pink',
    },
    {
      time: '17:30',
      title: '作業開始を検知',
      description: 'PCの操作を検知しました',
      color: 'yellow',
    },
    {
      time: '16:00',
      title: '休憩終了を検知',
      description: '作業を再開しました',
      color: 'green',
    },
    {
      time: '15:00',
      title: '休憩を提案しました',
      description: '連続した作業を検出しました',
      color: 'blue',
    },
  ]

  // AIの判断理由
  const aiReasons = [
    '操作頻度は平常より高めです',
    '一定時間作業が継続しています',
    '姿勢の変化は少なめです',
  ]

  // 現在の接続一覧
  const connections = [
    {
      icon: '▣',
      name: 'PC（この端末）',
      connected: true,
    },
    {
      icon: '□',
      name: 'カメラ',
      connected: true,
    },
    {
      icon: '♪',
      name: 'マイク',
      connected: true,
    },
    {
      icon: '◐',
      name: 'スピーカー',
      connected: true,
    },
    {
      icon: '●',
      name: 'Googleカレンダー',
      connected: true,
    },
    {
      icon: '▦',
      name: 'Slack',
      connected: true,
    },
  ]

  return (
    <div className="dashboard">

      {/* サイドバー */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="dashboard-main">

        {/* ヘッダー */}
        <header className="dashboard-header">
          <div className="dashboard-greeting">
            <h1>おかえりなさい。</h1>
            <p>今日も、いい一日になりますように。</p>
          </div>

          <div className="dashboard-header-right">

            <div className="dashboard-connection">
              <span className="dashboard-online-dot"></span>
              <span>接続中</span>
            </div>

            <div className="dashboard-clock">
              <span>{dateText}</span>
              <strong>{timeText}</strong>
            </div>

          </div>
        </header>

        {/* 上部カード */}
        <section className="dashboard-top-grid">

          <article className="dashboard-card dashboard-focus-card">
            <div className="dashboard-focus-content">
              <span>現在の集中状態</span>
              <strong>集中</strong>
              <p>いいペースで作業できています！</p>
            </div>
          </article>

          <article className="dashboard-card dashboard-work-card">
            <div className="dashboard-work-top">
              <div className="dashboard-work-icon">
                ◷
              </div>

              <div>
                <span>今日の作業時間</span>
                <strong>1時間25分</strong>
              </div>
            </div>

            <div className="dashboard-progress-row">
              <div className="dashboard-progress">
                <div className="dashboard-progress-value"></div>
              </div>

              <span>目標 2時間</span>
            </div>
          </article>

          <article className="dashboard-card dashboard-notification-card">
            <div className="dashboard-notification-icon">
              ◇
            </div>

            <div>
              <span>保留通知件数</span>
              <strong>3件</strong>
              <p>あとで確認しましょう</p>
            </div>

            <button
              type="button"
              className="dashboard-arrow-button"
            >
              ›
            </button>
          </article>

        </section>

        {/* 今日の作業リズム */}
        <section className="dashboard-card dashboard-rhythm-card">

          <div className="dashboard-section-header">
            <h2>
              <span>▥</span>
              今日の作業リズム
            </h2>

            <button
              type="button"
              className="dashboard-day-button"
            >
              今日
              <span>⌄</span>
            </button>
          </div>

          <div className="dashboard-rhythm-content">

            <div className="dashboard-chart-wrapper">

              <div className="dashboard-chart-y">
                <span>集中度</span>

                <div className="dashboard-y-labels">
                  <span>高</span>
                  <span>低</span>
                </div>
              </div>

              <div className="dashboard-chart">

                <div className="dashboard-chart-bars">
                  {rhythmData.map((value, index) => (
                    <div
                      key={index}
                      className="dashboard-bar"
                      style={{
                        height: `${Math.max(value, 12)}%`,
                      }}
                    ></div>
                  ))}
                </div>

                <div className="dashboard-chart-labels">
                  <span>0時</span>
                  <span>3時</span>
                  <span>6時</span>
                  <span>9時</span>
                  <span>12時</span>
                  <span>15時</span>
                  <span>18時</span>
                  <span>21時</span>
                  <span>24時</span>
                </div>

              </div>
            </div>

            <div className="dashboard-rhythm-message">
              <strong>
                いいペースで進んでいます
              </strong>

              <p>
                午前は集中して作業できており、
                午後はやや落ち着いたペースです。
              </p>
            </div>

          </div>
        </section>

        {/* 下部カード */}
        <section className="dashboard-bottom-grid">

          {/* 最近の介入履歴 */}
          <article className="dashboard-card dashboard-history-card">

            <div className="dashboard-section-header">
              <h2>
                <span>▣</span>
                最近の介入履歴
              </h2>

              <button
                type="button"
                className="dashboard-text-button"
              >
                すべて見る
              </button>
            </div>

            <div className="dashboard-history-list">
              {interventionHistory.map((item, index) => (
                <div
                  className="dashboard-history-item"
                  key={index}
                >
                  <span
                    className={`dashboard-history-dot ${item.color}`}
                  ></span>

                  <span className="dashboard-history-time">
                    {item.time}
                  </span>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </article>

          {/* AIの判断理由 */}
          <article className="dashboard-card dashboard-ai-card">

            <div className="dashboard-section-header">
              <h2>
                <span>✦</span>
                AIの判断理由
              </h2>

              <button
                type="button"
                className="dashboard-detail-button"
                onClick={() => {
                  setShowAiDetail(!showAiDetail)
                }}
              >
                {showAiDetail
                  ? '閉じる'
                  : '詳細を見る'}

                <span>›</span>
              </button>
            </div>

            <p className="dashboard-ai-description">
              現在、キーボードやマウスの操作が安定しており、
              一定の作業が継続されています。
            </p>

            <div className="dashboard-ai-reasons">
              {aiReasons.map((reason, index) => (
                <div
                  className="dashboard-ai-reason"
                  key={index}
                >
                  <span>✓</span>
                  <p>{reason}</p>
                </div>
              ))}
            </div>

            {showAiDetail && (
              <div className="dashboard-ai-detail">
                Flow Guardianは現在の操作状況や
                作業継続時間などから、
                集中を妨げないことを優先しています。
              </div>
            )}

          </article>

          {/* 現在の接続一覧 */}
          <article className="dashboard-card dashboard-connections-card">

            <div className="dashboard-section-header">
              <h2>
                <span>↗</span>
                現在の接続一覧
              </h2>
            </div>

            <div className="dashboard-connections-list">
              {connections.map((connection, index) => (
                <div
                  className="dashboard-connection-item"
                  key={index}
                >
                  <span className="dashboard-device-icon">
                    {connection.icon}
                  </span>

                  <strong>
                    {connection.name}
                  </strong>

                  <div className="dashboard-device-status">
                    <span
                      className={
                        connection.connected
                          ? 'dashboard-device-dot connected'
                          : 'dashboard-device-dot'
                      }
                    ></span>

                    {connection.connected
                      ? '接続中'
                      : '未接続'}
                  </div>
                </div>
              ))}
            </div>

          </article>

        </section>

      </main>
    </div>
  )
}

export default Dashboard