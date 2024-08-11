import type { JSX } from 'react'

type Data = FishingData | ClozeData | GrammarData

export type DataType = Data['type']

export type FishingData = {
    id: string
    text: string
    type: 'fishing'
    distractors: string[],
    markerSet: string[]
}

export type ClozeData = {
    id: string
    text: string
    type: 'cloze'
    distractors: Record<string, string[] | undefined>
}

export type GrammarData = {
    id: string
    text: string
    type: 'grammar'
    hints: Record<string, string | undefined>
}

export type Config = {
    /** @default 1 */
    start?: number,
    /** @default 3 */
    countSpaces?: number,
}

export default Data
