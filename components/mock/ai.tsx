'use client'

import Editor from '@/components/mock/editor'
import Paper from '@/components/paper'
import Data from '@/utils/types'
import { useState } from 'react'

export default function AiShowcase() {
    const [items, setItems] = useState<Data[]>([{
        id: '1',
        type: 'reading',
        text: '<p>... Gmail’s promise — vast storage mediated by powerful search tools — became the promise of virtually everything online. According to iCloud, I have more than 23,000 photos and almost 2,000 videos resting somewhere on Apple’s servers. I have tens of thousands of songs liked somewhere in Spotify. There is so much I loved in those archives. There is so much I would delight in rediscovering. But I can’t find what matters in the morass.</p>',
        questions: []
    }])
    return <div className='flex flex-col sm:flex-row sm:gap-6'>
        <div className='basis-1/2'>
            <Editor items={items} setItems={setItems} />
        </div>
        <div className='basis-1/2'>
            <Paper data={items} />
        </div>
    </div>
}
