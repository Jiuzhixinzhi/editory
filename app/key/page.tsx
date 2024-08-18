import Key from '@/components/key'
import { getData } from '@/utils/cookies'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Key',
}

export default async function KeyPage() {
    return <Key data={await getData()} />
}
