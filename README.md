# 圖片牆 Image Gallery 切版專案

這是一個使用 [Next.js](https://nextjs.org) 開發的 Image Gallery 介面切版專案。

### 專案目標
- 提供一個可自適應不同圖片比例的畫廊排版方案
- 保持畫面整齊美觀，無論圖片尺寸如何

## 成品畫面

![成品畫面](./demo/image.png)

## 流程圖

```
原始資料 (images)
  ↓
1️⃣ 加載圖片尺寸 (addImageProcess)
  ↓
2️⃣ 計算圖片比例 (width / height)
  ↓
3️⃣ 計算相對寬度 (justifyScale * ratio)
  ↓
4️⃣ 計算排列樣式 (width: galleryWidth, flexGrow)
  ↓
完成圖片項 (setMapList) ✅
```

## 開始使用

首先，安裝相依套件：

```bash
npm install
```

然後啟動開發伺服器：

```bash
npm run dev
```

在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 即可看到結果。

## 技術棧

- **框架**: Next.js 15
- **語言**: TypeScript
- **樣式**: Tailwind CSS

## 專案結構

```
src/
  app/
    layout.tsx    # 主要佈局
    page.tsx      # 首頁
    globals.css   # 全域樣式
```

## 開發指南

頁面檔案位於 `src/app/` 目錄下，修改後會自動重新載入。