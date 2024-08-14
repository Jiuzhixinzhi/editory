'use client'

import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import Data from '@/utils/types'
import { Button } from '@nextui-org/react'
import { PiMicrosoftWordLogoDuotone } from 'react-icons/pi'
import { checkIsFullPaper, generateWordExport } from '@/utils/generators'

export default function Download({ items }: { items: Data[] }) {
    async function loadFile(url: string, callback: (error: Error | null, content: PizZip.LoadData) => void) {
        (await import('pizzip/utils/index.js')).default.getBinaryContent(url, callback)
    }

    function generateDocument() {
        loadFile(
            '/template.docx',
            function (error, content) {
                if (error) {
                    throw error
                }
                const zip = new PizZip(content)
                const doc = new Docxtemplater(zip, {
                    linebreaks: true,
                    paragraphLoop: true,
                })
                doc.render(generateWordExport(items))
                const blob = doc.getZip().generate({
                    type: 'blob',
                    mimeType:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                })
                saveAs(blob, 'export.docx')
            }
        )
    }

    return (<Button onPress={generateDocument} isDisabled={!checkIsFullPaper(items)} variant='flat' size='lg' color='primary' isIconOnly startContent={<PiMicrosoftWordLogoDuotone />}></Button>)
}
