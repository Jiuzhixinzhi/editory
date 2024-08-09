## Editory

> ```
> npm install
> npm run dev
> ```

### 架构

- `/components`
  - `/editor` — 编辑器
    - [x] `/fishing` — 小猫钓鱼题
    - [ ] `/cloze` — 完形填空
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
}
```

注：挖空词在 `text` 中以 `<code></code>`包裹，下同（别问为什么是 code【捂脸】）。

#### 完形填空

```ts
export type ClozeData = {
    id: string
    text: string
    type: 'cloze'
    distractors: Record<string, string[]>
}
```
