## Editory

> ```
> npm install
> npm run dev
> ```

### 架构

- `/components`
  - `/editor` — 编辑器
    - [x] `/fishing` — 小猫钓鱼题
    - [x] `/cloze` — 完形填空
    - [x] `/grammar` — 语法填空
    - [ ] `/sentence` — 六选四
  - `/paper` — 试卷展示
  - `/key` — 答案展示
- `/utils`
  - `/generators` — 生成试卷、答案
  - `/types` — 类型声明

### 各题型数据结构

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

#### 语法填空

```ts
export type GrammarData = {
    id: string
    text: string
    type: 'grammar'
    hints: Record<string, string | undefined>
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

### TODO

- [x] 以云端同步代替 cookie
- [x] 钓鱼的 key 好像有点问题
- [x] 登入用户的试卷生成
- [ ] 需限制挖空词**内部**不得带有格式
- [ ] `Generator`中的`JSX key`需要进行修改
- [ ] 修复后替换 `/utils/temp.ts`
- [ ] NextAuth 大版本升级
