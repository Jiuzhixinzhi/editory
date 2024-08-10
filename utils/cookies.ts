import { cookies } from 'next/headers'
import Data from './types'

export function getData(): Data[] | null {
    const data = cookies().get('data')?.value
    return data ? JSON.parse(data) : null
}
