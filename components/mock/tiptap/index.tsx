'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import { useEditor, EditorContent, UseEditorOptions, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PiCursorClickDuotone, PiMagicWandDuotone, PiSealQuestionDuotone, PiSelectionAllDuotone } from 'react-icons/pi'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import { themeFont } from '@/utils/fonts'
import clsx from 'clsx'

const className = 'focus:outline-none prose prose-code:underline prose-code:underline-offset-4 prose-code:text-primary/40 prose-blockquote:my-3 prose-h1:my-3 prose-h1:text-2xl prose-h2:my-2.5 prose-h2:text-xl prose-h3:my-2 prose-h3:text-lg prose-p:my-2 prose-ul:my-1 prose-li:my-0 prose-img:my-4 dark:prose-invert'

const Tiptap = ({ unblank, blank, unblankable, ai, ...props }: UseEditorOptions & {
    blank?: (selection: string) => void,
    unblank?: (selection: string) => void,
    unblankable?: boolean,
    ai?: () => void
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Image
        ],
        editorProps: {
            attributes: {
                class: className,
            },
        },
        editable: true,
        immediatelyRender: false,
        ...props
    })

    const getSelectionText = () => {
        if (editor) {
            const { view, state } = editor
            const { from, to } = view.state.selection
            return state.doc.textBetween(from, to, ' ')
        }
        return ''
    }

    return editor
        ? <div className='w-full'>
            <BubbleMenu editor={editor}>
                <ButtonGroup color='primary' className='bg-background border rounded-full overflow-clip'>
                    {!unblankable && <Button
                        onPress={() => {
                            if (!editor.isActive('code') && blank) {
                                blank(getSelectionText())
                            }
                            else if (editor.isActive('code') && unblank) {
                                unblank(getSelectionText())
                            }
                            editor.chain().focus().toggleCode().run()
                        }}
                        variant={editor.isActive('code') ? 'shadow' : 'light'}
                        startContent={<PiSealQuestionDuotone />}
                        isIconOnly
                    ></Button>}
                    {ai && <Button
                        onPress={async () => {
                            ai()
                        }}
                        variant='light'
                        startContent={<PiMagicWandDuotone />}
                        isIconOnly
                    ></Button>}
                </ButtonGroup>
            </BubbleMenu>
            <EditorContent editor={editor} />
            {ai && <div className='w-full flex justify-center'>
                <Button
                    onPress={() => {
                        editor.chain().focus().selectAll().run()
                    }}
                    className={clsx(themeFont.className, 'text-lg -mb-4 animate-bounce')}
                    variant='light'
                    color='secondary'
                    startContent={<PiSelectionAllDuotone />}
                    endContent={<PiCursorClickDuotone />}
                >Select All</Button>
            </div>}
        </div>
        : <div className='w-full'>
            <div className={className} dangerouslySetInnerHTML={{ __html: props.content as string }} />
            {ai && <div className='w-full flex justify-center'>
                <Button
                    className={clsx(themeFont.className, 'text-lg -mb-4 animate-bounce')}
                    variant='light'
                    color='secondary'
                    startContent={<PiSelectionAllDuotone />}
                    endContent={<PiCursorClickDuotone />}
                >Select All</Button>
            </div>}
        </div>
}

export default Tiptap
