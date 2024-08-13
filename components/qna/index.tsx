import { Question } from '@/utils/types'
import { Button, Input } from '@nextui-org/react'
import { toFilled } from 'es-toolkit'
import { PiCheckDuotone, PiPlusDuotone, PiTrashDuotone } from 'react-icons/pi'

export default function QnA({ questions, setQuestions }: { questions: Question[], setQuestions: (questions: Question[]) => void }) {
    return <div className='flex flex-col gap-6'>
        {
            questions.map(({ q, a, correct }, index) => <div key={index} className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <Button color='primary' variant='flat' isIconOnly radius='full' onPress={() => {
                        setQuestions(questions.toSpliced(index, 1))
                    }} startContent={<PiTrashDuotone />}></Button>
                    <Input color='primary' value={q} onValueChange={(q) => {
                        setQuestions(toFilled(questions, { q, a, correct }, index, index + 1))
                    }} variant='flat' />
                </div>
                <div className='flex flex-col gap-2'>
                    {a?.map((answer, index_) => <div key={index} className='flex gap-2'>
                        <Button color='success' size='sm' variant={index_ === correct ? 'flat' : 'light'} isIconOnly radius='full' onPress={() => {
                            setQuestions(toFilled(questions, { q, a, correct: index_ }, index, index + 1))
                        }} startContent={<PiCheckDuotone />}></Button>
                        <Input color='primary' size='sm' value={answer} onValueChange={(value) => {
                            setQuestions(toFilled(questions, { q, a: toFilled(a, value, index_, index_ + 1), correct }, index, index + 1))
                        }} variant='underlined' />
                    </div>)}
                </div>
            </div>)
        }
        <Button color='primary' variant='flat' fullWidth onPress={() => {
            setQuestions([...questions, { q: '', a: ['', '', '', ''], correct: 0 }])
        }} startContent={<PiPlusDuotone />}>Add a question</Button>
    </div>
}
