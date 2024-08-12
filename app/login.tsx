'use client'

import { signIn } from 'next-auth/react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { PiSignInDuotone, PiGithubLogoDuotone, PiGoogleLogoDuotone } from 'react-icons/pi'

export default function Login() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant='ghost' className='rounded-full' color='primary' startContent={<PiSignInDuotone />}></Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onPress={() => signIn('github', { redirectTo: '/' })} startContent={<PiGithubLogoDuotone />}>
                    Log in with GitHub
                </DropdownItem>
                <DropdownItem onPress={() => signIn('google', { redirectTo: '/' })} startContent={<PiGoogleLogoDuotone />}>
                    Log in with Google
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
