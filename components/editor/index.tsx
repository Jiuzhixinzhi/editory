'use client'

import { Dispatch, SetStateAction } from 'react'
import FishingEditor from './fishing'
import Data from '@/utils/types'

export default function Editor({ items, setItems }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>> }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 border-1 bg-primary-50/20 before:prose-code:content-["("] after:prose-code:content-[")"] p-4 rounded'>
        {
            items.map(({ id, text, type, distractor }) => {
                if (type === 'fishing') {
                    return <FishingEditor
                        key={id}
                        data={{ id, text, type, distractor }}
                        setData={setData}
                    />
                }
            })
        }
    </div>
}