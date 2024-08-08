import { Chip } from '@nextui-org/chip'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

export default function List({ items, placeholder, add, remove }: { items: string[], placeholder?: string, add?: (item: string) => void, remove?: (topic: string) => void }) {
    const [input, setInput] = useState('')
    return <div className='flex flex-col gap-2'>
        <div className={`overflow-x-auto flex gap-2`}>
            {items.map(item => <Chip key={item} size='sm' variant='flat' onClose={remove && (() => {
                remove(item)
            })} color={'primary'}>{item}</Chip>)}
        </div>
        <div className='flex gap-2'>
            <Input type='text' placeholder={placeholder} color='primary' value={input} onValueChange={setInput} variant='underlined' />
            <Button variant='light' color='primary' onClick={add && (() => {
                add(input)
                setInput('')
            })}>Add</Button>
        </div>
    </div>
}
