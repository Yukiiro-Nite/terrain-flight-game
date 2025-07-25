import classNames from "classnames"
import { Canvas, useLoader } from '@react-three/fiber'

import './GameRenderView.css'
import { useAppStore } from "../../../stores/AppStore"
import { levelsByName } from "../../../data/levels"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Environment, KeyboardControls, type KeyboardControlsEntry } from '@react-three/drei'
import { Color } from "three"
import { useMemo } from "react"
import { Player } from "../../components/Player/Player"

export interface GameRenderViewProps {
  show?: boolean
}
export type ControlKeys = 'up' | 'down' | 'left' | 'right'
const Controls: Record<ControlKeys, ControlKeys> = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
}

export const GameRenderView = (props: GameRenderViewProps) => {
  const {
    show
  } = props
  const level = useAppStore(state => state.level)
  const levelData = levelsByName[level]
  const gameRenderViewClass = classNames("View GameRenderView", { hide: !show })

  const keyMap = useMemo<KeyboardControlsEntry<ControlKeys>[]>(()=>[
    { name: Controls.up, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.down, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  ], [])

  const gltfObj = useLoader(GLTFLoader, levelData.model)

  return (
    <section className={gameRenderViewClass}>
      <KeyboardControls map={keyMap}>
        <Canvas style={{ backgroundColor: levelData.fogColor }}>
          <ambientLight intensity={0.1} />
          <Environment files={levelData.envImg} />
          <fogExp2 attach="fog" args={[new Color(levelData.fogColor), levelData.fogDensity]} />
          <primitive
            object={gltfObj.scene}
            position={[0, -1, 0]}
          />
          <Player />
        </Canvas>
      </KeyboardControls>
    </section>
  )
}