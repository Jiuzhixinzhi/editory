'use client'

import Tiptap from '../../tiptap'
import { ClozeData } from '@/utils/types'
import { useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { toFilled } from 'es-toolkit/array'
import { omit, toMerged } from 'es-toolkit'

export default function ClozeEditor({
    data,
    setData,
    id
}: {
    data: ClozeData
    setData: (data: ClozeData) => void
    id?: string
}) {
    const [distractors, setDistractors] = useState<string[]>(['', '', ''])
    const [blankedWord, setBlankedWord] = useState<string>('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return <div className='flex flex-col gap-2 before:content-["Cloze"] before:text-primary-300 before:font-bold before:-mb-4 my-5'>
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
                                        color='primary'
                                        label={`Distractor ${index + 1}`}
                                        onValueChange={(value) => {
                                            setDistractors(toFilled(distractors, value, index, index + 1))
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
                                setData(toMerged(data, {
                                    distractors: {
                                        [blankedWord]: distractors
                                    }
                                }))
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
            content={data.text}
            blank={(word) => {
                setBlankedWord(word)
                setDistractors(data.distractors[word] ?? ['', '', ''])
                onOpen()
            }}
            unblank={(word) => {
                setData({
                    ...data,
                    distractors: omit(data.distractors, [word]),
                })
            }}
            ai={id ? {
                id,
                setData,
                data
            } : undefined}
            onUpdate={({ editor }) => {
                setData({
                    ...data,
                    text: editor.getHTML()
                })
            }}
        />
    </div>
}
