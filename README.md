## Editory

> 以复杂数据结构自动化试卷与答案生成的英语测验制作工具。
> 
> - 框架：`Next.js`
> - 组件库：`NextUI`
> - 数据库：`Xata`
> - 用户管理：`Clerk`

按照 [`@/schema.json`](./schema.json) 初始化 Xata 数据库并填充[环境变量](./.env.example)后运行：

```
npm install
npm run dev
```

### 核心架构

- `/components`
  - `/editory` — 编辑界面
  - `/editor` — 编辑器
    - [x] `/fishing` — 小猫钓鱼题
    - [x] `/cloze` — 完形填空
    - [x] `/grammar` — 语法填空
    - [x] `/sentence` — 六选四
    - [x] `/reading` — 阅读理解
    - [x] `/listening` — 听力
    - [x] `/custom` — 自定义文本块 
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

### TODO

- [ ] 导出 Word UI 优化
- [ ] 去除挖空词内部格式
- [ ] 添加听力的`4x1`、`2x2`、`1x4`排版模式
- [ ] 全局`directions`显示开关
- [ ] 全局`I. Listening Comprehension`、`Section A`等格式开关
- [ ] 多题块分离渲染
