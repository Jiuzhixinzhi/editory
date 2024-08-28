import Editory from '@/components/editory'
import { getPaper } from '@/components/papers/actions'
import { isLoggedIn } from '@/utils/auth'
import { redirect } from 'next/navigation'

export const maxDuration = 60

export async function generateMetadata({ params }: { params: { id: string } }) {
    const paper = await getPaper({ id: params.id })
    return {
        title: `Editing ${paper.name}`
    }
}

export default async function EditingPage({ params }: { params: { id: string } }) {
    if (!await isLoggedIn()) {
        redirect('/')
    }
    const { id } = params
    const paper = await getPaper({ id })
    return (<Editory data={paper.data} id={id} />)
}
