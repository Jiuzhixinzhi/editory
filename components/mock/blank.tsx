'use client'

import Editor from '@/components/mock/editor'
import Paper from '@/components/paper'
import Data from '@/utils/types'
import { useState } from 'react'
import Key from '@/components/key'

export default function BlankShowcase() {
    const [items, setItems] = useState<Data[]>([{
        id: '1',
        type: 'fishing',
        text: '<p>For them, Kerr’s message was a kind of confirmation of something they <code>instinctively</code> knew — that deathbed visions are real, can provide comfort, even heal past trauma. That our minds are capable of conjuring images that help us, at the end, make sense of our lives.</p>',
        distractors: ['immediately'],
        markerSet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    }])
    return <div className='flex flex-col sm:flex-row sm:gap-6'>
        <div className='basis-1/2 border-2 border-primary-400 rounded-lg bg-primary-100/20'>
            <Editor items={items} setItems={setItems} />
        </div>
        <div className='basis-1/2 flex flex-col'>
            <Paper data={items} />
            <h3 className='text-2xl font-bold font-serif mt-3 px-4'>Key</h3>
            <Key data={items} />
        </div>
    </div>
}
