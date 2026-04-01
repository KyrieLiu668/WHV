# Mock to Live 切換策略

這個專案目前支援 `mock`、`auto`、`live` 三種內容模式，方便我們先做網站架構，再逐步接上 Supabase。

## 模式說明

### `mock`

- 永遠使用本地 mock data
- 不依賴 Supabase 資料表是否存在
- 最適合前期 prototype、提案展示、UI 巡檢

### `auto`

- 預設模式
- 只要偵測到 Supabase 環境變數存在，就會嘗試讀取 Supabase
- 如果資料表尚未建立、RLS 尚未完成或查詢失敗，會自動 fallback 回 mock data

### `live`

- 強制優先使用 Supabase
- 適合 migration 已完成、準備驗證真實資料流的階段
- 如果資料表不存在或設定未完成，頁面就會直接暴露 live 端的問題，方便排查

## `.env.local` 設定

```env
NEXT_PUBLIC_CONTENT_MODE=mock
```

可用值：

```env
NEXT_PUBLIC_CONTENT_MODE=mock
NEXT_PUBLIC_CONTENT_MODE=auto
NEXT_PUBLIC_CONTENT_MODE=live
```

## 建議使用節奏

### 階段 1：先做網站骨架

```env
NEXT_PUBLIC_CONTENT_MODE=mock
```

適合：

- 首頁、國家頁、文章頁、會員頁先做版型
- 不想被資料庫、Auth、RLS 卡住
- 要快速做 prototype 展示

### 階段 2：開始接真實資料

```env
NEXT_PUBLIC_CONTENT_MODE=auto
```

適合：

- migration 已經開始建立
- 想一邊接資料、一邊保留 fallback
- 希望頁面壞掉時仍能看到 prototype 內容

### 階段 3：正式驗證 live flow

```env
NEXT_PUBLIC_CONTENT_MODE=live
```

適合：

- `countries`、`posts`、`profiles`、`discussions` 都已建立
- 要檢查查詢、Auth、RLS、Realtime 是否真的打到 Supabase

## 目前程式中的切換點

- 模式判斷：[lib/content-mode.ts](/c:/Users/a9986/Downloads/VS%20code/WHV/lib/content-mode.ts)
- 資料讀取：[lib/data.ts](/c:/Users/a9986/Downloads/VS%20code/WHV/lib/data.ts)
- 平台狀態提示：[lib/platform-status.ts](/c:/Users/a9986/Downloads/VS%20code/WHV/lib/platform-status.ts)

## 建議現在怎麼用

如果你目前想先把整站當成前端 prototype 使用，建議直接設：

```env
NEXT_PUBLIC_CONTENT_MODE=mock
```

等你把 migration 跑完，再改成 `auto`；準備驗真實登入、發文、留言和 Realtime 時，再切到 `live`。
