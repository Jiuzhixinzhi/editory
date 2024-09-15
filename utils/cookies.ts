import { cookies } from 'next/headers'
import Data from './types'
import getSubdomain from './routing'
import { getPaper } from '@/components/papers/actions'

export async function getData(): Promise<Data[] | null> {
    const subdomain = getSubdomain()
    if (subdomain) {
        const { data } = await getPaper({ id: subdomain })
        return data
    }
    const data = cookies().get('data')?.value
    return data ? JSON.parse(data) : null
}
