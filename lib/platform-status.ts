import { getContentMode, shouldUseLiveData } from "@/lib/content-mode"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { hasSupabaseEnv } from "@/lib/supabase"

export type PlatformStatus =
  | { mode: "demo"; message: string }
  | { mode: "live"; message: string }

export async function getPlatformStatus(): Promise<PlatformStatus> {
  const mode = getContentMode()

  if (mode === "mock") {
    return {
      mode: "demo",
      message: "目前是網站 prototype 模式，畫面內容以展示結構、版型與導覽流程為主。",
    }
  }

  if (!hasSupabaseEnv) {
    return {
      mode: "demo",
      message: "目前仍以 prototype 內容顯示；等 Supabase 環境變數補齊後，就能開始嘗試讀取真實資料。",
    }
  }

  try {
    if (!shouldUseLiveData()) {
      return {
        mode: "demo",
        message: "目前維持在 prototype 預覽模式，真實資料尚未強制接入。",
      }
    }

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.from("countries").select("slug").limit(1)

    if (error) {
      return {
        mode: "demo",
        message: "已偵測到 Supabase 連線設定，但資料表或權限尚未完整就緒，因此先回退到 prototype 內容。",
      }
    }

    return {
      mode: "live",
      message: "目前正在讀取 Supabase 的真實資料，prototype 已進入 live 驗證階段。",
    }
  } catch {
    return {
      mode: "demo",
      message: "目前暫時無法取得 Supabase 資料，因此先顯示 prototype 內容，避免影響整體瀏覽。",
    }
  }
}
