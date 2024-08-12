import { auth, signOut } from '@/auth'
import { Button, } from '@nextui-org/react'
import clsx from 'clsx'
import { Caveat } from 'next/font/google'
import Link from 'next/link'
import { BiLogOutCircle } from 'react-icons/bi'
import Image from 'next/image'
import icon from './icon.png'
import Login from './login'
import getSubdomain from '@/utils/routing'

const caveat = Caveat({ subsets: ['latin'] })

export default async function Header() {
    if (getSubdomain()) return null

    const session = await auth()
    return <header>
        <div className='fixed p-5 w-full right-0 z-50 font-mono font-semibold'>
            <div className='flex items-start'>
                <Link href='/' className='flex gap-1'>
                    <span><Image src={icon} alt='Editory' width={32} height={32} className='rotate-12' /></span>
                    <span className={clsx(caveat.className, 'text-3xl')}>ditory</span>
                </Link>
                <div className='flex-1'></div>
                <form action={async () => {
                    'use server'
                    await signOut()
                }}>
                    {
                        session
                            ? <Button isIconOnly variant='flat' type='submit' className='rounded-full' color='primary' startContent={<BiLogOutCircle />}></Button>
                            : <Login />
                    }
                </form>
            </div>
        </div>
    </header>
}
