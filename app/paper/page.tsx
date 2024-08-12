import Paper from '@/components/paper'
import { getData } from '@/utils/cookies'

export default async function PaperPage() {
    return <Paper data={await getData()} />
}
