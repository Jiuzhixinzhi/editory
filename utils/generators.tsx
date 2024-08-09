import type Data from './types';
import type { FishingConfig } from './types';
import { ALPHABET_SET } from './config';
import type { JSX } from 'react';
import fastShuffle from 'fast-shuffle';
import seedrandom from 'seedrandom';
import parse, { domToReact } from 'html-react-parser';
import { ElementType } from 'domelementtype';
import { Element, Text } from 'domhandler'

export function generatePaper(data: Data[]) {
    /*
     * TODO: Implement paper generation logic
     * - Iterate through the data array
     * - Generate HTML or JSX structure for each data item
     * - Handle different question types (e.g., 'fishing')
     */

    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                return generateFishing(data)[0];

            default:
                return <></>
        }
    })
}

export function generateKey(data: Data[]) {
    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                return generateFishing(data)[1];

            default:
                return <></>
        }
    })
}

function generateFishing(data: Data, config?: FishingConfig): [JSX.Element, JSX.Element] {
    const start = config?.start ?? 1;
    const markerSet = config?.markerSet ?? ALPHABET_SET;

    // walk to gather options
    let blankCount = 0;
    const optionElements = new Array<Element>();
    let textChildren = parse(data.text, {
        replace(node) {
            if (node.type === ElementType.Tag && node.tagName === 'code') {
                const SPACES = '\u00A0\u00A0\u00A0\u00A0';
                const children = domToReact(node.children as (Text | Element)[]);
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
    data.distractor.forEach(distractor => {
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

    return [(
        <>
            <article>
                <section className="paper-options border p-4 flex flex-wrap gap-x-8">
                    {optionJSX}
                </section>
                <section>
                    {textChildren}
                </section>
            </article>
        </>
    ), (
        <>
            <section className="key flex flex-wrap gap-x-8">
                {keyJSX}
            </section>
        </>
    )]
}

