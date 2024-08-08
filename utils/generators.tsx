import Data from './types'

export function generatePaper(data: Data[]) {
    /*
     * TODO: Implement paper generation logic
     * - Iterate through the data array
     * - Generate HTML or JSX structure for each data item
     * - Handle different question types (e.g., 'fishing')
     */

    return data.map((data) => {
        switch (data.type) {
            case 'fishing':
                // 由含选项的方框 + 正文组成
                return <article dangerouslySetInnerHTML={{ __html: data.text }}></article>

            default:
                return <></>
        }
    })
}

export function generateKey(data: Data[]) {
    return <></>
}
