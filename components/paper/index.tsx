import { generatePaper } from '@/utils/generators'
import Data from '@/utils/types'

export default function Paper({
    data
}: {
    data: Data[] | null
}) {
    return <div className='w-full mx-auto font-serif min-h-40 p-4 rounded focus:outline-none prose prose-blockquote:my-1.5 prose-table:my-3 prose-tr:border-b-0 prose-h1:my-1.5 prose-h1:text-2xl prose-h2:my-1.5 prose-h2:text-xl prose-h3:my-1.5 prose-h3:text-lg prose-p:my-1.5 prose-ul:my-0.5 prose-li:my-0 prose-img:my-2 dark:prose-invert' dangerouslySetInnerHTML={{ __html: generatePaper(data ?? []) }}>
    </div>
}
