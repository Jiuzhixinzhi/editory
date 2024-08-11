'use client'

import { Dispatch, SetStateAction } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Data, { DataType } from '@/utils/types'
import { genDefaultValue, NAME_MAP } from '@/utils/config'
import { Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'
import { CgAdd } from 'react-icons/cg'
import SortableItem from './item'

export default function Sortable({ items, setItems }: {
    items: Data[]
    setItems: Dispatch<SetStateAction<Data[]>>
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return (
        <div className='flex gap-4'>
            <Dropdown>
                <DropdownTrigger className='place-self-end'>
                    <Button color='primary' variant='flat' size='lg' startContent={<CgAdd />} isIconOnly></Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {(Object.keys(NAME_MAP) as DataType[]).map((key) => (
                        <DropdownItem key={key} onPress={() => {
                            setItems((items) => [...items, genDefaultValue(key)])
                        }}>
                            {NAME_MAP[key]}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <div className='border-1 border-default-800/20 pl-4 py-2 pr-1 min-w-60 flex flex-col justify-center items-center'>
                        {items.map((item, index) => <SortableItem key={item.id} id={item.id} index={index} name={NAME_MAP[item.type]} onDelete={() => {
                            setItems((items) => items.filter((_, i) => i !== index))
                        }} />)}
                    </div>
                </SortableContext>
            </DndContext>
            <div className='text-2xl font-bold text-default-800/30 h-full'>
                Drag
                <br />
                To reorder
            </div>
        </div>
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over.id)

                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }
}