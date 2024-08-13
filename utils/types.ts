type Data = FishingData | ClozeData | GrammarData | SentenceChoiceData | ReadingData | ListeningData

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

export type SentenceChoiceData = {
    id: string
    text: string
    type: '4/6'
    distractors: string[]
}

export type Question = {
    q: string
    a: string[]
    correct: number // index of the correct answer
}

export type ReadingQuestion = Question

export type ReadingData = {
    id: string
    text: string
    type: 'reading'
    questions: ReadingQuestion[]
}

export type ListeningQuestion = Question & {
    transcript: string
}

export type ListeningData = {
    id: string
    type: 'listening'
    questions: ListeningQuestion[]
}

export type Config = {
    /** @default 1 */
    start?: number,
    /** @default 3 */
    countSpaces?: number,
}

export default Data
