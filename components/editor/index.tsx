'use client'

import { Dispatch, SetStateAction } from 'react'
import FishingEditor from './fishing'
import Data from '@/utils/types'
import ClozeEditor from './cloze'
import GrammarEditor from './grammar'
import SentenceChoiceEditor from './sentence'
import ReadingEditor from './reading'
import ListeningEditor from './listening'
import CustomTextEditor from './custom'

export default function Editor({ items, setItems, id }: { items: Data[], setItems: Dispatch<SetStateAction<Data[]>>, id?: string }) {
    const setData = (data: Data) => setItems((prevItems) => prevItems.map((item) => item.id === data.id ? data : item))
    return <div className='border-default-500/20 min-h-[calc(88vh)] border before:prose-code:content-["["] max-w-[40vw] after:prose-code:content-["]"] p-4 rounded'>
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

                    case '4/6':
                        return <SentenceChoiceEditor
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

                    case 'listening':
                        return <ListeningEditor
                            key={data.id}
                            data={data}
                            setData={setData}
                            id={id}
                        />

                    case 'custom':
                        return <CustomTextEditor
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