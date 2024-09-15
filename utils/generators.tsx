import type Data from './types'
import type { FishingData, ClozeData, GrammarData, SentenceChoiceData, ReadingData, ListeningData, CustomData, Config } from './types'
import { ALPHABET_SET, NAME_MAP } from './config'
import { generateDocx as generateDocxInner } from './docx'

import type { JSX } from 'react'
import fastShuffle from 'fast-shuffle'
import seedrandom from 'seedrandom'

import parseToJSX, { type DOMNode } from 'html-react-parser'
import { renderToString } from 'react-dom/server'
import { ElementType } from 'domelementtype'
import type { Element, Text } from 'domhandler'

function generator_getter(data: Data, config: Config): () => Generator<Data> | null {
    switch (data.type) {
        case 'fishing':
            return () => new FishingGenerator(data, config)
        case 'cloze':
            return () => new ClozeGenerator(data, config)
        case 'grammar':
            return () => new GrammarGenerator(data, config)
        case '4/6':
            return () => new SentenceChoiceGenerator(data, config)
        case 'reading':
            return () => new ReadingGenerator(data, config)
        case 'listening':
            return () => new ListeningGenerator(data, config)
        case 'custom':
            return () => new CustomGenerator(data, config)
        default:
            return () => null
    }
}


export function generatePaper(data: Data[]) {
    let start = 1

    return data.map((data) => {
        let generator = generator_getter(data, { start })()
        if (generator === null) {
            return <></>
        }
        start += generator.countQuestions
        return generator.paper
    })
}

export function generateKey(data: Data[]) {
    let start = 1

    return data.map((data) => {
        let generator = generator_getter(data, { start })()
        if (generator === null) {
            return <></>
        }
        start += generator.countQuestions
        return generator.key
    })
}

export function generateDocx(data: Data[], type: 'paper' | 'key'): Promise<Blob> {
    let start = 1

    return generateDocxInner(data.map((data) => {
        let generator = generator_getter(data, { start })()
        if (generator === null) {
            return
        }
        start += generator.countQuestions
        return renderToString(generator[type])
    }).filter(item => item !== undefined))
}

interface GeneratorAttr {
    defaultCountSpaces: number
    displayName: boolean
}

abstract class Generator<T extends Data> {
    public paper: JSX.Element
    public key: JSX.Element
    public countQuestions: number

    protected spaces: string
    protected data: T
    protected start: number

    constructor(data: T, config?: Config) {
        const attr = this.getGeneratorAttr()
        this.data = data
        this.start = config?.start ?? 1
        this.spaces = new Array(config?.countSpaces ?? attr.defaultCountSpaces).fill('\u00A0').join('')
        this.countQuestions = 0
        this.onBeforeWalk()
        // to prevent incorrect this context
        const replacer = this.replacer.bind(this)
        const paperBasic = 'text' in data ? parseToJSX(data.text, {
            replace: replacer,
        }) : undefined
        this.paper = (
            <section>
                {paperBasic}
            </section>
        )
        this.onAfterWalk()
        const titleJSX = attr.displayName ? <h2 className='text-2xl font-bold'>{NAME_MAP[data.type]}</h2> : <></>
        this.paper = (
            <article key={this.data.id} className='flex flex-col my-4'>
                {titleJSX}
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

    public getBlankElement(number?: number): JSX.Element {
        let _number = number ?? this.getNumber()
        return <u>{this.spaces}{_number}{this.spaces}</u>
    }

    public toTableRows(cells: JSX.Element[], perLine: number): JSX.Element[] {
        while (cells.length % perLine !== 0) {
            cells.push(<td key={cells.length}></td>)
        }
        const rows: JSX.Element[] = []
        let row: JSX.Element[] = []
        cells.forEach((cell, index) => {
            row.push(cell)
            if (row.length >= perLine) {
                rows.push(<tr key={index}>{row}</tr>)
                row = []
            }
        })
        return rows
    }

    public abstract getGeneratorAttr(): GeneratorAttr

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

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 3,
            displayName: true,
        }
    }

    protected onBeforeWalk() {
        this.options = new Array()
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            this.options.push((node.children[0] as Text)?.data)
            return this.getBlankElement()
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
            <td key={option} className="px-4">
                {ALPHABET_SET[index]}. {option}
            </td>
        ))
        return [
            <section className="paper-options my-2" key={this.data.id}>
                <table className="border border-default-900">
                    <tbody>
                        {this.toTableRows(options, 6)}
                    </tbody>
                </table>
            </section>,
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

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 3,
            displayName: true,
        }
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            const content = ((node as Element).children[0] as Text)?.data
            this.options[content] = [content, ...(this.data.distractors[content] ?? [])]
            return this.getBlankElement()
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
                    <span className='paper-option-content break-all'>{option}</span>
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

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 3,
            displayName: true,
        }
    }

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
                const underlines = new Array<JSX.Element[]>(words).map((_, index) => [<u key={content + "_underline" + index.toString()}>{this.spaces}{this.getNumber()}{this.spaces}</u>, <span key={content + "_space"}>&nbsp;</span>]).flat()
                underlines.pop()
                return <span>{underlines}</span>
            } else {
                return <span>{this.getBlankElement()} <span className='paper-hint'>({hint})</span></span>
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

class SentenceChoiceGenerator extends Generator<SentenceChoiceData> {
    private options: string[] = []
    private correctAnswers: string[] = []

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 8,
            displayName: true,
        }
    }

    protected onBeforeWalk() {
        this.options = []
        this.correctAnswers = []
    }

    protected replacer(node: DOMNode): JSX.Element | undefined {
        if (node.type === ElementType.Tag && node.tagName === 'code') {
            this.countQuestions++
            const content = ((node as Element).children[0] as Text | null)?.data ?? ""
            this.options.push(content)
            this.correctAnswers.push(content)
            return this.getBlankElement()
        }
    }

    protected onAfterWalk(): void {
        this.options.push(...this.data.distractors)
        const seed = this.getSeed(this.options.join('&'))
        this.options = fastShuffle(seed, this.options)
    }

    protected addPaper(): JSX.Element[] {
        const options = this.options.map((option, index) => (
            <td key={option} className="px-4">
                {ALPHABET_SET[index]}. {option}
            </td>
        ))
        return [
            <section className="paper-options my-2" key={options.join('')}>
                <table className="border border-default-900">
                    <tbody>
                        {this.toTableRows(options, 1)}
                    </tbody>
                </table>
            </section>,
            this.paper,
        ]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = this.correctAnswers.map((correctAnswer, index) => (
            <span key={correctAnswer}>
                <span className="paper-option-marker pr-2">{this.start + index}.</span>
                <span className='paper-option-content'>{ALPHABET_SET[this.options.indexOf(correctAnswer)]}</span>
            </span>
        ))
        return keyJSX
    }
}

class ReadingGenerator extends Generator<ReadingData> {

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 0,
            displayName: true,
        }
    }

    protected onBeforeWalk() { }

    protected replacer(node: DOMNode): JSX.Element | undefined { return }

    protected onAfterWalk(): void { }

    protected addPaper(): JSX.Element[] {
        const questions = this.data.questions.map(question => {
            this.countQuestions++
            const options = question.a?.map((option, index) => (
                <p key={option}><span>{ALPHABET_SET[index]}.</span> <span>{option}</span></p>
            ))
            return (
                <div key={question.q}>
                    <p><span>{this.getNumber()}.</span> <span>{question.q}</span></p>
                    {options}
                </div>
            )
        })
        return [
            this.paper,
            <section className="paper-options my-2 flex flex-wrap gap-x-8" key="questions">{questions}</section>
        ]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = this.data.questions.map((question, index) => (
            <span key={question.q}>
                <span className="paper-option-marker pr-2">{this.start + index}.</span>
                <span className='paper-option-content'>{ALPHABET_SET[question.correct]}</span>
            </span>
        ))
        return keyJSX
    }
}

class ListeningGenerator extends Generator<ListeningData> {

    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 0,
            displayName: true,
        }
    }

    protected onBeforeWalk() { }

    protected replacer(node: DOMNode): JSX.Element | undefined { return }

    protected onAfterWalk(): void { }

    protected addPaper(): JSX.Element[] {
        const questions = this.data.questions.map(question => {
            this.countQuestions++
            const options = question.a?.map((option, index) => (
                <p key={option}><span>{ALPHABET_SET[index]}.</span> <span>{option}</span></p>
            ))
            return (
                <div key={question.q}>
                    <div>
                        <p><span>{this.getNumber()}.</span></p>
                    </div>
                    <div>
                        {options}
                    </div>
                </div>
            )
        })
        return [
            <section key={questions.join('')}>{questions}</section>
        ]
    }

    protected generateKey(): JSX.Element[] {
        const keyJSX = this.data.questions.map((question, index) => (
            <span key={question.q}>
                <span className="paper-option-marker pr-2">{this.start + index}.</span>
                <span className='paper-option-content'>{ALPHABET_SET[question.correct]}</span>
            </span>
        ))
        return keyJSX
    }
}

class CustomGenerator extends Generator<CustomData> {
    public getGeneratorAttr(): GeneratorAttr {
        return {
            defaultCountSpaces: 0,
            displayName: false,
        }
    }

    protected onBeforeWalk() { }

    protected replacer(node: DOMNode): JSX.Element | undefined { return }

    protected onAfterWalk(): void { }

    protected addPaper(): JSX.Element[] {
        return [<section key={this.data.paper}>
            {parseToJSX(this.data.paper)}
        </section>]
    }

    protected generateKey(): JSX.Element[] {
        return [<section key={this.data.key}>
            {parseToJSX(this.data.key)}
        </section>]
    }
}
