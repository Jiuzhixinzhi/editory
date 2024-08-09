'use client'

import Editor from '@/components/editor'
import Key from '@/components/key'
import Paper from '@/components/paper'
import Sortable from '@/components/sortable'
import Data from '@/utils/types'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Cookies from 'js-cookie'
import { Button, Link } from '@nextui-org/react'
import { CgExternal } from 'react-icons/cg'
import { genDefaultValue } from '@/utils/config'

export default function Home({ data }: { data: Data[] | null }) {
  const [items, setItems] = useState<Data[]>(data ?? [genDefaultValue('cloze')])

  const [saveToCookies] = useDebounce((itemsString: string) => {
    Cookies.set('data', itemsString)
  }, 1000)

  const itemsString = JSON.stringify(items)

  useEffect(() => {
    saveToCookies(itemsString)
  }, [itemsString, saveToCookies])

  return (
    <main className='px-4 py-4 w-full mx-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2D2E2F_1px,transparent_1px)] [background-size:20px_20px]'>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 p-4 text-end basis-1/12'>
          <h2 className='font-bold text-4xl text-primary-300'>Editor</h2>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-default-800/50'>Auto-saved every sec.</p>
          </div>
        </div>
        <section className='flex flex-col basis-5/12'>
          <Editor items={items} setItems={setItems} />
        </section>

        <div className='flex flex-col items-center gap-2 basis-6/12 pt-8'>
          <Sortable items={items} setItems={setItems} />

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<CgExternal />} className='text-xl rounded-full' variant='light' href='/paper' as={Link}></Button>
              <h2 className='font-bold text-4xl py-8'>Paper</h2>
            </div>
            <div className='border-primary-400/20 border-4 rounded bg-primary-50/20'>
              <Paper data={items} />
            </div>
          </section>

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<CgExternal />} className='text-xl rounded-full' variant='light' href='/key' as={Link}></Button>
              <h2 className='font-bold text-4xl py-8'>Key</h2>
            </div>
            <div className='border-default-500/20 border-1 rounded'>
              <Key data={items} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
