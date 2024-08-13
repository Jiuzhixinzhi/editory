import Data, { DataType } from './types'

export const ALPHABET_SET = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const ABCD_SET = [
    'A', 'B', 'C', 'D', 'AB', 'AC', 'AD', 'BC', 'BD', 'CD', 'ABC', 'ABD', 'ACD', 'BCD', 'ABCD'
]

export const NAME_MAP: Record<DataType, string> = {
    'grammar': 'Grammar',
    'fishing': 'Vocabulary',
    'cloze': 'Cloze',
    '4/6': 'Sentence Choice',
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
                text: '<h2><strong>Recover the fragments in our lives</strong></h2><p><strong>I had a diary</strong>, <code>where</code> I could record the events and ideas which occurred that day. Say, a rain that successfully made it through my seemingly vulnerable ceiling, the last trip I went on with one of my best friends, the postcard sent by her with many a beautiful, cherished recollection, and thoughts absorbing me after some important moments took place from time to time.</p><p>But it was yonks ago. Now I don’t even know where I put the diary.</p><p><strong>A couple of decades ago</strong>, people created a novel tool to substitute diaries with, and invented a new verb called <em>blog</em>. It was good, and it could be very sophisticated if one used WordPress, but it seemed somewhat to fall under the category of serious stuff or stuff written by the tech-savvy.</p><p><strong>So now most of the people <code>use</code> Twitter</strong>, or other social media platforms. It’s extremely convenient. It can be about <code>anything</code> in our lives. We can instantly share them with others, see how they react and watch other people’s lives.</p><p>However, sometimes, things seem a little bit off:</p><p>The unnecessary hesitation.</p><p>The urge to impress.</p><p>The daunting task of socialising instead of recording.</p><p>The editing of text that <code>is meant</code> to write to ourselves, but more or less trimmed or glossed after deliberation in the social context.</p><p><strong><code>It</code> is in the very shift of perspective</strong> — from ourselves to others — that we too often miss the point. The sense of getting along with what has recently occurred to us, preserving what really means something to us, and leaving a probably unnoticeable trace that has once belonged to us in our life courses, is no more.</p>',
                type: 'grammar',
                hints: {
                    use: 'use',
                    'is meant': 'mean',
                }
            }

        case '4/6':
            return {
                id: crypto.randomUUID(),
                text: '<h2>The Evolution of Our Expectation of Happiness</h2><p>For much of Western history, the idea of — and even the word for — happiness was inextricably linked to chance. <code>The ancient Greek philosopher Solon believed that the concept was so unpredictable, it made sense only in the long view of a complete life.</code></p><p>In the West, a new idea emerged in the 18th century: that happiness was “something that human beings are supposed to have,” as Darrin M. McMahon, the chair of the history department at Dartmouth, told me. “God created us in order to be happy. And if we’re not happy, then there’s something wrong with the world or wrong with the way we think about it.” Mr. McMahon, the author of “Happiness: A History,” said this is how we get the idea that “life, liberty and the pursuit of happiness” are inalienable rights endowed by man’s creator.</p><p><code>In earlier centuries, Christians were expected to be solemn, pious and focused on getting to the afterlife.</code> Then they were taught “that being cheerful was pleasing to God,” as Peter Stearns, a distinguished professor of history at George Mason University, wrote in an article for Harvard Business Review in 2012. And so, whereas in earlier eras some might have experienced guilt over being too happy in this fallen world, it became possible for people to feel something entirely new: guilt for not being happy enough.</p><p>In the 20th century, the imposition to be measurably, demonstrably happy became intertwined with the modern workplace — specifically the interest in employee productivity. This imperative reached new prominence in 1952 with a best-selling book by the Protestant minister Norman Vincent Peale, “The Power of Positive Thinking.”</p><p>Dr. Peale exhorted readers: “Formulate and stamp indelibly on your mind a mental picture of yourself as succeeding. <code>Hold this picture tenaciously.</code> Never permit it to fade. Your mind will seek to develop this picture. Never think of yourself as failing; never doubt the reality of the mental image.”</p><p>The social critic Barbara Ehrenreich noted that Dr. Peale’s book was marketed to executives as a productivity booster for their staff members. “Give this book to employees. It pays dividends!” blared an advertisement she cited. Happiness became not just an emotional imperative but a financial one, as well. <code>How to achieve it became a matter of increasingly intense study at the end of the 20th century.</code> At the American Psychological Association, Dr. Seligman argued that his profession hadn’t done enough empirical research on “what actions lead to well‑being, to positive individuals, to flourishing communities and to a just society.”</p>',
                type: '4/6',
                distractors: ['Happiness is a complex and multifaceted emotion that encompasses a range of positive feelings, from contentment to intense joy.', 'Concentrate on what you are doing.']
            }

        default:
            throw new Error(`Unsupported type: ${type}`)
    }
}
