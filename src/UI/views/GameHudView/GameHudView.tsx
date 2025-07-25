import classNames from "classnames"
import './GameHudView.css'
import { AppViews, useAppStore } from "../../../stores/AppStore"

export interface GameHudViewProps {
  show?: boolean
}

export const GameHudView = (props: GameHudViewProps) => {
  const {
    show
  } = props
  const setView = useAppStore((state) => state.setView)
  const gameHudViewClass = classNames("View GameHudView", { hide: !show })

  return (
    <section className={gameHudViewClass}>
      <dl className="GameScore">
        <dt className="Title">Score</dt>
        <dd className="Score">12</dd>
      </dl>
      <dialog className="EndScreen" open>
        <dl className="Stats">
          <dt className="CurrentScoreTitle">Your Score</dt>
          <dd className="CurrentScore">37</dd>
          <dt className="HighScoreTitle">
            <span className="NewHighScore">New</span>
            High Score
          </dt>
          <dd className="HighScore">37</dd>
        </dl>
        <div className="ActionWrapper">
          <button>Play Again</button>
          <button
            onClick={() => setView(AppViews.start)}
          >
            Pick Level
          </button>
        </div>
      </dialog>
    </section>
  )
}