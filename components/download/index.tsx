'use client'

import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import Data from '@/utils/types'
import { Button } from '@nextui-org/react'
import { PiMicrosoftWordLogoDuotone } from 'react-icons/pi'
import { generateDocx } from '@/utils/generators'

export default function Download({ items, type }: { items: Data[], type: 'paper' | 'key' }) {
    async function loadFile(url: string, callback: (error: Error | null, content: PizZip.LoadData) => void) {
        (await import('pizzip/utils/index.js')).default.getBinaryContent(url, callback)
    }

    async function generateDocument() {
        const doc = await generateDocx(items, type)
        loadFile(
            '/template.docx',
            function (error, content) {
                if (error) {
                    throw error
                }
                let blob: Blob
                if (doc instanceof Buffer) {
                    blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
                } else {
                    blob = doc
                }
                saveAs(blob, `export-${type}.docx`)
            }
        )
    }

    return (<Button onPress={generateDocument} className='text-xl rounded-full' variant='light' isIconOnly startContent={<PiMicrosoftWordLogoDuotone />}></Button>)
}
