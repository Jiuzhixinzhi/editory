import { auth } from '@clerk/nextjs/server'
import { getXataClient } from '../lib/xata'

const xata = getXataClient()

export function isLoggedIn() {
    return auth().userId
}

export default function getUserIdOrThrow() {
    const { userId } = auth()
    if (!userId) {
        throw new Error('Unauthorized')
    }
    return userId
}

export async function authWrite(paperId: string) {
    const userId = getUserIdOrThrow()
    const paper = await xata.db.papers.select(['user']).filter({ id: paperId }).getFirstOrThrow()
    if (paper.user !== userId) {
        throw new Error('Unauthorized')
    }
    return paper
}
