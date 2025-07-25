import classNames from "classnames"
import './StartMenuView.css'
import { AppViews, useAppStore, type AppViewType } from "../../../stores/AppStore"
import { levelIndexByName, levels, levelsByName } from "../../../data/levels"
import { wrapMod } from "../../../utils/mathUtils"
import { useCallback } from "react"

export interface StartMenuViewProps {
  show?: boolean
}

export const StartMenuView = (props: StartMenuViewProps) => {
  const {
    show
  } = props
  const {
    level,
    setLevel,
    setView
  } = useAppStore()
  const levelData = levelsByName[level]
  const startMenuViewClass = classNames("View StartMenuView", { hide: !show })

  const _setLevel = useCallback((direction: number) => {
    return () => {
      const currentIndex = levelIndexByName[level] ?? 0
      const nextIndex = wrapMod(currentIndex + direction, levels.length)
      const nextLevelName = levels[nextIndex].name
      setLevel(nextLevelName)
    }
  }, [level, setLevel])

  const _setView = useCallback((view: AppViewType) => {
    setView(view)
  }, [setView])

  return (
    <section className={startMenuViewClass}>
      <h1>{levelData?.displayName}</h1>
      <img
        className="PreviewImg"
        src={levelData?.previewImg}
        alt="Image of rolling hills"
      />
      <dl className="HighScore">
        <dt>High Score</dt>
        <dd>35</dd>
      </dl>
      <div className="ActionWrapper">
        <button onClick={_setLevel(-1)}>⬅️</button>
        <button onClick={() => _setView(AppViews.game)}>Start</button>
        <button onClick={_setLevel(+1)}>➡️</button>
      </div>
    </section>
  )
}