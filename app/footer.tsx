import getSubdomain from '@/utils/routing'
import { Button, ButtonGroup } from '@nextui-org/react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
    if (getSubdomain()) return null

    return <footer className='flex justify-center items-center my-4 opacity-50'>
        <ButtonGroup size='sm' variant='flat' color='primary' radius='full'>
            <Button isIconOnly startContent={<FaGithub />} href='https://github.com/Jiuzhixinzhi/editory' target='_blank' as={Link}></Button>
            <Button isIconOnly startContent={<MdEmail />} href='mailto:hi@editory.xyz' as={Link}></Button>
        </ButtonGroup>
    </footer>
}
