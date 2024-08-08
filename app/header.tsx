import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'

export default function Header() {
    return <Navbar position='sticky' isBordered isBlurred>
        <NavbarBrand className='space-x-2'>
            <Link
                className={`text-xl font-bold`}
                href={'/'}
            >
                Frella
            </Link>
        </NavbarBrand>
        <NavbarContent as={'div'} justify='end'>
        </NavbarContent>
    </Navbar>
}
