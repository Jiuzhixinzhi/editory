'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import { useEditor, EditorContent, UseEditorOptions, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai'
import { CiCircleList } from 'react-icons/ci'
import { TbBlockquote } from 'react-icons/tb'
import { LuHeading1, LuHeading2 } from 'react-icons/lu'
import { MdOutlineQuiz } from 'react-icons/md'
import TextStyle from '@tiptap/extension-text-style'
import { IoOptionsOutline } from 'react-icons/io5'

const className = 'focus:outline-none prose prose-code:underline prose-code:text-primary/40 prose-blockquote:my-3 prose-h1:my-3 prose-h2:my-2.5 prose-h3:my-2 prose-p:my-2 prose-ul:my-1 prose-li:my-0 prose-img:my-4 dark:prose-invert'

const Tiptap = ({ unblank, blank, ...props }: UseEditorOptions & {
  blank?: (selection: string) => void,
  unblank?: (selection: string) => void
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
      return state.doc.textBetween(from, to, ' ')
    }
    return ''
  }

  return editor ? <div className='w-full'>
    <BubbleMenu editor={editor}>
      <ButtonGroup variant='light' className='bg-background border rounded-full overflow-clip'>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'shadow' : 'light'}
          startContent={<LuHeading1></LuHeading1>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          variant={editor.isActive('heading', { level: 3 }) ? 'shadow' : 'light'}
          startContent={<LuHeading2></LuHeading2>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'shadow' : 'light'}
          startContent={<AiOutlineBold></AiOutlineBold>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'shadow' : 'light'}
          startContent={<AiOutlineItalic></AiOutlineItalic>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'shadow' : 'light'}
          startContent={<AiOutlineStrikethrough></AiOutlineStrikethrough>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'shadow' : 'light'}
          startContent={<TbBlockquote></TbBlockquote>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'shadow' : 'light'}
          startContent={<CiCircleList></CiCircleList>}
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
          startContent={<MdOutlineQuiz></MdOutlineQuiz>}
          isIconOnly
        ></Button>
        {blank && editor.isActive('code') && <Button
          onPress={() => {
            blank(getSelection())
          }}
          variant={editor.isActive('code') ? 'shadow' : 'light'}
          startContent={<IoOptionsOutline></IoOptionsOutline>}
          isIconOnly
        ></Button>}
      </ButtonGroup>
    </BubbleMenu>
    <EditorContent editor={editor} />
  </div> : <div className={className} dangerouslySetInnerHTML={{ __html: props.content as string }} />
}


export default Tiptap
