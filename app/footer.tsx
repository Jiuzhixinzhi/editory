import { themeFont } from '@/utils/fonts'
import getSubdomain from '@/utils/routing'
import { Button, ButtonGroup } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import { PiGithubLogoDuotone, PiHeartDuotone, PiMailboxDuotone } from 'react-icons/pi'

export default function Footer() {
    if (getSubdomain()) return null

    return <footer className={clsx(themeFont.className, 'flex justify-center items-center my-4 opacity-50')}>
        <ButtonGroup size='sm' variant='flat' color='primary' radius='full'>
            <Button isIconOnly startContent={<PiGithubLogoDuotone />} href='https://github.com/Jiuzhixinzhi/editory' target='_blank' as={Link}></Button>
            <Button endContent={<PiHeartDuotone />} className='font-bold'>Made with</Button>
            <Button isIconOnly startContent={<PiMailboxDuotone />} href='mailto:hi@editory.xyz' as={Link}></Button>
        </ButtonGroup>
    </footer>
}
