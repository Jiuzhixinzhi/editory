'use server'

import getUserIdOrThrow, { authWrite } from '@/utils/auth'
import { getXataClient } from '@/lib/xata'
import { genDefaultValue } from '@/utils/config'
import { revalidatePath } from 'next/cache'

const xata = getXataClient()

export async function getPaper({ id }: { id: string }) {
    const paper = await xata.db.papers.select(['name', 'data']).filter({ id }).getFirstOrThrow()
    return paper
}

export async function getPapers() {
    const user = getUserIdOrThrow()
    const papers = await xata.db.papers.select(['name']).filter({ user }).getAll()
    return papers
}

export async function createPaper({ id, name, full }: { id: string, name: string, full?: boolean }) {
    const user = getUserIdOrThrow()
    await xata.db.papers.create({
        id,
        name,
        user,
        data: full
            ? [genDefaultValue('custom'), genDefaultValue('listening'), genDefaultValue('grammar'), genDefaultValue('fishing'), genDefaultValue('cloze'), genDefaultValue('reading'), genDefaultValue('reading'), genDefaultValue('reading'), genDefaultValue('4/6')]
            : [genDefaultValue('custom')]
    })
    revalidatePath('/')
}

export async function deletePaper({ id }: { id: string }) {
    const paper = await authWrite(id)
    await paper.delete()
    revalidatePath('/')
}

export async function updatePaper({ id, name, data }: { id: string; name?: string; data?: JSON }) {
    const paper = await authWrite(id)
    await paper.update({ name, data })
    revalidatePath('/')
}
