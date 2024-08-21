import Editory from '@/components/editory'
import { isLoggedIn } from '@/utils/auth'
import { getData } from '@/utils/cookies'
import { redirect } from 'next/navigation'

export default async function TryoutPage() {
    if(isLoggedIn()){
        redirect('/')
    }
    return (<Editory data={await getData()} />)
}
