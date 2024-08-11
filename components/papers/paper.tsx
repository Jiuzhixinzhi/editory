'use client'

import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { BiCheck, BiEdit, BiTrash } from 'react-icons/bi'
import { createPaper, deletePaper, updatePaper } from './actions'
import Link from 'next/link'

export default function Paper({ id, name, createNew }: { id: string; name: string, createNew: boolean }) {
    const [isEditing, setIsEditing] = useState(createNew)
    const [paperName, setPaperName] = useState(name)
    const [isLoading, setIsLoading] = useState(false)
    return <div className='flex items-center justify-between p-2 gap-2'>
        {
            isEditing
                ? <Input size='sm' value={paperName} placeholder='Create new paper' variant='underlined' color='primary' onValueChange={setPaperName} className='flex-1' />
                : <Link href={`/edit/${id}`} className='flex-1'>{paperName}</Link>
        }
        <Button isIconOnly isLoading={isLoading} size='sm' variant='light' onPress={async () => {
            setIsEditing(!isEditing)
            if (isEditing) {
                setIsLoading(true)
                if (createNew) {
                    await createPaper({ id, name: paperName })
                    setPaperName('')
                    setIsEditing(true)
                } else {
                    await updatePaper({ id, name: paperName })
                }
                setIsLoading(false)
            }
        }} startContent={isEditing ? <BiCheck /> : <BiEdit />}></Button>
        <Button isIconOnly isDisabled={createNew} isLoading={isLoading} size='sm' variant='light' color='danger' onPress={async () => {
            setIsLoading(true)
            await deletePaper({ id })
            setIsLoading(false)
        }} startContent={<BiTrash />}></Button>
    </div>
}
