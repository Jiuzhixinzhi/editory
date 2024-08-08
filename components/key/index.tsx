import { generateKey } from '@/utils/generators'
import Data from '@/utils/types'

export default function Paper({
    data
}: {
    data: Data[]
}) {
    return <div className='border-default-500/20 border-1 bg-background/30 min-h-40 p-4 rounded prose dark:prose-invert'>
        {generateKey(data)}
    </div>
}
