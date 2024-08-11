import { auth, signIn } from '@/auth'
import { AuroraBackground } from '@/components/aurora'
import Main from '@/components/main'
import Papers from '@/components/papers'
import { Button } from '@nextui-org/react'
import { Metadata } from 'next'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export const metadata: Metadata = {
  title: 'ESL exam paper editing, reimagined | Editory'
}

export default async function HomePage() {
  if (await auth()) {
    return <Main isCentered>
      <Papers />
    </Main>
  }
  return <AuroraBackground>
    <Main isCentered className='flex flex-col gap-6'>
      <div className='flex flex-col items-center justify-center gap-4 opacity-80'>
        <h1 className='text-6xl font-bold text-center text-balance'>
          ESL exam paper editing,
          reimagined.
        </h1>
        <p className='text-center text-3xl text-balance font-light'>
          You handcraft exam papers,
          we handle the rest.
        </p>
      </div>
      <form className='flex justify-center gap-6' action={async () => {
        'use server'
        await signIn('google')
      }}>
        <Button variant='light' size='lg' color='primary' href='/editor' as={Link} className='rounded-full'>Try it out</Button>
        <Button variant='bordered' size='lg' color='primary' type='submit' startContent={<FcGoogle />} className='rounded-full'>Get Started</Button>
      </form>
    </Main>
  </AuroraBackground>
}
