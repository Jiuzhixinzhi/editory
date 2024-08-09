type Data = FishingData

export type DataType = 'fishing'

export type FishingData = {
    id: string
    text: string
    type: 'fishing'
    distractor: string[]
}

export type FishingConfig = {
    start?: number;
    markerSet?: string[];
}

export default Data
