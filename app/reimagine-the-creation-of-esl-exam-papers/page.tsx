import Main from '@/components/main'
import { themeFont } from '@/utils/fonts'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import icon from '@/app/icon.png'
import { Button, Card, CardBody } from '@nextui-org/react'
import { signIn } from '@/auth'
import { FcGoogle } from 'react-icons/fc'

export const metadata = {
    title: 'Reimagine the creation of ESL exam papers',
    description: 'Reimagine the creation of ESL exam papers',
}

export default function ReimagineTheCreationOfESLExamPapers() {
    return <Main className='mx-auto max-w-[700px]'>
        <article className='prose font-serif py-10'>
            <h1>Reimagine the creation of ESL exam papers</h1>
            <p><strong><span>Ever since 1983,</span></strong><span> when Microsoft Word was released and office workers across the globe cheered for a revolution in the way we work, people from all walks of life have been using it for widely differing sorts of things, among whom, of course, are English teachers that would otherwise have been handcrafting examination papers for another 40 years as of now.</span></p><p><span>But today, the convenience may not feel as significant. Sometimes the chores are even irritating. Say, we’d like to turn a </span><em><span>Times</span></em><span> article into the Vocabulary section of a standard College Entrance Examination paper.</span></p><ol><li><p><span>First, we copy an article from </span><em><span>The New York Times</span></em><span> and paste it into Word.</span></p></li><li><p><span>Next, we select a word, copy and paste it into the bordered word box above the article.</span></p></li><li><p><span>Then we add a sequence number before the blank.</span></p></li><li><p><span>After that, repeat 2~3.</span></p></li><li><p><span>After that, repeat 2~3.</span></p></li><li><p><span>After that, repeat 2~3.</span></p></li><li><p><span>…</span></p></li><li><p><span>When we feel like adding a distractor for one of the blanked words, we add one to the box.</span></p></li><li><p><span>Finally, we complete the key to this section.</span></p></li></ol><p><span>The problem is, it doesn’t feel like the effective creation of educational material. It’s more like the grind of thinking of the actual questions, then moving about words and typing out numbers and dealing with the formatting for presenting the paper to the students and dealing with the formatting for presenting the key to the teachers, isn’t it? </span></p><p><strong><span>Can we just do the thinking and skipping the rest? </span></strong><span>It’s totally sensible and feasible. In fact, think about it: what is the </span><em><span>information</span></em><span> within an exam? Not a paper for students and a key for teachers, but the actual information entropy contained. It’s what makes the exam the exam it is. In other words, if the information to convey is determined, then the exam paper (and the key) is determined. Again, let’s use Vocabulary as an example, the information entropy is merely the passage you’ve chosen, words you elect to blank, and a distractor you add. If you’ve decided on those things, then the paper’s done! Ideally, your only job is to craft the actual information of the exam, while leaving the rest automated.</span></p><p><span>Sadly, although it’s technically possible, you can’t. Well, not if you’re using Word as your editor. Word is a general-purpose text editor that has no idea about the information structure of an English exam paper, so there’s no way you can easily tell it what the blanks should be and automatically get them into the word box and restore them in the correct order in the key. Alas, back to the grindstone.</span></p><p><strong><span>But, imagine,</span></strong><span> what if a tool is designed to process exam papers in a structured way to meet the needs for English exam paper editing? What if you can simply click on a word to make it a blank and automatically add it to the word box? What if you only have to craft what matters, and have the paper and the key generated for you?</span></p><p><span>In an era of great software speciality, we need tools that specialise. And Microsoft Word belongs to the last century. We can’t, for example, store a list of options for a cloze in a Word document, which are stored as plain text that doesn’t mean anything to Word, and then ask the machine to shuffle it to generate a randomised paper and a corresponding key. But we can manage to do that using a data type known as </span><em><span>array</span></em><span>, if we can develop a tailored program. Structured data will offer great extensibility in order for machines to manipulate it and perform tasks, finally leading to the elimination of the necessity for toiling over the enduser-facing paper and key yourself. And, if we are blessed enough, we can even leverage the great extensibility and, to some extent, hand jobs like an initial draft over to the hands of artificial intelligence.</span></p><p><strong><span>It turns out that the future is here.</span></strong></p><p><span>Get started today, with cloud sync and AI drafting.</span></p>
        </article>
            <div className={clsx('flex flex-col p-6 gap-3 rounded border-1 border-primary/20 bg-primary-100/10', themeFont.className)}>
                <div className='flex gap-1 justify-center items-center'>
                    <span><Image src={icon} alt='Editory' width={64} height={64} className='rotate-12' /></span>
                    <span className={'text-6xl'}>ditory</span>
                </div>
                <form className='flex justify-center gap-3' action={async () => {
                    'use server'
                    await signIn('google', { redirectTo: '/' })
                }}>
                    <Button variant='light' color='primary' href='/editor' as={Link} size='lg' className='rounded-full text-2xl'>Try it out</Button>
                    <Button variant='bordered' color='primary' type='submit' startContent={<FcGoogle />} size='lg' className='rounded-full text-2xl'>Get Started</Button>
                </form>
            </div>
    </Main>
}