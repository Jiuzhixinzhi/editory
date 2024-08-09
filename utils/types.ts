type Data = FishingData | ClozeData

export type DataType = Data['type']

export type FishingData = {
    id: string
    text: string
    type: 'fishing'
    distractors: string[]
}

export type ClozeData = {
    id: string
    text: string
    type: 'cloze'
    distractors: Record<string, string[]>
}

export type FishingConfig = {
    start?: number;
    markerSet?: string[];
}

export default Data
