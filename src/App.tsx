import './App.css'
import { AppViews, useAppStore } from './stores/AppStore'
import { GameHudView } from './UI/views/GameHudView/GameHudView'
import { GameRenderView } from './UI/views/GameRenderView/GameRenderView'
import { StartMenuView } from './UI/views/StartMenuView/StartMenuView'

function App() {
  const view = useAppStore(state => state.view)

  return (
    <main>
      <StartMenuView show={view === AppViews.start} />
      <GameRenderView show={view === AppViews.game} />
      <GameHudView show={view === AppViews.game} />
    </main>
  )
}

export default App
