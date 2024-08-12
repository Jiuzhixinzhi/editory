import { headers } from 'next/headers'

export default function getSubdomain() {
    // return '89e963ba-d214-47bd-9ad9-8e26f447e50e'
    const host = headers().get('host')
    const tokens = host?.split('.')
    return tokens?.length === 3 ? tokens[0].split('-')[0] : undefined
}
