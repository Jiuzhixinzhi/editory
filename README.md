## 名字没想好

> ```
> npm install
> npm run dev
> ```

### 架构

- `/components`
  - `/editor` — 编辑器
    - `/fishing` — 小猫钓鱼题型（哈哈）
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
    distractor: string[]
}
```

注：挖空词在 `text` 中以 `<code></code>`包裹（别问为什么是 code【捂脸】）。
