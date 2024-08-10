'use client'

import Tiptap from '../../tiptap'
import { ClozeData } from '@/utils/types'
import { useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'

export default function ClozeEditor({
    data,
    setData
}: {
    data: ClozeData
    setData: (data: ClozeData) => void
}) {
    const [distractors, setDistractors] = useState<string[]>(['', '', ''])
    const [blankedWord, setBlankedWord] = useState<string>('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return <div className='flex flex-col gap-2'>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>Edit distractors</ModalHeader>
                        <ModalBody>
                            {
                                distractors.map((distractor, index) => (
                                    <Input
                                        key={index}
                                        autoFocus={index === 0}
                                        value={distractor}
                                        label={`Distractor ${index + 1}`}
                                        onValueChange={(value) => {
                                            setDistractors(distractors.map((_, i) => i === index ? value : distractors[i]))
                                        }}
                                        variant='underlined'
                                    />
                                ))
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Close
                            </Button>
                            <Button color='primary' variant='flat' onPress={() => {
                                setData({
                                    ...data,
                                    distractors: {
                                        ...data.distractors,
                                        [blankedWord]: distractors
                                    }
                                })
                                onClose()
                            }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        <Tiptap
            key={data.id}
            content={data.text}
            blank={(word) => {
                setBlankedWord(word)
                setDistractors(data.distractors[word] ?? ['', '', ''])
                onOpen()
            }}
            unblank={(word) => {
                const { [word]: _, ...rest } = data.distractors
                setData({
                    ...data,
                    distractors: rest
                })
            }}
            onUpdate={({ editor }) => {
                setData({
                    id: data.id,
                    text: editor.getHTML(),
                    type: data.type,
                    distractors: data.distractors
                })
            }}
        />
    </div>
}
