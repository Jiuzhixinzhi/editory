import Editory from '@/components/editory'
import { getPaper } from '@/components/papers/actions'
import { isLoggedIn } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Editor({ params }: { params: { id: string } }) {
    if (!await isLoggedIn()) {
        redirect('/')
    }
    const { id } = params
    const paper = await getPaper({ id })
    return (<Editory data={paper.data} id={id} />)
}
