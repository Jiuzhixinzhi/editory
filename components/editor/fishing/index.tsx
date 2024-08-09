'use client'

import Tiptap from '../../tiptap'
import List from '../../list'
import { FishingData } from '@/utils/types'

export default function FishingEditor({
    data,
    setData
}: {
    data: FishingData
    setData: (data: FishingData) => void
}) {
    return <div className='flex flex-col gap-2'>
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
                    distractors: data.distractors.filter(distractor => distractor !== item)
                })
            }}
        />
        <Tiptap
            key={data.id}
            content={data.text}
            onUpdate={({ editor }) => {
                setData({
                    id: data.id,
                    text: editor.getHTML(),
                    type: data.type,
                    distractors: data.distractors
                })
            }}
        />
    </div>
}
