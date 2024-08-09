type Data = FishingData

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
