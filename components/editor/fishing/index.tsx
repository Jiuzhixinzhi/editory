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
            items={data.distractor}
            placeholder='Add distractor(s) ...'
            add={(item) => {
                setData({
                    ...data,
                    distractor: [...data.distractor, item]
                })
            }}
            remove={(item) => {
                setData({
                    ...data,
                    distractor: data.distractor.filter(distractor => distractor !== item)
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
                    distractor: data.distractor
                })
            }}
        />
    </div>
}
