import Paper from '@/components/paper'
import { getData } from '@/utils/cookies'

export default function PaperPage() {
    return <Paper data={getData()} />
}
