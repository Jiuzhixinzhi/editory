'use client'

import { ListeningData } from '@/utils/types'
import QnA from '@/components/qna'

export default function ListeningEditor({
    data,
    setData,
    id
}: {
    data: ListeningData
    setData: (data: ListeningData) => void
    id?: string
}) {
    return <div className='flex flex-col gap-2 before:content-["Listening"] before:text-primary-300 before:font-bold before:-mb-1 my-5'>
        <QnA
            questions={data.questions}
            setQuestions={(questions) => {
                setData({
                    ...data,
                    questions
                })
            }}
        />
    </div>
}
