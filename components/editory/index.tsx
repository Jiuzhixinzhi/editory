'use client'

import Editor from '@/components/editor'
import Key from '@/components/key'
import Paper from '@/components/paper'
import Sortable from '@/components/sortable'
import Data from '@/utils/types'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Cookies from 'js-cookie'
import { Button } from '@nextui-org/react'
import { PiArrowSquareOutDuotone, PiSealQuestionDuotone, PiOptionDuotone, PiMagicWandDuotone, PiSmileySadDuotone } from 'react-icons/pi'
import { genDefaultValue } from '@/utils/config'
import Main from '../main'
import { updatePaper } from '../papers/actions'
import Link from 'next/link'
import clsx from 'clsx'
import { themeFont } from '@/utils/fonts'

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
    <Main isCentered>
      <div className='gap-2 flex-col md:flex-row flex w-full'>
        <section className='flex basis-7/12'>
          <div className='flex flex-col gap-2 p-4 text-end w-min'>
            <h2 className='font-bold text-4xl text-primary-300 mt-8'>Editor</h2>

            <div className='flex flex-col gap-2 text-sm text-primary-400/70'>
              <div className='flex items-center gap-2'>
                <div>
                  <PiSealQuestionDuotone />
                </div>
                <hr className='flex-1 border-t-primary-400/70 border-t-1' />
                <div>
                  blanking
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div>
                  <PiOptionDuotone />
                </div>
                <hr className='flex-1 border-t-primary-400/70 border-t-1' />
                <div>
                  options
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div>
                  <PiMagicWandDuotone />
                </div>
                <hr className='flex-1 border-t-primary-400/70 border-t-1' />
                <div>
                  AI draft
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-sm text-default-800/50 text-balance'>
                {
                  id
                    ? <><span className='font-bold'>Auto-saved</span> every second</>
                    : <>
                      <Link href='/' className='font-extrabold underline'>Sign in</Link> to sync to the cloud                    </>
                }
              </p>
              <p className='text-sm text-default-800/50 text-balance'>
                <span className='font-bold'>Select</span> to blank a word
              </p>
              <p className='text-sm text-default-800/50 text-balance'>
                <span className='font-bold'>Generate PDF</span>: Press Ctrl + P
              </p>
              <p className='text-sm text-default-800/50 text-balance'>
                <span className='font-bold'>Full papers</span> can be exported
              </p>
              {
                id && (
                  <p className='text-sm text-default-800/50 text-balance'>
                    <span className='font-bold'>Share a draft</span> via paper link
                  </p>
                )
              }
            </div>
          </div>

          <Editor items={items} setItems={setItems} id={id} />
        </section>

        <div className='flex flex-col items-center gap-2 basis-5/12 pt-8'>

          <Sortable items={items} setItems={setItems} />

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<PiArrowSquareOutDuotone />} className='text-xl rounded-full' variant='light' target='_blank' href={id ? `https://${id}.editory.xyz/paper` : '/paper'} as={Link}></Button>
              <h2 className='font-bold text-4xl py-8'>Paper</h2>
            </div>
            <div className='border-primary-400/20 border-4 rounded bg-primary-50/20'>
              <Paper data={items} />
            </div>
          </section>

          <section className='w-full'>
            <div className='flex items-center'>
              <Button isIconOnly startContent={<PiArrowSquareOutDuotone />} className='text-xl rounded-full' variant='light' target='_blank' href={id ? `https://${id}.editory.xyz/key` : '/key'} as={Link}></Button>
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
