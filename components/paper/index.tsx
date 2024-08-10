import { generatePaper } from '@/utils/generators'
import Data from '@/utils/types'

export default function Paper({
    data
}: {
    data: Data[]
}) {
    return <div className='w-full mx-auto font-serif bg-background/30 min-h-40 p-4 rounded focus:outline-none prose prose-blockquote:my-3 before:prose-code:content-[""] after:prose-code:content-[""] prose-tr:border-b-0 prose-h1:my-3 prose-h2:my-2.5 prose-h3:my-2 prose-p:my-2 prose-ul:my-1 prose-li:my-0 prose-img:my-4 dark:prose-invert'>
        {generatePaper(data)}
    </div>
}
