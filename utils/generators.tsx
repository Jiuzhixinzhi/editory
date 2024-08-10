import type Data from './types';
import type { FishingConfig, FishingData, , ClozeData, ClozeConfig, GenerateResult } from './types';
import { ALPHABET_SET, NAME_MAP } from './config';
import type { JSX } from 'react';
import { renderToString } from 'react-dom/server';
import fastShuffle from 'fast-shuffle';
import seedrandom from 'seedrandom';
import parse, { domToReact } from 'html-react-parser';
import { ElementType } from 'domelementtype';
import { Element, Text } from 'domhandler';

export function generatePaper(data: Data[]) {
    /*
     * TODO: Implement paper generation logic
     * - Iterate through the data array
     * - Generate HTML or JSX structure for each data item
     * - Handle different question types (e.g., 'fishing')
     */

    let start = 1;
    var result: GenerateResult | null = null;

    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                result = generateFishing(data, {start});
                start += result.countQuestions
                return result.paper;
            case 'cloze':
                result = generateCloze(data, {start});
                start += result.countQuestions
                return result.paper;
            default:
                return <></>;
        }
    })
}

export function generateKey(data: Data[]) {
    let start = 1;
    var result: GenerateResult | null = null;
    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                result = generateFishing(data, {start});
                start += result.countQuestions
                return result.key;
            case 'cloze':
                result = generateCloze(data, {start});
                start += result.countQuestions
                return result.key;
            default:
                return <></>
        }
    })
}

function generateFishing(data: FishingData, config?: FishingConfig): GenerateResult {
    const start = config?.start ?? 1;
    const markerSet = config?.markerSet ?? ALPHABET_SET;

    // walk to gather options
    let blankCount = 0;
    const optionElements = new Array<Element>();
    let textChildren = parse(data.text, {
        replace(node) {
            if (node.type === ElementType.Tag && node.tagName === 'code') {
                const SPACES = '\u00A0\u00A0\u00A0\u00A0';
                // const children = domToReact(node.children as (Text | Element)[]);
                blankCount++;
                optionElements.push(node);
                return <>
                    <u>{SPACES}{start + blankCount - 1}{SPACES}</u>
                </>
            } else {
                return node;
            }
        }
    });
    data.distractors.forEach(distractor => {
        parse(`<code>${distractor}</code>`, {
            replace(node) {
                if (node.type !== ElementType.Tag) {
                    return;
                }
                if (node.tagName === 'code') {
                    optionElements.push(node);
                }
            }
        });
    });

    // To make sure the options are shuffled determinately if optionElements is determined.
    const seed = seedrandom.alea(optionElements.join('')).int32();
    const optionElementsShuffled = fastShuffle(seed, optionElements);
    const optionJSX = optionElementsShuffled.map((optionElement, index) => {
        const key = seed.toString() + "&" + index.toString();
        return (
            <span key={key}>
                <span className="paper-option-marker pr-2">{markerSet[index]}.</span>
                <span className='paper-option-content'>{domToReact(optionElement.children as (Text | Element)[])}</span>
            </span>
        )
    });
    const keyJSX = optionElements.map((optionElement, index) => {
        const correctIndex = optionElementsShuffled.indexOf(optionElement);
        const marker = markerSet[correctIndex];
        const key = seed.toString() + "&" + index.toString();
        return (
            <span key={key}>{start + index}. {marker}</span>
        );
    });

    return {
        paper: (
            <>
                <article className='flex flex-col gap-y-4 my-4'>
                    <h1 className='text-2xl font-bold'>{NAME_MAP[data.type]}</h1>
                    <section className="paper-options border border-default-900 p-4 flex flex-wrap gap-x-8">
                        {optionJSX}
                    </section>
                    <section className="paper-text">
                        {textChildren}
                    </section>
                </article>
            </>
        ),
        key: (
            <>
                <section className="key flex flex-wrap gap-x-8">
                    {keyJSX}
                </section>
            </>
        ),
        countQuestions: blankCount
    };
}

function generateCloze(data: ClozeData, config?: ClozeConfig): GenerateResult {
    const start = config?.start ?? 1;

    // walk
    let blankCount = 0;
    const optionElements = new Array<JSX.Element>();
    const text = parse(data.text, {
        replace(node) {
            if (node.type === ElementType.Tag && node.tagName === 'code') {
                const SPACES = '\u00A0\u00A0\u00A0';
                const children = domToReact(node.children as (Text | Element)[]);
                const content = renderToString(children);
                const options = [content, ...data.distractors[content]]
                const seed = seedrandom.alea(options.join('')).int32();
                const optionsJSX = fastShuffle(seed, options).map((option, index) => {
                    return <td key={content + "#" + option}>
                        <span className="paper-option-marker pr-2">{ALPHABET_SET[index]}.</span>
                        <span className='paper-option-content'>{option}</span>
                    </td>
                });
                blankCount++;
                optionElements.push(
                    <tr key={content}>
                        <td>{start + blankCount - 1}.</td>
                        {optionsJSX}
                    </tr>
                );
                return <u className='paper-option-content'>{SPACES}{start + blankCount - 1}{SPACES}</u>
            } else {
                return;
            }
        }
    });

    const options = <table>
        <tbody>
            {optionElements}
        </tbody>
    </table>;

    const keyJSX = optionElements.map((optionElement, index) => {
        const correctIndex = optionElements.indexOf(optionElement);
        const marker = ALPHABET_SET[correctIndex];
        const number = start + index;
        return (
            <span key={number}>{number}. {marker}</span>
        );
    });

    return {
        paper: <>
            <article className='flex flex-col gap-y-4 my-4'>
                <h1 className='text-2xl font-bold'>{NAME_MAP[data.type]}</h1>
                <section className="paper-text">
                    {text}
                </section>
                <section className="paper-options border border-default-900 p-2">
                    {options}
                </section>
            </article>
        </>,
        key: <>
            <section className="key flex flex-wrap gap-x-8">
                {keyJSX}
            </section>
        </>,
        countQuestions: blankCount,
    };
}

