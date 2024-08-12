import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { XataAdapter } from '@auth/xata-adapter'
import { getXataClient } from '@/lib/xata'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: XataAdapter(getXataClient()),
    providers: [Google, GitHub],
})
