insert into public.countries (slug, name_zh, name_en, flag_emoji, visa_info)
values
  (
    'australia',
    '澳洲',
    'Australia',
    '🇦🇺',
    jsonb_build_object(
      'overview', '澳洲是台灣申請打工度假的熱門選項，工作機會多、資訊量大，適合第一次出國工作旅行的人。',
      'ageRange', '18-30 歲',
      'quota', '通常名額充足，依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認資格與護照效期', '準備簽證申請與財力證明', '安排保險、機票與第一段住宿'),
      'checklist', jsonb_build_array('有效護照', '簽證申請資料', '財力證明', '保險與住宿規劃')
    )
  ),
  (
    'new-zealand',
    '紐西蘭',
    'New Zealand',
    '🇳🇿',
    jsonb_build_object(
      'overview', '紐西蘭生活步調相對穩定，適合想兼顧自然環境、季節工作與旅遊體驗的申請者。',
      'ageRange', '18-30 歲',
      'quota', '依年度配額與官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認年度開放時間', '完成線上申請與付款', '安排入境後的住宿與求職節奏'),
      'checklist', jsonb_build_array('有效護照', '申請帳號', '國際金融卡或信用卡', '保險與住宿規劃')
    )
  ),
  (
    'japan',
    '日本',
    'Japan',
    '🇯🇵',
    jsonb_build_object(
      'overview', '日本距離近、文化熟悉度高，適合偏好都市生活、服務業與語言交換環境的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請資格', '準備履歷與計畫書', '安排住宿、銀行與通訊方案'),
      'checklist', jsonb_build_array('有效護照', '簽證申請文件', '旅遊計畫', '保險與初期生活費')
    )
  ),
  (
    'korea',
    '韓國',
    'South Korea',
    '🇰🇷',
    jsonb_build_object(
      'overview', '韓國適合喜歡都會節奏、語言文化接近性高，並想累積餐飲、零售或內容產業經驗的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請年度資訊', '準備申請文件與財力證明', '安排住宿與語言環境'),
      'checklist', jsonb_build_array('有效護照', '財力證明', '保險', '住宿與通訊規劃')
    )
  ),
  (
    'canada',
    '加拿大',
    'Canada',
    '🇨🇦',
    jsonb_build_object(
      'overview', '加拿大偏向生活品質與戶外活動兼具，適合重視語言環境與長期職涯探索的人。',
      'ageRange', '18-30 歲',
      'quota', '依 IEC 配額與邀請制公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('建立 IEC 帳號', '等待邀請並完成申請', '規劃入境與第一份工作搜尋'),
      'checklist', jsonb_build_array('有效護照', 'IEC 帳號', '財力證明', '保險與住宿規劃')
    )
  ),
  (
    'uk',
    '英國',
    'United Kingdom',
    '🇬🇧',
    jsonb_build_object(
      'overview', '英國 YMS 適合想體驗歐洲生活圈與都市工作節奏的人，倫敦外城市也有不少機會。',
      'ageRange', '18-30 歲',
      'quota', '依官方抽籤或公告為準',
      'stayDuration', '24 個月',
      'estimatedBudget', '15-20 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認年度抽籤規則', '完成線上申請與預約', '安排住宿、銀行與交通卡'),
      'checklist', jsonb_build_array('有效護照', '抽籤或申請資料', '財力證明', '住宿與保險規劃')
    )
  ),
  (
    'ireland',
    '愛爾蘭',
    'Ireland',
    '🇮🇪',
    jsonb_build_object(
      'overview', '愛爾蘭適合想進入英語環境、生活節奏相對溫和，並兼顧歐洲移動性的申請者。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請窗口', '準備申請與補件資料', '安排入境後住宿與求職節奏'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '保險', '初期生活費')
    )
  ),
  (
    'france',
    '法國',
    'France',
    '🇫🇷',
    jsonb_build_object(
      'overview', '法國適合對文化、設計、餐飲與歐洲移動生活感興趣的人，語言準備會很有幫助。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請資格', '準備簽證文件', '規劃住宿與基本法語溝通'),
      'checklist', jsonb_build_array('有效護照', '簽證申請資料', '住宿規劃', '保險')
    )
  ),
  (
    'germany',
    '德國',
    'Germany',
    '🇩🇪',
    jsonb_build_object(
      'overview', '德國適合重視制度與城市資源的人，若有語言或專業背景，求職彈性通常更高。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請條件', '準備申請與財力資料', '安排住宿、保險與城市落地事項'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '財力證明', '保險與住宿規劃')
    )
  ),
  (
    'belgium',
    '比利時',
    'Belgium',
    '🇧🇪',
    jsonb_build_object(
      'overview', '比利時生活圈連接歐洲多國，適合想要小國移動便利與多語環境的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請窗口', '準備申請文件', '規劃住宿與跨城市移動方式'),
      'checklist', jsonb_build_array('有效護照', '簽證申請資料', '保險', '住宿規劃')
    )
  ),
  (
    'netherlands',
    '荷蘭',
    'Netherlands',
    '🇳🇱',
    jsonb_build_object(
      'overview', '荷蘭適合偏好國際化職場、英語溝通環境與設計感生活方式的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請資格', '準備簽證資料', '規劃住房與交通卡使用'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '財力證明', '保險與住宿規劃')
    )
  ),
  (
    'luxembourg',
    '盧森堡',
    'Luxembourg',
    '🇱🇺',
    jsonb_build_object(
      'overview', '盧森堡規模小但生活品質高，適合想體驗跨國通勤與多語環境的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請條件', '整理簽證資料', '安排住宿與跨境移動規劃'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '保險', '初期生活費')
    )
  ),
  (
    'austria',
    '奧地利',
    'Austria',
    '🇦🇹',
    jsonb_build_object(
      'overview', '奧地利適合喜歡歐洲生活節奏、文化活動與山城自然環境並重的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請資訊', '準備申請與財力文件', '安排住宿與保險'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '財力證明', '保險與住宿規劃')
    )
  ),
  (
    'czechia',
    '捷克',
    'Czechia',
    '🇨🇿',
    jsonb_build_object(
      'overview', '捷克適合預算敏感、想體驗中歐城市生活與文化氛圍的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請資格', '準備簽證資料', '安排住宿與交通方案'),
      'checklist', jsonb_build_array('有效護照', '簽證申請資料', '保險', '住宿規劃')
    )
  ),
  (
    'slovakia',
    '斯洛伐克',
    'Slovakia',
    '🇸🇰',
    jsonb_build_object(
      'overview', '斯洛伐克資訊量相對少，但適合想探索新市場與中東歐移動生活的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請窗口', '準備申請資料', '安排住宿與初期移動規劃'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '保險', '初期生活費')
    )
  ),
  (
    'hungary',
    '匈牙利',
    'Hungary',
    '🇭🇺',
    jsonb_build_object(
      'overview', '匈牙利適合想在歐洲低一些的生活成本下，先累積海外生活經驗的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請條件', '準備簽證與財力資料', '安排住宿與基礎生活設定'),
      'checklist', jsonb_build_array('有效護照', '申請文件', '財力證明', '保險')
    )
  ),
  (
    'poland',
    '波蘭',
    'Poland',
    '🇵🇱',
    jsonb_build_object(
      'overview', '波蘭適合想進入中東歐市場、生活成本較可控，並兼顧城市與旅行的人。',
      'ageRange', '18-30 歲',
      'quota', '依官方公告為準',
      'stayDuration', '12 個月',
      'estimatedBudget', '12-18 萬台幣',
      'processingTime', '2-8 週',
      'steps', jsonb_build_array('確認申請年度資訊', '完成簽證資料準備', '安排住宿與交通動線'),
      'checklist', jsonb_build_array('有效護照', '簽證申請資料', '保險', '住宿規劃')
    )
  )
on conflict (slug) do update set
  name_zh = excluded.name_zh,
  name_en = excluded.name_en,
  flag_emoji = excluded.flag_emoji,
  visa_info = excluded.visa_info;
