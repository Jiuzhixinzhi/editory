import { AuroraBackground } from '@/components/aurora'
import Main from '@/components/main'
import Papers from '@/components/papers'
import { themeFont } from '@/utils/fonts'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { Metadata } from 'next'
import Link from 'next/link'
import craft from './craft.png'
import generatePaper from './generate-paper.png'
import generateKey from './generate-key.png'
import Image from 'next/image'
import { isLoggedIn } from '@/utils/auth'
import { PiSignInDuotone } from 'react-icons/pi'

export const metadata: Metadata = {
  title: 'ESL exam paper editing, reimagined | Editory',
  description: 'You handcraft exam papers, we handle the rest.'
}

export default async function HomePage() {
  if (isLoggedIn()) {
    return <Main isCentered>
      <Papers />
    </Main>
  }
  return <AuroraBackground>
    <Main isCentered className={clsx(themeFont.className, 'flex flex-col gap-6 opacity-80')}>
      <h1 className={'text-7xl font-bold text-center text-balance mt-6'}>
        ESL exam paper editing,
        reimagined.
      </h1>

      <div className='flex gap-4 w-5/6 pointer-events-none'>
        <div className='border-primary-400/20 border-4 rounded bg-primary-50/20 flex flex-col gap-4 p-4 basis-1/2'>
          <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
            <h2 className='text-4xl font-bold'>Craft the content. Or draft with AI.</h2>
            <Image src={craft} alt='Craft the content.' className='w-full rounded-lg' />
          </div>
        </div>
        <div className='flex flex-col gap-4 basis-1/2'>
          <div className='border-default-900/20 border-1 rounded basis-1/2 flex flex-col gap-4 p-4'>
            <h2 className='text-2xl'>Have the formalities generated.</h2>
            <div className='w-full h-full flex justify-center items-center'>
              <Image src={generatePaper} alt='Generate paper.' className='w-full rounded-lg' />
            </div>
          </div>
          <div className='border-primary-900/20 border-1 rounded basis-1/2 flex flex-col gap-4 p-4'>
            <h2 className='text-2xl'>And the key.</h2>
            <div className='w-full h-full flex justify-center items-center'>
              <Image src={generateKey} alt='Generate key.' className='w-full rounded-lg' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-6'>
        <Button variant='light' size='lg' color='primary' href='/editor' as={Link} className='rounded-full text-xl'>Try it out</Button>
        <Button variant='bordered' size='lg' color='primary' href='/sign-in' as={Link} startContent={<PiSignInDuotone />} className='rounded-full text-xl'>Get Started</Button>
      </div>
    </Main>
  </AuroraBackground>
}
