# Supabase SQL Editor 執行順序清單

這份清單是給你在 Supabase Dashboard 的 `SQL Editor` 直接照順序執行用的。

## 執行前確認

1. 已進入正確的 Supabase 專案
2. 左側看到的是你要用的 project：`mkmoralllfcyvcvlknsz`
3. 打開 `SQL Editor`
4. 每跑完一段 SQL，再進下一段

## Step 1: 建立核心資料表

執行這個檔案：

- [`supabase/migrations/20260401_001_core_schema.sql`](/c:/Users/a9986/Downloads/VS%20code/WHV/supabase/migrations/20260401_001_core_schema.sql)

這一步會建立：

- `countries`
- `posts`
- `discussions`
- `profiles`

跑完後可在 `Table Editor` 確認有這 4 張表。

## Step 2: 建立 trigger、index 與 RLS

執行這個檔案：

- [`supabase/migrations/20260401_002_automation_indexes_and_rls.sql`](/c:/Users/a9986/Downloads/VS%20code/WHV/supabase/migrations/20260401_002_automation_indexes_and_rls.sql)

這一步會建立：

- `posts.updated_at` 自動更新 trigger
- 新使用者建立後自動產生 `profiles` 的 trigger
- `posts` / `discussions` / `profiles` 的 index
- `posts` / `discussions` / `profiles` 的 RLS policies

跑完後可確認：

1. `Authentication` 建立新使用者時，理論上會自動建立對應 profile
2. `Database` → `Policies` 裡可以看到新 policy

## Step 3: 建立國家 seed、storage 與 realtime

執行這個檔案：

- [`supabase/migrations/20260401_003_seed_storage_and_realtime.sql`](/c:/Users/a9986/Downloads/VS%20code/WHV/supabase/migrations/20260401_003_seed_storage_and_realtime.sql)

這一步會建立：

- 17 個 `countries` seed
- `avatars`
- `post-images`
- storage policies
- `discussions` realtime publication

跑完後可確認：

1. `countries` 表內已有 17 筆資料
2. `Storage` 裡有 `avatars` 和 `post-images`
3. `Database` → `Replication` 或相關設定裡，`discussions` 已加入 realtime

## 建議的 SQL Editor 實際操作方式

每一步都照下面流程做：

1. 點 `New query`
2. 打開對應 `.sql` 檔
3. 全部複製貼上
4. 按 `Run`
5. 確認沒有紅字錯誤
6. 再進到下一步

## 跑完後的最小驗證

你可以直接在 SQL Editor 執行這幾段檢查：

### 檢查 countries 是否存在

```sql
select slug, name_zh
from public.countries
order by name_zh
limit 5;
```

### 檢查 storage bucket

```sql
select id, name, public
from storage.buckets
where id in ('avatars', 'post-images');
```

### 檢查 discussions 是否已進 realtime publication

```sql
select *
from pg_publication_tables
where pubname = 'supabase_realtime'
  and schemaname = 'public'
  and tablename = 'discussions';
```

## 如果出錯，優先看這些

1. 是否貼到錯的 Supabase project
2. 是否漏跑前一步就先跑後一步
3. `storage.objects` policy 若報錯，先確認 bucket 是否已建立
4. `auth.users` trigger 相關錯誤時，先確認前面的 function 有成功建立

## 跑完後請回我

你只要回我一句：

`SQL Editor 三步都跑完了`

我就可以接著幫你驗：

1. `countries` 是否已從真實 Supabase 讀出
2. 網站是否從 prototype / mock 模式切進真實資料
3. 後續登入、留言、Realtime 是否可繼續測
