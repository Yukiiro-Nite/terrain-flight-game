import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Euler, Quaternion, Vector3 } from "three"


export const Player = () => {
  const dir = useRef<Vector3>(new Vector3(0, 0, -1))
  const [, getKeys] = useKeyboardControls()
  useFrame((state, delta) => {
    const { up, down, left, right } = getKeys()
    const upVal = up ? 1 : 0
    const downVal = down ? -1 : 0
    const leftVal = left ? 1 : 0
    const rightVal = right ? -1 : 0
    dir.current.applyQuaternion(new Quaternion().setFromEuler(new Euler(
      (upVal + downVal) * 0.1 * delta,
      (leftVal + rightVal) * 0.1 * delta,
      0
    )))
    const step = dir.current.clone().normalize().multiplyScalar(0.1 * delta)
    state.camera.position.add(step)
    state.camera.lookAt(state.camera.position.clone().add(step))
  })

  return (
    <group>
      <PerspectiveCamera
        makeDefault
      >
      </PerspectiveCamera>
    </group>
  )
}