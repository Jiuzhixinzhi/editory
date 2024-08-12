'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import { useEditor, EditorContent, UseEditorOptions, BubbleMenu, getHTMLFromFragment } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PiTextBDuotone, PiTextItalicDuotone, PiTextStrikethroughDuotone, PiListBulletsDuotone, PiQuotesDuotone, PiTextHOneDuotone, PiTextHTwoDuotone, PiTextHThreeDuotone, PiSealQuestionDuotone, PiOptionDuotone, PiMagicWandDuotone } from 'react-icons/pi'
import TextStyle from '@tiptap/extension-text-style'
import Data from '@/utils/types'
import { readStreamableValue } from 'ai/rsc'
import generate from '../editor/actions'

const className = 'focus:outline-none prose prose-code:underline prose-code:underline-offset-4 prose-code:text-primary/40 prose-blockquote:my-3 prose-h1:my-3 prose-h2:my-2.5 prose-h3:my-2 prose-p:my-2 prose-ul:my-1 prose-li:my-0 prose-img:my-4 dark:prose-invert'

const Tiptap = ({ unblank, blank, ai, ...props }: UseEditorOptions & {
  blank?: (selection: string) => void,
  unblank?: (selection: string) => void
  ai?: {
    id: string,
    data: Data,
    setData: (data: any) => void,
  }
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
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

  const getSelection = () => {
    if (editor) {
      const { view, state } = editor
      const { from, to } = view.state.selection
      return getHTMLFromFragment(state.doc.slice(from, to).content, editor.schema)
    }
    return ''
  }

  return editor ? <div className='w-full'>
    <BubbleMenu editor={editor}>
      <ButtonGroup variant='light' className='bg-background border rounded-full overflow-clip'>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          variant={editor.isActive('heading', { level: 1 }) ? 'shadow' : 'light'}
          startContent={<PiTextHOneDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'shadow' : 'light'}
          startContent={<PiTextHTwoDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          variant={editor.isActive('heading', { level: 3 }) ? 'shadow' : 'light'}
          startContent={<PiTextHThreeDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'shadow' : 'light'}
          startContent={<PiTextBDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'shadow' : 'light'}
          startContent={<PiTextItalicDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'shadow' : 'light'}
          startContent={<PiTextStrikethroughDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'shadow' : 'light'}
          startContent={<PiQuotesDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'shadow' : 'light'}
          startContent={<PiListBulletsDuotone />}
          isIconOnly
        ></Button>
        <Button
          onPress={() => {
            if (!editor.isActive('code') && blank) {
              blank(getSelection())
            }
            else if (editor.isActive('code') && unblank) {
              unblank(getSelection())
            }
            editor.chain().focus().toggleCode().run()
          }}
          variant={editor.isActive('code') ? 'shadow' : 'light'}
          startContent={<PiSealQuestionDuotone />}
          isIconOnly
        ></Button>
        {blank && editor.isActive('code') && <Button
          onPress={() => {
            blank(getSelection())
          }}
          variant={editor.isActive('code') ? 'shadow' : 'light'}
          startContent={<PiOptionDuotone />}
          isIconOnly
        ></Button>}
        {ai && <Button
          onPress={async () => {
            const { object } = await generate({ id: ai.id, prompt: getSelection(), type: ai.data.type })
            for await (const partialObject of readStreamableValue(object)) {
              if (editor) {
                editor.commands.setContent(partialObject.text)
              }
              ai.setData({
                ...ai.data,
                ...partialObject
              })
            }
          }}
          variant='light'
          startContent={<PiMagicWandDuotone />}
          isIconOnly
        ></Button>}
      </ButtonGroup>
    </BubbleMenu>
    <EditorContent editor={editor} />
  </div> : <div className={className} dangerouslySetInnerHTML={{ __html: props.content as string }} />
}


export default Tiptap
