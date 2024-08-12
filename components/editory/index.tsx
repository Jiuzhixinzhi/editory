'use client'

import Editor from '@/components/editor'
import Key from '@/components/key'
import Paper from '@/components/paper'
import Sortable from '@/components/sortable'
import Data from '@/utils/types'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Cookies from 'js-cookie'
import { Button, Link } from '@nextui-org/react'
import { CgExternal } from 'react-icons/cg'
import { genDefaultValue } from '@/utils/config'
import { MdOutlineQuiz } from 'react-icons/md'
import { IoOptionsOutline } from 'react-icons/io5'
import Main from '../main'
import { updatePaper } from '../papers/actions'
import { FaMagic } from 'react-icons/fa'

export default function Editory({ data, id }: { data: Data[] | null, id?: string }) {
  const [items, setItems] = useState<Data[]>(data ?? [genDefaultValue('grammar'), genDefaultValue('fishing'), genDefaultValue('cloze')])
  const itemsString = JSON.stringify(items)

  const save = useDebouncedCallback((data: string) => {
    if (id) {
      updatePaper({ id, data: JSON.parse(data) })
    }
    else {
      Cookies.set('data', data)
    }
  }, 1000)

  useEffect(() => {
    save(itemsString)
  }, [save, itemsString])

  return (
    <Main>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 p-4 text-end basis-1/12'>
          <h2 className='font-bold text-4xl text-primary-300 mt-6'>Editor</h2>

          <div className='flex flex-col gap-2 text-sm text-primary-400/70'>
            <div className='flex items-center gap-2'>
              <div>
                <MdOutlineQuiz />
              </div>
              <hr className='flex-1 border-t-primary-400/70 border-t-1' />
              <div>
                blanking
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <IoOptionsOutline />
              </div>
              <hr className='flex-1 border-t-primary-400/70 border-t-1' />
              <div>
                options
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <FaMagic />
              </div>
              <hr className='flex-1 border-t-primary-400/70 border-t-1' />
              <div>
                AI gen
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm text-default-800/50 text-balance'>
              <span className='font-bold'>Select</span> to blank a word
            </p>
            {id && <p className='text-sm text-default-800/50 text-balance'>
              <span className='font-bold'>Auto-saved</span> every sec
            </p>}
            <p className='text-sm text-default-800/50 text-balance'>
              <span className='font-bold'>Print hotkey:</span> Ctrl + P
            </p>
          </div>
        </div>
        <section className='flex flex-col basis-5/12'>
          <Editor items={items} setItems={setItems} id={id} />
        </section>

        <div className='flex flex-col items-center gap-2 basis-6/12 pt-8'>
          <Sortable items={items} setItems={setItems} />

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<CgExternal />} className='text-xl rounded-full' variant='light' target='_blank' href={id ? `https://${id}.editory.xyz/paper` : '/paper'} as={Link}></Button>
              <h2 className='font-bold text-4xl py-8'>Paper</h2>
            </div>
            <div className='border-primary-400/20 border-4 rounded bg-primary-50/20'>
              <Paper data={items} />
            </div>
          </section>

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<CgExternal />} className='text-xl rounded-full' variant='light' target='_blank' href={id ? `https://${id}.editory.xyz/key` : '/key'} as={Link}></Button>
              <h2 className='font-bold text-4xl py-8'>Key</h2>
            </div>
            <div className='border-default-500/20 border-1 rounded'>
              <Key data={items} />
            </div>
          </section>
        </div>
      </div>
    </Main>
  )
}
