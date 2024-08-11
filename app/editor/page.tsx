import Editory from '@/components/editory'
import { getData } from '@/utils/cookies'

export default function Editor() {
    return (<Editory data={getData()} />)
}
