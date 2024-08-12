import Editory from '@/components/editory'
import { getData } from '@/utils/cookies'

export default async function Editor() {
    return (<Editory data={await getData()} />)
}
