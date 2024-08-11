'use client'

import { Dispatch, SetStateAction } from 'react'
import FishingEditor from './fishing'
import Data from '@/utils/types'
import ClozeEditor from './cloze'
import GrammarEditor from './grammar'

export default function Editor({ items, setItems, id }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>>, id?: string }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 min-h-96 border before:prose-code:content-["["] after:prose-code:content-["]"] p-4 rounded'>
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

                    case 'cloze':
                        return <ClozeEditor
                            key={data.id}
                            data={data}
                            setData={setData}
                            id={id}
                        />

                    case 'grammar':
                        return <GrammarEditor
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