import { auth, signIn, signOut } from '@/auth'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { SiCkeditor4 } from 'react-icons/si'

export default async function Header() {
    const session = await auth()
    return <header>
        <div className='fixed p-5 w-full right-0 z-50 font-mono font-semibold'>
            <div className='flex items-start'>
                <Link href='/' className='flex items-end gap-2'>
                    <span><SiCkeditor4 className='text-2xl' /></span>
                    <span className='text-lg'>Editory</span>
                </Link>
                <div className='flex-1'></div>
                <form action={async () => {
                    'use server'
                    if (session)
                        await signOut()
                    else
                        await signIn('google')
                }}>
                    {
                        session
                            ? <Button isIconOnly variant='flat' className='rounded-full' color='primary' startContent={<BiLogOutCircle />}></Button>
                            : <Button isIconOnly variant='ghost' className='rounded-full' color='primary' startContent={<BiLogInCircle />}></Button>
                    }
                </form>
            </div>
        </div>
    </header>
}
