import Data, { DataType } from './types'

export const ALPHABET_SET = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const ABCD_SET = [
    'A', 'B', 'C', 'D', 'AB', 'AC', 'AD', 'BC', 'BD', 'CD', 'ABC', 'ABD', 'ACD', 'BCD', 'ABCD'
]

export const NAME_MAP: Record<DataType, string> = {
    'fishing': 'Word Choice',
    'cloze': 'Cloze',
    'grammar': 'Grammar'
}

export const genDefaultValue = (type: DataType): Data => {
    switch (type) {
        case 'fishing':
            return {
                id: crypto.randomUUID(),
                text: '<h2><strong>Recover the fragments in our lives</strong></h2><p><strong>I had a diary</strong>, where I could <code>record</code> the events and ideas which occurred that day. Say, a rain that successfully made it through my <code>seemingly</code> vulnerable ceiling, the last trip I went on with one of my best friends, the postcard sent by her with many a beautiful, cherished recollection, and thoughts <code>absorbing</code> me after some important moments took place from time to time.</p><p>But it was yonks ago. Now I don’t even know where I put the diary.</p><p><strong>A couple of decades ago</strong>, people created a novel tool to substitute diaries with, and invented a new verb called <em>blog</em>. It was good, and it could be very <code>sophisticated</code> if one used WordPress, but it seemed somewhat to fall under the <code>category</code> of serious stuff or stuff written by the tech-savvy.</p><p><strong>So now most of the people use Twitter</strong>, or other social media platforms. It’s <code>extremely</code> convenient. It can be about anything in our lives. We can instantly share them with others, see how they react and watch other people’s lives.</p><p>However, sometimes, things seem a little bit off:</p><p>The unnecessary hesitation.</p><p>The urge to <code>impress</code>.</p><p>The daunting task of socialising instead of recording.</p><p>The <code>editing</code> of text that is meant to write to ourselves, but more or less trimmed or glossed after deliberation in the social context.</p><p><strong>It is in the very shift of <code>perspective</code></strong> — from ourselves to others — that we too often miss the point. The sense of getting along with what has recently occurred to us, preserving what <code>really</code> means something to us, and leaving a probably unnoticeable trace that has once belonged to us in our life courses, is no more.</p>',
                type: 'fishing',
                distractors: ['tendency'],
                markerSet: ALPHABET_SET,
            }

        case 'cloze':
            return {
                id: crypto.randomUUID(),
                text: '<h2><strong>Recover the fragments in our lives</strong></h2><p><strong>I had a diary</strong>, where I could <code>record</code> the events and ideas which occurred that day. Say, a rain that successfully made it through my <code>seemingly</code> vulnerable ceiling, the last trip I went on with one of my best friends, the postcard sent by her with many a beautiful, cherished recollection, and thoughts absorbing me after some important moments took place from time to time.</p><p>But it was yonks ago. Now I don’t even know where I put the diary.</p><p><strong>A couple of decades ago</strong>, people created a novel tool to substitute diaries with, and invented a new verb called <em>blog</em>. It was good, and it could be very sophisticated if one used WordPress, but it seemed somewhat to fall under the category of serious stuff or stuff written by the tech-savvy.</p><p><strong>So now most of the people use Twitter</strong>, or other social media platforms. It’s extremely convenient. It can be about anything in our lives. We can instantly share them with others, see how they react and watch other people’s lives.</p><p>However, sometimes, things seem a little bit off:</p><p>The unnecessary hesitation.</p><p>The urge to <code>impress</code>.</p><p>The daunting task of socialising instead of recording.</p><p>The <code>editing</code> of text that is meant to write to ourselves, but more or less trimmed or glossed after deliberation in the social context.</p><p><strong>It is in the very shift of <code>perspective</code></strong> — from ourselves to others — that we too often miss the point. The sense of getting along with what has recently occurred to us, preserving what really means something to us, and leaving a probably unnoticeable trace that has once belonged to us in our life courses, is no more.</p>',
                type: 'cloze',
                distractors: {
                    record: ['accord', 'read', 'reap'],
                    seemingly: ['likely', 'interestingly', 'hardly'],
                    impress: ['intend', 'press', 'avoid'],
                    editing: ['writing', 'deleting', 'rendering'],
                    perspective: ['stance', 'spectacle', 'permanence'],
                }
            }

        case 'grammar':
            return {
                id: crypto.randomUUID(),
                text: '<h2><strong>Recover the fragments in our lives</strong></h2><p><strong>I had a diary</strong>, <code>where</code> I could record the events and ideas which occurred that day. Say, a rain that successfully made it through my seemingly vulnerable ceiling, the last trip I went on with one of my best friends, the postcard sent by her with many a beautiful, cherished recollection, and thoughts absorbing me after some important moments took place from time to time.</p><p>But it was yonks ago. Now I don’t even know where I put the diary.</p><p><strong>A couple of decades ago</strong>, people created a novel tool to substitute diaries with, and invented a new verb called <em>blog</em>. It was good, and it could be very sophisticated if one used WordPress, but it seemed somewhat to fall under the category of serious stuff or stuff written by the tech-savvy.</p><p><strong>So now most of the people <code>use</code> Twitter</strong>, or other social media platforms. It’s extremely convenient. It can be about anything in our lives. We can instantly share them with others, see how they react and watch other people’s lives.</p><p>However, sometimes, things seem a little bit off:</p><p>The unnecessary hesitation.</p><p>The urge to impress.</p><p>The daunting task of socialising instead of recording.</p><p>The editing of text that <code>is meant</code> to write to ourselves, but more or less trimmed or glossed after deliberation in the social context.</p><p><strong><code>It</code> is in the very shift of perspective</strong> — from ourselves to others — that we too often miss the point. The sense of getting along with what has recently occurred to us, preserving what really means something to us, and leaving a probably unnoticeable trace that has once belonged to us in our life courses, is no more.</p>',
                type: 'grammar',
                hints: {
                    use: 'use',
                    'is meant': 'mean',
                }
            }

        default:
            throw new Error(`Unsupported type: ${type}`)
    }
}
