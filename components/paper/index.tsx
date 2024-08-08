import { generatePaper } from '@/utils/generators'
import Data from '@/utils/types'

export default function Paper({
    data
}: {
    data: Data[]
}) {
    return <div className='border-default-500/20 border-1 bg-background/30 min-h-40 p-4 rounded focus:outline-none prose prose-code:underline prose-code:text-transparent prose-blockquote:my-3 prose-h1:my-3 prose-h2:my-2.5 prose-p:my-2 prose-ul:my-1 prose-li:my-0 prose-img:my-4 dark:prose-invert'>
        {generatePaper(data)}
    </div>
}
