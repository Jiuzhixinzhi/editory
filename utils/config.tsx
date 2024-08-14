import Data, { DataType } from './types'
import { PiArticleDuotone, PiBookOpenTextLight, PiCheckerboardDuotone, PiFishDuotone, PiHeadphonesDuotone, PiScalesDuotone } from 'react-icons/pi'
import { ReactNode } from 'react'

export const ALPHABET_SET = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const ABCD_SET = [
    'A', 'B', 'C', 'D', 'AB', 'AC', 'AD', 'BC', 'BD', 'CD', 'ABC', 'ABD', 'ACD', 'BCD', 'ABCD'
]

export const NAME_MAP: Record<DataType, string> = {
    'listening': 'Listening',
    'grammar': 'Grammar',
    'fishing': 'Vocabulary',
    'cloze': 'Cloze',
    'reading': 'Reading',
    '4/6': 'Sentence Choice',
}

export const ICON_MAP: Record<DataType, ReactNode> = {
    'listening': <PiHeadphonesDuotone />,
    'grammar': <PiScalesDuotone />,
    'fishing': <PiFishDuotone />,
    'cloze': <PiCheckerboardDuotone />,
    'reading': <PiBookOpenTextLight />,
    '4/6': <PiArticleDuotone />,
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
                    seemingly: ['likely', 'strangely', 'hardly'],
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

        case 'reading':
            return {
                id: crypto.randomUUID(),
                text: '<p>There is no end of theories for why the internet feels so crummy these days. The New Yorker blames the shift to algorithmic feeds. Wired blames a cycle in which companies cease serving their users and begin monetizing them. The M.I.T. Technology Review blames ad-based business models. I agree with all these arguments. But here’s another: Our digital lives have become one shame closet after another.</p><p>A shame closet is that spot in your home where you cram the stuff that has nowhere else to go. It doesn’t have to be a closet. It can be a garage or a room or a chest of drawers or all of them at once. Whatever the space, it is defined by the absence of choices about what goes into it. There are things you need in there. There are things you will never need in there. But as the shame closet grows, the task of excavation or organization becomes too daunting to contemplate.</p><p>The shame closet era of the internet had a beginning. It was 20 years ago that Google unveiled Gmail. Google was generously offering a free gigabyte. Everyone wanted in.</p><p>A few months ago, I euthanized that Gmail account. I have more than a million unread messages in my inbox. Most of what’s there is junk. But not all of it. I was missing too much that I needed to see. Google’s algorithms had begun failing me. What they thought was a priority and what I thought was a priority diverged. I set up an auto-responder telling anyone and everyone who emailed me that the address was dead.</p><p>Behind Gmail was an astonishing technological triumph. The cost of storage was collapsing. In 1985, a gigabyte of hard drive memory cost around $75,000. Come 2004 — the year Gmail began — it was a few dollars. Today, it’s less than a penny. Now Gmail offers 15 gigabytes free. What a marvel. What a mess.</p><p>Gmail’s promise — vast storage mediated by powerful search tools — became the promise of virtually everything online. According to iCloud, I have more than 23,000 photos and almost 2,000 videos resting somewhere on Apple’s servers. I have tens of thousands of songs liked somewhere in Spotify. There is so much I loved in those archives. There is so much I would delight in rediscovering. But I can’t find what matters in the morass. I’ve given up on trying.</p><p>What began with our files soon came for our friends and family. The social networks made it easy for anyone we’ve ever met, and plenty of people we never met, to friend and follow us. We could communicate with them all at once without communing with them individually at all. Or so we were told. The idea that we could have so much community with so little effort was an illusion. We are digitally connected to more people than ever and terribly lonely nevertheless. </p><p>I have thousands of photos of my children but few that I’ve set aside to revisit. I have records of virtually every text I’ve sent since I was in college but no idea how to find the ones that meant something. I spent years blasting my thoughts to millions of people on Twitter even as I fell behind on correspondence with dear friends. I have stored everything and saved nothing.</p><p>I was lulled into the belief that I didn’t have to make decisions. Now my digital life is a series of monuments to the cost of combining maximal storage with minimal intention.</p><p>I do not blame anyone but myself for this. This is not something the corporations did to me. This is something I did to myself. But I am looking now for software that insists I make choices rather than whispers that none are needed. I don’t want my digital life to be one shame closet after another. A new metaphor has taken hold for me: I want it to be a garden I tend, snipping back the weeds and nourishing the plants.</p>',
                type: 'reading',
                questions: [{
                    q: 'Why is the author deleting Gmail?',
                    a: ['Because it no longer offers as many gigabytes as it used to.', 'Because he has found an alternative provider.', 'Because he can’t find the emails that actually matter to him out of piles of them.', 'Because Google has shifted its priorities away from Gmail.'],
                    correct: 2,
                }, {
                    q: 'According to the author, what is the problem with the modern digital life?',
                    a: ['The abundance of digital storage offered by tech giants.', 'The neglect to selectively preserve and discard digital assets.', 'The failure to build a warm digital community.', 'The inadequacy of the capabilities of digital algorithms.'],
                    correct: 1,
                }, {
                    q: 'What can you infer from the passage?',
                    a: ['The storage cost of one gigabyte has been on the decline.', 'People avoid tidying up their shame closets because it is very sensitive and private.', 'We can find a respite from the relentless digital life in nature by gardening and planting.', 'Social media sometimes gives people a false sense of companionship.'],
                    correct: 3,
                }],
            }

        case 'listening':
            return {
                id: crypto.randomUUID(),
                questions: [{
                    transcript: 'W: Aren’t you cold? Why aren’t you wearing a coat?\nM: I overslept this morning, so I ran out of the house without listening to the forecast.',
                    q: 'What does the man mean?',
                    a: ['He didn’t know it would be cold.', 'He misunderstood the weather report.', 'He didn’t have time to look for the coat.', 'He forgot to bring the coat.'],
                    correct: 0,
                }],
                type: 'listening',
            }

        default:
            throw new Error(`Unsupported type: ${type}`)
    }
}
