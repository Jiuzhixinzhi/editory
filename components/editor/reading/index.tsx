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
            ai={id ? {
                id,
                data,
                setData
            } : undefined}
            unblankable
        />
    </div>
}
