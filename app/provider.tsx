'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

export interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter()

    return <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute='class' enableSystem>
            {children}
        </NextThemesProvider>
    </NextUIProvider>
}
