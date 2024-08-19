import { Button, } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import { PiSignInDuotone } from 'react-icons/pi'
import Image from 'next/image'
import icon from './icon.png'
import getSubdomain from '@/utils/routing'
import { themeFont } from '@/utils/fonts'
import { isLoggedIn } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'

export default async function Header() {
    if (getSubdomain()) return null

    return <header>
        <div className='fixed p-5 w-full right-0 z-50 font-mono font-semibold'>
            <div className='flex items-start'>
                <Link href='/' className='flex gap-1'>
                    <span><Image src={icon} alt='Editory' width={32} height={32} className='rotate-12' /></span>
                    <span className={clsx(themeFont.className, 'text-3xl')}>ditory</span>
                </Link>
                <div className='flex-1'></div>
                {
                    isLoggedIn()
                        ? <UserButton />
                        : <Button isIconOnly variant='flat' className='rounded-full' color='primary' startContent={<PiSignInDuotone />} href='/sign-in' as={Link}></Button>
                }
            </div>
        </div>
    </header>
}
