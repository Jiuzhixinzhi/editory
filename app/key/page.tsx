import Key from '@/components/key'
import { getData } from '@/utils/cookies'

export default function PaperPage() {
    return <Key data={getData()} />
}
