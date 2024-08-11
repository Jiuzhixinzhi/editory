'use server'

import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'
import { z } from 'zod'
import { authWrite } from '@/lib/auth'
import { DataType } from '@/utils/types'

export default async function generate({ id, prompt, type }: { id: string, prompt: string, type: DataType }) {
    await authWrite(id)

    const stream = createStreamableValue()
    const { system, schema } = getConfig(type);
    (async () => {
        const { partialObjectStream } = await streamObject({
            model: openai('gpt-4-turbo'),
            prompt,
            system,
            // @ts-ignore
            schema
        })

        for await (const partialObject of partialObjectStream) {
            stream.update(partialObject)
        }
        stream.done()
    })()
    return { object: stream.value }
}

const getConfig = (type: DataType) => {
    switch (type) {
        case 'cloze':
            return {
                system: `把prompt出成英语高考完形填空，高考难度。\n在text里输出挖空的文本（挖空处加题号，将挖空词以<code></code>包裹，形如<code>word</code>），在distrators以被挖空词为键、三个干扰项为值。对下文出十五题，每题三个干扰项。例如若其中被挖空词有moral和effectively，应输出{"text":"...<code>moral</code>...<code>effectively</code>...","distractors":{"moral":["scientific","potential","instant"],"effectively":["hardly","likely","skillfully"],"...":["...","...","..."]}}。\n必须对所有十五题各给出三个干扰项。尽可能广泛地考察词汇，选项中尽量使用常用词。挖空词汇必须与上下文强关联，可以合理推断出答案。选项分布必须均匀，贯穿全文。`,
                schema: z.object({
                    text: z.string().describe('挖空的文本'),
                    distractors: z.record(z.string().describe('被挖空的词'), z.array(z.string()).length(3).describe('该题的三个干扰项')).describe('干扰项')
                })
            }
        case 'fishing':
            return {
                system: `把prompt出成英语高考小猫钓鱼题（十一选十），高考难度。\n在text里输出挖空的文本（挖空处加题号，将挖空词以<code></code>包裹，形如<code>word</code>），在distrators输出干扰项数组。对下文出十空，必须对其中一空出一个用于混淆被试者的干扰项，例如{"text":"...<code>word</code>...","distractors":["..."]}}。\n一共出十题，即挖十个空，以及一个干扰项。尽可能广泛地考察词性不同的词汇，选项中尽量使用常用词。挖空词汇必须与上下文强关联，可以合理推断出答案。选项分布必须均匀，贯穿全文。`,
                schema: z.object({
                    text: z.string().describe('挖空的文本'),
                    distractors: z.array(z.string()).length(1).describe('一个干扰项')
                })
            }
        default:
            throw new Error()
    }
}
