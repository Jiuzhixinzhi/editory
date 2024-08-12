'use client'

import { signIn } from 'next-auth/react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { BiLogInCircle } from 'react-icons/bi'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function Login() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant='ghost' className='rounded-full' color='primary' startContent={<BiLogInCircle />}></Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onPress={() => signIn('github', { redirectTo: '/' })} startContent={<FaGithub />}>
                    Log in with GitHub
                </DropdownItem>
                <DropdownItem onPress={() => signIn('google', { redirectTo: '/' })} startContent={<FaGoogle />}>
                    Log in with Google
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
