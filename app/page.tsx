import { AuroraBackground } from '@/components/aurora'
import Main from '@/components/main'
import Papers from '@/components/papers'
import { themeFont } from '@/utils/fonts'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { Metadata } from 'next'
import Link from 'next/link'
import { isLoggedIn } from '@/utils/auth'
import { PiSignInDuotone } from 'react-icons/pi'
import BlankShowcase from '../components/mock/blank'
import AiShowcase from '@/components/mock/ai'
import Features from './features'

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
    <Main isCentered className={'flex flex-col gap-8 opacity-80'}>
      <h1 className={clsx(themeFont.className, 'font-bold text-center text-balance mt-20 text-primary')}>
        <span className='text-5xl'>ESL exam paper editing,</span>
        <br />
        <span className='text-7xl'>reimagined.</span>
      </h1>

      <section className='flex flex-col gap-6 w-full px-12'>
        <h2 className={clsx(themeFont.className, 'text-4xl text-center text-balance')}>You craft what matters. We handle the formalities.</h2>
        <BlankShowcase />
      </section>

      <section className='flex flex-col gap-6 w-full px-12'>
        <h2 className={clsx(themeFont.className, 'text-4xl text-center text-balance')}>Let AI help you create an initial draft.</h2>
        <AiShowcase />
      </section>

      <div className={clsx(themeFont.className, 'flex justify-center gap-6 -mt-12 mb-6 sm:mt-0 sm:mb-0')}>
        <Button variant='light' size='lg' color='primary' href='/editor' as={Link} className='rounded-full text-xl'>Try it out</Button>
        <Button variant='solid' size='lg' color='primary' href='/sign-in' as={Link} startContent={<PiSignInDuotone />} className='rounded-full text-xl'>Get Started</Button>
      </div>

      <section className='w-full px-12'>
        <Features />
      </section>
    </Main>
  </AuroraBackground>
}
