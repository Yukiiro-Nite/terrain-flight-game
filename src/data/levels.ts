// Preview Images
import mossyMountainsImg from '../assets/images/previews/Terrain1_preview.png'
import desertHillsImg from '../assets/images/previews/desert-hills_preview.png'

// Models
import desertHillsModel from '../assets/models/desert-hills.glb?url'

// Environments
import cloudsImg from '../assets/images/hdri/sky_4k.hdr?url'


export type LevelNameType = 'mossy_mountains' | 'desert_hills'
export const LevelNames: Record<LevelNameType, LevelNameType> = {
  mossy_mountains: 'mossy_mountains',
  desert_hills: 'desert_hills',
}

export interface Level {
  name: LevelNameType
  displayName: string
  previewImg: string
  model: string
  envImg: string
  fogColor: string
  fogDensity: number
}

export const levels: Level[] = [
  {
    name: LevelNames.mossy_mountains,
    displayName: 'Mossy Mountains',
    previewImg: mossyMountainsImg,
    model: desertHillsModel,
    envImg: cloudsImg,
    fogColor: "#BBBBBB",
    fogDensity: 0.5
  },
  {
    name: LevelNames.desert_hills,
    displayName: 'Desert Hills',
    previewImg: desertHillsImg,
    model: desertHillsModel,
    envImg: cloudsImg,
    fogColor: "#FF8E58",
    fogDensity: 1
  },
]

export const levelsByName = Object.fromEntries(levels.map(level => [level.name, level]))
export const levelIndexByName = Object.fromEntries(levels.map((level, index) => [level.name, index]))