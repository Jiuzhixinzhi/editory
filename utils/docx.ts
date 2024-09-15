import { Packer, Paragraph, Table, TableRow, TableCell, TextRun, Document, type IRunOptions, type IParagraphOptions } from 'docx'
import parse from 'html-dom-parser'
import type { DOMNode, Element, Text } from 'html-dom-parser'
import type { ChildNode } from 'domhandler'

type DocxTextStyle = Pick<IRunOptions, 'bold' | 'italics' | 'underline' | 'size'>
type DocxParagraphStyle = Pick<IParagraphOptions, 'alignment' | 'indent' | 'spacing' | 'contextualSpacing'>

class DocxPartGenerator {
    private html: string
    private root: DOMNode[]

    constructor(html: string) {
        this.html = html
        this.root = parse(this.html)
    }

    private getTextRunStyle(tagName: string): DocxTextStyle {
        switch (tagName) {
            case 'b': case 'strong':
                return { bold: true }
            case 'i': case 'em':
                return { italics: true }
            case 'u':
                return { underline: { type: 'single' } }
            case 'h1':
                return { size: 36, bold: true }
            case 'h2':
                return { size: 28, bold: true }
            default:
                return { size: 22 }
        }
    }

    private getRow(node: Element): TableRow {
        const cells = node.children.map(cell => {
            if (cell.type !== 'tag' || (cell.name !== 'td' && cell.name !== 'th')) {
                return
            }
            const children = cell.children.map(child => this.createTextRun(child, {})).flat()
            return new TableCell({
                children: [new Paragraph({
                    children,
                })],
            })
        }).filter(cell => cell !== undefined)
        return new TableRow({
            children: cells
        })
    }

    private createTextRun(node: ChildNode, style: DocxTextStyle): TextRun[] {
        if (node.type !== 'text' && node.type !== 'tag') {
            return []
        }
        if (node.type === 'text') {
            return [new TextRun({
                text: node.data,
                ...style,
            })]
        }
        const addStyle = this.getTextRunStyle(node.name)
        return node.children.map(child => {
            if (child.type !== 'text' && child.type !== 'tag') {
                return
            }
            return this.createTextRun(child, Object.assign({}, style, addStyle))
        }).filter(run => run !== undefined).flat()
    }

    private createParagraph(node: Element | Text, style: DocxParagraphStyle): Paragraph {
        const children = node.type === 'text' ? [node] : node.children
        const runsStyle = node.type === 'tag' ? this.getTextRunStyle(node.name) : {}
        const runs = children.map(child => this.createTextRun(child, runsStyle)).flat()
        return new Paragraph({
            children: runs,
            ...style,
        })
    }

    private createTable(node: Element): Table {
        const rows = node.children.map(row => {
            if (row.type !== 'tag') {
                return
            }
            if (row.name !== 'tr') {
                return row.children.map(realRow => {
                    if (realRow.type === 'tag' && realRow.name === 'tr') {
                        return this.getRow(realRow)
                    }
                }).flat().filter(row => row !== undefined)
            }
            return this.getRow(row)
        }).flat().filter(row => row !== undefined)
        const NONE_BORDER = { size: 0, style: 'none' } as const
        const BORDER = { size: 1, style: 'single' } as const
        const hasBorder = node.attributes.some(attr => attr.name === 'class' && attr.value.includes("border"))
        const border = hasBorder ? BORDER : NONE_BORDER
        return new Table({
            rows,
            width: { size: 100, type: 'pct' },
            borders: {
                left: border,
                right: border,
                top: border,
                bottom: border,
                insideHorizontal: NONE_BORDER,
                insideVertical: NONE_BORDER,
            }
        })
    }

    private parse(node: DOMNode): (Paragraph | Table)[] {
        switch (node.type) {
            case 'text':
                return [this.createParagraph(node, {})]
            case 'tag':
                if (node.name === 'p') {
                    return [this.createParagraph(node, {
                        indent: { firstLine: '10pt' },
                        spacing: { before: 0.1, after: 0.1 },
                        contextualSpacing: true,
                    })]
                } else if (["h1", "h2", "h3"].includes(node.name)) {
                    return [this.createParagraph(node, { alignment: 'center' })]
                } else if (node.name === 'table') {
                    return [this.createTable(node)]
                } else {
                    return node.children.map(child => {
                        if (child.type === 'cdata' || child.type === 'root') {
                            return
                        } else {
                            return this.parse(child)
                        }
                    }).filter(child => child).flat().filter(part => part !== undefined)
                }
            case 'directive': case 'comment': case 'script': case 'style':
                return []
            default:
                throw new Error(`Unknown node type: ${node.type}`)
        }
    }

    public generateDocxPart() {
        const part = this.root.map(root => this.parse(root)).flat()
        // part.push(new Paragraph({
        //     text: this.html
        // }))
        return part
    }
}

export async function generateDocx(textArray: string[]): Promise<Blob> {
    const parts = (await Promise.all(textArray.map(async text => {
        const generator = new DocxPartGenerator(text)
        const parts = generator.generateDocxPart()
        parts.push(new Paragraph({}))
        return parts
    }))).flat()
    const doc = new Document({
        sections: [{
            children: parts
        }]
    })
    return Packer.toBlob(doc)
}
