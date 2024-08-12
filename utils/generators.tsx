import type Data from './types'
import type { FishingData, ClozeData, GrammarData, Config } from './types'
import { ALPHABET_SET, NAME_MAP } from './config'

import type { JSX } from 'react'
import fastShuffle from 'fast-shuffle'
import seedrandom from 'seedrandom'

import parse, { type DOMNode } from 'html-react-parser'
import { ElementType } from 'domelementtype'
import type { Element, Text } from 'domhandler'


export function generatePaper(data: Data[]) {
    let start = 1
    var generator: Generator<Data> | null = null

    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                generator = new FishingGenerator(data, { start })
                start += generator.countQuestions
                return generator.paper
            case 'cloze':
                // 由正文 + 选项组成
                generator = new ClozeGenerator(data, { start })
                start += generator.countQuestions
                return generator.paper
            case 'grammar':
                // 由正文 + 选项组成
                generator = new GrammarGenerator(data, { start })
                start += generator.countQuestions
                return generator.paper
            default:
                return <></>
        }
    })
}

export function generateKey(data: Data[]) {
    let start = 1
    var generator: Generator<Data> | null = null

    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                generator = new FishingGenerator(data, { start })
                start += generator.countQuestions
                return generator.key
            case 'cloze':
                // 由正文 + 选项组成
                generator = new ClozeGenerator(data, { start })
                start += generator.countQuestions
                return generator.key
            case 'grammar':
                // 由正文 + 选项组成
                generator = new GrammarGenerator(data, { start })
                start += generator.countQuestions
                return generator.key
            default:
                return <></>
        }
    })
}

abstract class Generator<T extends Data> {
    public paper: JSX.Element
    public key: JSX.Element
    public countQuestions: number

    protected spaces: string
    protected data: T
    protected start: number

    constructor(data: T, config?: Config) {
        this.data = data
        this.start = config?.start ?? 1
        this.spaces = new Array(config?.countSpaces ?? 3).fill('\u00A0').join('')
        this.countQuestions = 0
        this.onBeforeWalk()
        // to prevent incorrect this context
        const replacer = this.replacer.bind(this)
        const paperBasic = parse(data.text, {
            replace: replacer,
        })
        this.paper = (
            <section>
                {paperBasic}
            </section>
        )
        this.onAfterWalk()
        this.paper = (
            <article key={this.data.id} className='flex flex-col my-4'>
                <h2 className='text-2xl font-bold'>{NAME_MAP[data.type]}</h2>
                {this.addPaper()}
            </article>
        )
        this.key = (
            <section key={this.data.id} className="flex flex-wrap gap-x-8">{this.generateKey()}</section>
        )
    }

    public getSeed(content: string | number) {
        return seedrandom.alea(content.toString()).int32()
    }

    public getNumber(): number {
        return this.start + this.countQuestions - 1
    }

    protected abstract onBeforeWalk(): void

    /** Since replacer is in object {replace: this.replacer}, which can cause incorrect this context. */
    protected abstract replacer(node: DOMNode): JSX.Element | undefined

    protected abstract onAfterWalk(): void

    protected abstract addPaper(): JSX.Element[]

    protected abstract generateKey(): JSX.Element[]
}

class FishingGenerator extends Generator<FishingData> {
    private options: string[] = []
    private correctAnswers: string[] = []

    protected onBeforeWalk() {
        this.options = new Array()
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            this.options.push((node.children[0] as Text)?.data)
            return (
                <u>{this.spaces}{this.getNumber()}{this.spaces}</u>
            )
        }
    }

    protected onAfterWalk(): void {
        this.correctAnswers = this.options.slice()
        this.options.push(...this.data.distractors)
        const seed = this.getSeed(this.options.join('&'))
        this.options = fastShuffle(seed, this.options)
    }

    protected addPaper(): JSX.Element[] {
        const options = this.options.map((option, index) => (
            <span key={option}>
                <span className="paper-option-marker pr-2">{ALPHABET_SET[index]}.</span>
                <span className='paper-option-content'>{option}</span>
            </span>
        ))
        return [
            <section className="paper-options border border-default-900 p-4 my-2 flex flex-wrap gap-x-8" key={options.join('')}>{options}</section>,
            this.paper,
        ]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = this.correctAnswers.map((correctAnswer, index) => (
            <span key={correctAnswer}>
                <span className="paper-option-marker pr-2">{this.start + index}.</span>
                <span className='paper-option-content'>{this.data.markerSet[this.options.indexOf(correctAnswer)]}</span>
            </span>
        ))
        return keyJSX
    }
}

class ClozeGenerator extends Generator<ClozeData> {
    private options: { [key: string]: string[] } = {}

    protected onBeforeWalk() {
        this.options = {}
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            const content = ((node as Element).children[0] as Text)?.data
            this.options[content] = [content, ...(this.data.distractors[content] ?? [])]
            return (
                <u>{this.spaces}{this.getNumber()}{this.spaces}</u>
            )
        }
    }

    protected onAfterWalk(): void {
        for (const key in this.options) {
            const seed = this.getSeed(this.options[key].join('&'))
            this.options[key] = fastShuffle(seed, this.options[key])
        }
    }

    protected addPaper(): JSX.Element[] {
        this.countQuestions = 0
        const options = Object.keys(this.options).map((content) => {
            this.countQuestions++
            const optionsJSX = this.options[content].map((option, index) => (
                <td key={content + "#" + option}>
                    <span className="paper-option-marker pr-2">{ALPHABET_SET[index]}.</span>
                    <span className='paper-option-content'>{option}</span>
                </td>
            ))
            return (
                <tr key={content} className='leading-snug'>
                    <td>{this.getNumber()}.</td>
                    {optionsJSX}
                </tr>
            )
        })
        return [
            this.paper,
            <table key="options">
                <tbody>
                    {options}
                </tbody>
            </table>,
        ]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = Object.keys(this.options).map((content, index) => {
            const correctIndex = this.options[content].indexOf(content)
            const marker = ALPHABET_SET[correctIndex]
            return (
                <span key={content}>{this.start + index}. {marker}</span>
            )
        })
        return keyJSX
    }
}

class GrammarGenerator extends Generator<GrammarData> {
    private keyContents: string[] = []

    protected onBeforeWalk() {
        this.keyContents = []
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            const content = ((node as Element).children[0] as Text).data
            const hint = this.data.hints[content]
            this.keyContents.push(content)
            if (hint === undefined || hint === '') {
                const words = content.split(' ').length
                const underlines = new Array<JSX.Element[]>(words).fill([<u key={content + "_underline"}>{this.spaces}{this.getNumber()}{this.spaces}</u>, <span key={content + "_space"}>&nbsp;</span>]).flat()
                underlines.pop()
                return <span>{underlines}</span>
            } else {
                return <span><u>{this.spaces}{this.getNumber()}{this.spaces}</u> <span className='paper-hint'>({hint})</span></span>
            }
        }
    }

    protected onAfterWalk(): void { }

    protected addPaper(): JSX.Element[] {
        return [this.paper]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = this.keyContents.map((content, index) => (
            <span key={content}>{this.start + index}. {content}</span>
        ))
        return keyJSX
    }
}
