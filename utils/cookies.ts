import { cookies } from 'next/headers'

export function getData() {
    const data = cookies().get('data')?.value
    console.log(data)
    return data ? JSON.parse(data) : null
}
