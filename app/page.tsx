'use client'

import Editor from '@/components/editor'
import Key from '@/components/key'
import Paper from '@/components/paper'
import Data from '@/utils/types'
import { useState } from 'react'

export default function Home() {
  const [items, setItems] = useState<Data[]>([{
    id: '1',
    text: '<h2><strong>Recover the fragments in our lives</strong></h2><p><strong>I had a diary</strong>, where I could <code>record</code> the events and ideas which occurred that day. Say, a rain that successfully made it through my <code>seemingly</code> vulnerable ceiling, the last trip I went on with one of my best friends, the postcard sent by her with many a beautiful, cherished recollection, and thoughts <code>absorbing</code> me after some important moments took place from time to time.</p><p>But It was yonks ago. Now I don’t even know where I put the diary.</p><p><strong>A couple of decades ago</strong>, people created a novel tool to substitute diaries with, and invented a new verb called <em>blog</em>. It was good, and it could be very <code>sophisticated</code> if one used WordPress, but it seemed somewhat to fall under the category of serious stuff or stuff written by the tech-savvy.</p><p><strong>So now most of the people use Twitter</strong>, or other social media platforms. It’s extremely convenient. It can be about anything in our lives. We can instantly share them with others, see how they react and watch other people’s lives.</p><p>However, sometimes, things seem a little bit off:</p><p>The unnecessary hesitation.</p><p>The urge to <code>impress</code>.</p><p>The daunting task of socialising instead of recording.</p><p>The editing of text that is meant to write to ourselves, but more or less trimmed or glossed after deliberation in the social context.</p><p><strong>It is in the very shift of <code>perspective</code></strong> — from ourselves to others — that we too often miss the point. The sense of getting along with what has recently occurred to us, preserving what really means something to us, and leaving a probably unnoticeable trace that has once belonged to us in our life courses, is no more.</p>',
    type: 'fishing',
    distractor: []
  }])

  return (
    <main className='px-4 py-4 w-full mx-auto'>
      <div className='flex gap-4'>
        <h2 className='font-bold text-4xl p-4'>Editor</h2>
        <section className='flex flex-col basis-5/12'>
          <Editor items={items} setItems={setItems} />
        </section>

        <div className='flex flex-col gap-2 basis-7/12'>
          <section className='flex'>
            <Paper data={items} />
            <h2 className='font-bold text-4xl p-8'>Paper</h2>
          </section>

          <section className='flex'>
            <Key data={items} />
            <h2 className='font-bold text-4xl p-8'>Key</h2>
          </section>
        </div>
      </div>
    </main>
  )
}
