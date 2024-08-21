'use client'

import Tiptap from '../../tiptap'
import { ReadingData } from '@/utils/types'
import QnA from '@/components/qna'

export default function ReadingEditor({
    data,
    setData,
    id
}: {
    data: ReadingData
    setData: (data: ReadingData) => void
    id?: string
}) {
    const questions = [
        { 'a': ['Because it no longer offers as many gigabytes as it used to.', 'Because he has found an alternative provider.', 'Because he can’t find the emails that actually matter to him out of piles of them.', 'Because Google has shifted its priorities away from Gmail.'], 'q': 'Why is the author deleting Gmail?', 'correct': 2 },
        { 'a': ['The abundance of digital storage offered by tech giants.', 'The neglect to selectively preserve and discard digital assets.', 'The failure to build a warm digital community.', 'The inadequacy of the capabilities of digital algorithms.'], 'q': 'According to the author, what is the problem with the modern digital life?', 'correct': 1 },
        { 'a': ['The storage cost of one gigabyte has been on the decline.', 'People avoid tidying up their shame closets because it is very sensitive and private.', 'We can find a respite from the relentless digital life in nature by gardening and planting.', 'Social media sometimes gives people a false sense of companionship.'], 'q': 'What can you infer from the passage?', 'correct': 3 }
    ]
    const startTypewriterAnimation = () => {
        let loadingIndex = 0
        let loadingAnswerIndex = 0
        const intervalId = setInterval(() => {
            let newData = data
            if (!newData.questions[loadingIndex]) {
                newData.questions.push({
                    a: [''],
                    q: questions[loadingIndex].q,
                    correct: questions[loadingIndex].correct
                })
            }
            newData.questions[loadingIndex].a[loadingAnswerIndex] = questions[loadingIndex].a[loadingAnswerIndex]
            if (loadingAnswerIndex === questions[loadingIndex].a.length - 1) {
                loadingAnswerIndex = 0
                loadingIndex++
            }
            else {
                loadingAnswerIndex++
            }
            setData(newData)
            if (loadingIndex === questions.length) {
                clearInterval(intervalId)
                return
            }
        }, 250)
    }
    return <div className='flex flex-col gap-2 before:content-["Reading"] before:text-primary-300 before:font-bold before:-mb-1 my-5'>
        <QnA
            questions={data.questions}
            setQuestions={(questions) => {
                setData({
                    ...data,
                    questions
                })
            }}
        />
        <Tiptap
            key={data.id}
            content={data.text}
            onUpdate={({ editor }) => {
                setData({
                    ...data,
                    text: editor.getHTML()
                })
            }}
            ai={() => {
                startTypewriterAnimation()
            }}
            unblankable
        />
    </div>
}
