'use client'

import Tiptap from '../../tiptap'
import List from '../../list'
import { SentenceChoiceData } from '@/utils/types'
import { without } from 'es-toolkit'

export default function SentenceChoiceEditor({
    data,
    setData,
    id
}: {
    data: SentenceChoiceData
    setData: (data: SentenceChoiceData) => void
    id?: string
}) {
    return <div className='flex flex-col gap-2 before:content-["Sentence_Choice"] before:text-primary-300 before:font-bold before:-mb-2 my-5'>
        <List
            items={data.distractors}
            placeholder='Add distractor(s) ...'
            add={(item) => {
                setData({
                    ...data,
                    distractors: [...data.distractors, item]
                })
            }}
            remove={(item) => {
                setData({
                    ...data,
                    distractors: without(data.distractors, item)
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
        />
    </div>
}
