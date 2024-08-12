import { auth } from '@/auth'
import { getXataClient } from '../lib/xata'

const xata = getXataClient()

export async function isLoggedIn() {
    const session = await auth()
    return !!session?.user
}

export default async function getUser() {
    const session = await auth()
    if (!session?.user) {
        throw new Error('Unauthorized')
    }
    return session.user
}

export async function authWrite(paperId: string) {
    const user = await getUser()
    const paper = await xata.db.papers.select(['user.id']).filter({ id: paperId }).getFirstOrThrow()
    if (paper.user!.id !== user.id) {
        throw new Error('Unauthorized')
    }
    return paper
}
