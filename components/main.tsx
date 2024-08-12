'use client'

import { HTMLAttributes } from 'react'
import { use100vh } from 'react-div-100vh'

export default function Main({ isCentered, fullHeight, ...props }: HTMLAttributes<HTMLDivElement> & {
    isCentered?: boolean,
    fullHeight?: boolean
}) {
    const height = use100vh()
    const offset = fullHeight ? 0 : 64
    return <main
        style={{
            minHeight: height ? height - offset : `calc(100vh - ${offset}px)`,
            margin: '0 auto',
            padding: '16px',
            width: '100%',
            ...(isCentered ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
        }}
        {...props}
    ></main>
}
