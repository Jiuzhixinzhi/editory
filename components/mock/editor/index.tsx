'use client'

import { Dispatch, SetStateAction } from 'react'
import Data from '@/utils/types'
import ReadingEditor from './reading'
import FishingEditor from './fishing'

export default function Editor({ items, setItems, id }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>>, id?: string }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 w-full border before:prose-code:content-["["] after:prose-code:content-["]"] p-4 rounded h-full'>
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