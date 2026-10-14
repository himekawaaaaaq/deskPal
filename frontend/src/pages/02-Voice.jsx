
import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import './02-Voice.css'

function Voice({ currentPage, setCurrentPage }) {
  // VOICEVOXの接続状態（現在は画面表示用の仮データ）
  const [engineConnected] = useState(true)

  // 声の設定
  const [voice, setVoice] = useState('四国めたん')

  // 話す速さ
  const [speed, setSpeed] = useState(1.0)

  // 音量
  const [volume, setVolume] = useState(50)

  // 現在選択されているマイセット
  const [character, setCharacter] = useState('セットA')

  // 登録されている定型文
  const [phrases, setPhrases] = useState([
    'おはようございます',
    '少し休憩しませんか？',
    'お疲れさまでした',
  ])

  // 新しく入力する定型文
  const [newPhrase, setNewPhrase] = useState('')

  // 定型文を追加する処理
  const addPhrase = () => {
    const trimmedPhrase = newPhrase.trim()

    // 空白だけの場合は追加しない
    if (trimmedPhrase === '') return

    setPhrases((currentPhrases) => [
      ...currentPhrases,
      trimmedPhrase,
    ])

    // 追加後は入力欄を空にする
    setNewPhrase('')
  }

  // Enterキーでも定型文を追加できるようにする
  const handlePhraseKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addPhrase()
    }
  }

  // 指定した定型文を削除する処理
  const deletePhrase = (targetIndex) => {
    setPhrases((currentPhrases) =>
      currentPhrases.filter(
        (_, index) => index !== targetIndex
      )
    )
  }

  return (
    <div className="voice-page">
      {/* 共通サイドバー */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="voice-main">
        {/* ヘッダー */}
        <header className="voice-header">
          <div>
            <p className="voice-header-label">
              VOICE SETTINGS
            </p>

            <h1>ボイス設定</h1>

            <p className="voice-header-description">
              Desk PALの声や話し方を設定できます。
            </p>
          </div>

          {/* VOICEVOXの接続状態 */}
          <div
            className={
              engineConnected
                ? 'voice-engine-status connected'
                : 'voice-engine-status'
            }
          >
            <span className="voice-engine-dot"></span>

            {engineConnected
              ? 'VOICEVOX 接続中'
              : 'VOICEVOX 未接続'}
          </div>
        </header>

        {/* VOICEVOX Engine */}
        <section className="voice-card voice-engine-card">
          <div className="voice-section-title">
            <div className="voice-section-icon">
              ◇
            </div>

            <div>
              <span>ENGINE</span>
              <h2>VOICEVOX Engine</h2>
            </div>
          </div>

          <div className="voice-engine-content">
            <div>
              <span className="voice-item-label">
                Engine状態
              </span>

              <strong>
                {engineConnected
                  ? '正常に接続されています'
                  : '接続されていません'}
              </strong>
            </div>

            <div
              className={
                engineConnected
                  ? 'voice-engine-badge connected'
                  : 'voice-engine-badge'
              }
            >
              <span></span>

              {engineConnected
                ? '接続中'
                : '未接続'}
            </div>
          </div>
        </section>

        {/* 声・速度・音量の設定 */}
        <section className="voice-settings-grid">
          {/* 声の選択 */}
          <article className="voice-card voice-setting-card">
            <div className="voice-setting-heading">
              <div className="voice-setting-icon">
                ♪
              </div>

              <div>
                <span>VOICE</span>
                <h2>声</h2>
              </div>
            </div>

            <label className="voice-label">
              使用する声
            </label>

            <select
              className="voice-select"
              value={voice}
              onChange={(event) =>
                setVoice(event.target.value)
              }
            >
              <option value="四国めたん">
                四国めたん
              </option>

              <option value="ずんだもん">
                ずんだもん
              </option>

              <option value="春日部つむぎ">
                春日部つむぎ
              </option>
            </select>

            <p className="voice-value-description">
              現在：{voice}
            </p>
          </article>

          {/* 話す速さ */}
          <article className="voice-card voice-setting-card">
            <div className="voice-setting-heading">
              <div className="voice-setting-icon pink">
                »
              </div>

              <div>
                <span>SPEED</span>
                <h2>話す速さ</h2>
              </div>
            </div>

            <div className="voice-range-value">
              {Number(speed).toFixed(1)}x
            </div>

            <input
              className="voice-range"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(event) =>
                setSpeed(Number(event.target.value))
              }
            />

            <div className="voice-speed-labels">
              <span className="voice-speed-slow">
                0.5x
                <small>ゆっくり</small>
              </span>

              <span className="voice-speed-normal">
                1.0x
                <small>標準</small>
              </span>

              <span className="voice-speed-fast">
                2.0x
                <small>速い</small>
              </span>
            </div>
          </article>

          {/* 音量 */}
          <article className="voice-card voice-setting-card">
            <div className="voice-setting-heading">
              <div className="voice-setting-icon yellow">
                ◖
              </div>

              <div>
                <span>VOLUME</span>
                <h2>音量</h2>
              </div>
            </div>

            <div className="voice-range-value">
              {volume}%
            </div>

            <input
              className="voice-range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={(event) =>
                setVolume(Number(event.target.value))
              }
            />

            <div className="voice-volume-labels">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </article>
        </section>

        {/* マイセット・キャッシュ管理 */}
        <section className="voice-bottom-grid">
          {/* マイセット */}
          <article className="voice-card voice-character-card">
            <div className="voice-section-title">
              <div className="voice-section-icon purple">
                ✦
              </div>

              <div>
                <span>CHARACTER</span>
                <h2>マイセット</h2>
              </div>
            </div>

            {/* 現在選択されているセット */}
            <div className="voice-character-preview">
              <div className="voice-character-avatar">
                ◇
              </div>

              <div>
                <span>現在のセット</span>
                <strong>{character}</strong>
              </div>
            </div>

            {/* セットの選択 */}
            <label className="voice-label">
              セット
            </label>

            <select
              className="voice-select"
              value={character}
              onChange={(event) =>
                setCharacter(event.target.value)
              }
            >
              <option value="セットA">
                セットA
              </option>

              <option value="セットB">
                セットB
              </option>
            </select>
          </article>

          {/* キャッシュ管理 */}
          <article className="voice-card voice-cache-card">
            <div className="voice-section-title">
              <div className="voice-section-icon pink">
                ▤
              </div>

              <div>
                <span>CACHE</span>
                <h2>キャッシュ管理</h2>
              </div>
            </div>

            <p className="voice-cache-description">
              よく使用する定型文を登録できます。
            </p>

            {/* 定型文の入力欄 */}
            <div className="voice-phrase-input-row">
              <input
                type="text"
                className="voice-text-input"
                placeholder="定型文を入力"
                value={newPhrase}
                onChange={(event) =>
                  setNewPhrase(event.target.value)
                }
                onKeyDown={handlePhraseKeyDown}
              />

              <button
                type="button"
                className="voice-add-button"
                onClick={addPhrase}
                disabled={newPhrase.trim() === ''}
              >
                ＋ 追加
              </button>
            </div>

            {/* 登録済みの定型文一覧 */}
            <div className="voice-phrase-list">
              {phrases.length === 0 && (
                <div className="voice-empty-message">
                  登録されている定型文はありません。
                </div>
              )}

              {phrases.map((phrase, index) => (
                <div
                  className="voice-phrase-item"
                  key={`${phrase}-${index}`}
                >
                  <span className="voice-phrase-icon">
                    ♪
                  </span>

                  <span className="voice-phrase-text">
                    {phrase}
                  </span>

                  <button
                    type="button"
                    className="voice-delete-button"
                    onClick={() =>
                      deletePhrase(index)
                    }
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default Voice
