'use client'

import { Dispatch, SetStateAction } from 'react'
import FishingEditor from './fishing'
import Data from '@/utils/types'
import ClozeEditor from './cloze'

export default function Editor({ items, setItems }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>> }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 min-h-96 border before:prose-code:content-["("] after:prose-code:content-[")"] p-4 rounded'>
        {
            items.map(({ id, text, type, distractors: distractor }) => {
                switch (type) {
                    case 'fishing':
                        return <FishingEditor
                            key={id}
                            data={{ id, text, type, distractors: distractor }}
                            setData={setData}
                        />

                    case 'cloze':
                        return <ClozeEditor
                            key={id}
                            data={{ id, text, type, distractors: distractor }}
                            setData={setData}
                        />

                    default:
                        break
                }
            })
        }
    </div>
}