import Paper from '@/components/paper'
import { getData } from '@/utils/cookies'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Paper',
}

export default async function PaperPage() {
    return <Paper data={await getData()} />
}
