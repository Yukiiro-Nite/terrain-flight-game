import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Quaternion, Vector2, Vector3 } from "three"
import { AppViews, useAppStore } from "../../../stores/AppStore"


export const Player = () => {
  const view = useAppStore(state => state.view)
  const [, getKeys] = useKeyboardControls()
  const rotationSpeed = new Vector2(0.25, 0.25)
  useFrame((state, delta) => {
    if (view != AppViews.game) return

    const { up, down, left, right } = getKeys()
    const upVal = up ? 1 : 0
    const downVal = down ? -1 : 0
    const leftVal = left ? 1 : 0
    const rightVal = right ? -1 : 0
    const currentDir = new Vector3()
    const currentQuaternion = new Quaternion()
    const rollVector = new Vector3(0, 0, 1)
    const pitchVector = new Vector3(1, 0, 0)
    state.camera.getWorldQuaternion(currentQuaternion)

    // Calculate and apply rotations
    const rollQuaternion = new Quaternion().setFromAxisAngle(
      rollVector,
      (leftVal + rightVal) * rotationSpeed.y * delta,
    )
    const pitchQuaternion = new Quaternion().setFromAxisAngle(
      pitchVector,
      (upVal + downVal) * rotationSpeed.x * delta,
    )
    state.camera.quaternion
      .multiply(rollQuaternion)
      .multiply(pitchQuaternion)

    
    // Calculate and apply position
    state.camera.getWorldDirection(currentDir)
    const step = currentDir.clone().normalize().multiplyScalar(0.1 * delta)
    state.camera.position.add(step)
  })

  return (
    <group>
      <PerspectiveCamera
        makeDefault
        near={0.001}
      >
      </PerspectiveCamera>
    </group>
  )
}