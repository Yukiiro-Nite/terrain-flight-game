import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { levels, type LevelNameType } from '../data/levels'

export type AppViewType = 'start' | 'game'
export const AppViews: Record<AppViewType, AppViewType> = {
  start: 'start',
  game: 'game'
}

export interface AppStore {
  view: AppViewType,
  level: LevelNameType,
  setView: (view: AppViewType) => void
  setLevel: (level: LevelNameType) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      view: AppViews.start,
      level: levels[0].name,
      setView: (view) => set({ view }),
      setLevel: (level) => set({ level })
    }),
    {
      name: 'flight-game__AppStore'
    }
  )
)