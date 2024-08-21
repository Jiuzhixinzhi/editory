'use client'

import { Dispatch, SetStateAction } from 'react'
import Data from '@/utils/types'
import ReadingEditor from './reading'
import FishingEditor from './fishing'

export default function Editor({ items, setItems, id }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>>, id?: string }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 border before:prose-code:content-["["] max-w-[calc(100vw-160px)] md:max-w-[45vw] after:prose-code:content-["]"] p-4 rounded'>
        {
            items.map((data) => {
                switch (data.type) {
                    case 'fishing':
                        return <FishingEditor
                            key={data.id}
                            data={data}
                            setData={setData}
                            id={id}
                        />

                    case 'reading':
                        return <ReadingEditor
                            key={data.id}
                            data={data}
                            setData={setData}
                            id={id}
                        />

                    default:
                        break
                }
            })
        }
    </div>
}