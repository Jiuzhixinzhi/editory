## Editory

> 以复杂数据结构自动化试卷与答案生成的英语测验制作工具。

填充[环境变量](./.env.example)后运行：

```
npm install
npm run dev
```

### 核心架构

- `/components`
  - `/editor` — 编辑器
    - [x] `/fishing` — 小猫钓鱼题
    - [x] `/cloze` — 完形填空
    - [x] `/grammar` — 语法填空
    - [x] `/sentence` — 六选四
    - [x] `/reading` — 阅读理解
    - [ ] `/listening` — 听力
    - [ ] `custom` — 自定义文本块 
  - `/paper` — 试卷展示
  - `/key` — 答案展示
- `/utils`
  - `/generators` — 生成试卷、答案、可导出 Word 格式
  - `/types` — 类型声明

### 各题型数据结构

#### 听力

```ts
export type Question = {
    q: string
    a: string[]
    correct: number // index of the correct answer
}

export type ListeningQuestion = Question & {
    transcript: string
}

export type ListeningData = {
    id: string
    type: 'listening'
    questions: ListeningQuestion[]
}
```

#### 语法填空

```ts
export type GrammarData = {
    id: string
    text: string
    type: 'grammar'
    hints: Record<string, string | undefined>
}
```

#### 小猫钓鱼

```ts
export type FishingData = {
    id: string
    text: string
    type: 'fishing'
    distractors: string[]
    markerSet: string[] // 字母记号集，可应对仅ABCD的答题卡
}
```

注：挖空部分在 `text` 中以 `<code></code>` 包裹，下同。

#### 完形填空

```ts
export type ClozeData = {
    id: string
    text: string
    type: 'cloze'
    distractors: Record<string, string[]> // { '被挖空词': ['干扰项1'. '干扰项2', '干扰项3'] }
}
```

#### 阅读理解

```ts
export type ReadingQuestion = Question

export type ReadingData = {
    id: string
    text: string
    type: 'reading'
    questions: ReadingQuestion[]
}
```

#### 六选四

```ts
export type SentenceChoiceData = {
    id: string
    text: string
    type: '4/6'
    distractors: string[]
}
```

#### 自定义文本块

```ts
export type CustomData = {
    id: string
    type: 'custom'
    paper: string
    key: string
}
```

### 供导出 Word 文档的对象结构示例

模板：[`@/public/template.docx`](./public/template.docx)

注：嵌入 HTML 是付费功能，似乎现在只能舍弃格式只取文本。应该新建一个 DOM 提取一下 `textContent` 就行。

```js
{
    // 短对话 * 10
    shortConversations: [{
        no: 1,
        a: 'He didn’t know it would be cold.',
        b: 'He misunderstood the weather report.',
        c: 'He didn’t have time to look for the coat.',
        d: 'He forgot to bring the coat.',
    }],
    // 长对话A * 3
    shortPassageA: [{
        no: 11,
        a: 'He didn’t know it would be cold.',
        b: 'He misunderstood the weather report.',
        c: 'He didn’t have time to look for the coat.',
        d: 'He forgot to bring the coat.',
    }],
    // 长对话B * 3
    shortPassageB: [{
        no: 14,
        a: 'He didn’t know it would be cold.',
        b: 'He misunderstood the weather report.',
        c: 'He didn’t have time to look for the coat.',
        d: 'He forgot to bring the coat.',
    }],
    // 长对话C * 4
    longConversationC: [{
        no: 17,
        a: 'He didn’t know it would be cold.',
        b: 'He misunderstood the weather report.',
        c: 'He didn’t have time to look for the coat.',
        d: 'He forgot to bring the coat.',
    }],
    // 语法
    grammarTitle: 'Grammar Title',
    grammarText: 'Grammar Text',
    // 钓鱼
    vocabTitle: 'Vocab Title',
    vocabText: 'Vocab Text',
    vocabA: 'Option A',
    vocabB: 'Option B',
    vocabC: 'Option C',
    vocabD: 'Option D',
    vocabE: 'Option E',
    vocabF: 'Option F',
    vocabG: 'Option G',
    vocabH: 'Option H',
    vocabI: 'Option I',
    vocabJ: 'Option J',
    vocabK: 'Option K',
    // 完型填空 * 15
    clozeTitle: 'Cloze Title',
    clozeText: 'Cloze Text',
    clozeOptions: [{
        no: 41,
        a: 'Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D',
    }, {
        no: 42,
        a: 'Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D',
    }],
    // 阅读理解A * n
    readingAText: 'Reading A Text',
    readingAQuestions: [{
        no: 56,
        q: 'What?',
        a: 'Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D',
    }],
    // 阅读理解B * n
    readingBText: 'Reading B Text',
    readingBQuestions: [{
        no: 60,
        q: 'What?',
        a: 'Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D',
    }],
    // 阅读理解C * n
    readingCText: 'Reading C Text',
    readingCQuestions: [{
        no: 63,
        q: 'What?',
        a: 'Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D',
    }],
    // 六选四 * 6
    sentenceOptions: [{
        marker: 'A',
        text: 'Option A',
    }, {
        marker: 'B',
        text: 'Option B',
    }, {
        marker: 'C',
        text: 'Option C',
    }, {
        marker: 'D',
        text: 'Option D',
    }, {
        marker: 'E',
        text: 'Option E',
    }, {
        marker: 'F',
        text: 'Option F',
    }],
    sentenceTitle: '4/6 Title',
    sentenceText: '4/6 Text',
}
```

### TODO

- [ ] 导出 Word
- [ ] 需限制挖空词**内部**不得带有格式
- [ ] `Generator` 中的 `JSX key` 需要进行修改
- [ ] key 排版优化
- [ ] 添加 `Generator` 中的类默认属性，定义一个方法实现
- [ ] 添加听力的`4x1`、`2x2`、`1x4`排版模式
