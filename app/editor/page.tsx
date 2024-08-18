import Editory from '@/components/editory'
import { getData } from '@/utils/cookies'

export default async function TryoutPage() {
    return (<Editory data={await getData()} />)
}
