'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs'
import { useSystemColorMode } from 'react-use-system-color-mode'
import { dark } from '@clerk/themes'

export interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter()
    const mode = useSystemColorMode()

    return <ClerkProvider appearance={{ baseTheme: mode === 'dark' ? dark : undefined }}>
        <GoogleOneTap />
        <NextUIProvider navigate={router.push}>
            <ThemeProvider attribute='class' enableSystem>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    </ClerkProvider>
}
