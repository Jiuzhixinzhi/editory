import { generateKey } from '@/utils/generators'
import Data from '@/utils/types'

export default function Key({
    data,
}: {
    data: Data[] | null
}) {
    return <div className='mx-auto font-serif w-full bg-background/30 min-h-40 p-4 rounded prose dark:prose-invert'>
        {generateKey(data ?? [])}
    </div>
}
