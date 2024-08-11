import Paper from './paper'
import { getPapers } from './actions'
import { Divider } from '@nextui-org/react'

export default async function Papers() {
    const papers = await getPapers()
    return (
        <div className='w-4/5'>
            {papers.map(({ id, name }) => (
                <>
                    <Paper key={id} id={id} name={name} createNew={false} />
                    <Divider className='my-1' />
                </>

            ))}
            <Paper id={crypto.randomUUID()} name='' createNew={true} />
        </div>
    )
}
