export const wrapMod = (value: number, size: number): number => {
  return ((value % size) + size) % size
}