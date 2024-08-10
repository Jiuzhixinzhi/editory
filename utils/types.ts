import type { JSX } from 'react';

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
    distractors: Record<string, string[] | undefined>
}

export type FishingConfig = {
    start?: number;
    markerSet?: string[];
}

export type ClozeConfig = {
    start?: number;
}

export type GenerateResult = {
    paper: JSX.Element;
    key: JSX.Element;
    countQuestions: number;
}

export default Data
