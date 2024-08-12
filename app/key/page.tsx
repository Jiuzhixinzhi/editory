import Key from '@/components/key'
import { getData } from '@/utils/cookies'

export default async function PaperPage() {
    return <Key data={await getData()} />
}
