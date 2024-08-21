'use client'

import Tiptap from '../../tiptap'
import List from '../../../list'
import { FishingData } from '@/utils/types'
import { without } from 'es-toolkit'
import { PiArrowBendRightUpDuotone, PiCursorTextDuotone, PiSealQuestionDuotone } from 'react-icons/pi'
import clsx from 'clsx'
import { themeFont } from '@/utils/fonts'

export default function FishingEditor({
    data,
    setData,
    id
}: {
    data: FishingData
    setData: (data: FishingData) => void
    id?: string
}) {
    return <div className='flex flex-col gap-2 before:content-["Vocabulary"] before:text-primary-300 before:font-bold before:-mb-2 my-5'>
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
        <div className={clsx('text-secondary text-center text-lg -mb-4 -mt-2 animate-bounce', themeFont.className)}>
           <PiCursorTextDuotone className='inline' /> Try Select Any Word <PiArrowBendRightUpDuotone className='inline' />
        </div>
    </div>
}
