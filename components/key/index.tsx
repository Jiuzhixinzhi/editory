import { generateKey } from '@/utils/generators'
import Data from '@/utils/types'

export default function Key({
    data,
}: {
    data: Data[] | null
}) {
    return <div className='mx-auto font-serif w-full bg-background/30 min-h-40 p-4 rounded prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-1.5 prose-ul:my-0.5 prose-li:my-0 prose-img:my-2 dark:prose-invert'>
        {generateKey(data ?? [])}
    </div>
}
