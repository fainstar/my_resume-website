# 個人履歷網站

這是一個使用現代前端技術構建的個人履歷網站，提供了一個專業且互動性強的界面來展示個人資訊、專業技能、工作經驗和競賽成就。

## 技術棧

- **前端框架**: React 18 + TypeScript
- **UI 框架**: Ant Design 5 + Material-UI 5
- **樣式解決方案**: Emotion (CSS-in-JS)
- **構建工具**: Vite 6
- **代碼規範**: ESLint
- **編輯器**: React-Quill
- **響應式設計**: React-Responsive

## 快速開始

### 環境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安裝

```bash
# 克隆專案
git clone [your-repository-url]

# 進入專案目錄
cd my-resume-website

# 安裝依賴
npm install
```

### 開發

```bash
# 啟動開發服務器
npm run dev
```

### 構建

```bash
# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 專案結構

```
my-resume-website/
├── src/
│   ├── components/     # 可重用React組件
│   │   ├── Header.tsx  # 頂部導航(狀態管理/滾動交互)
│   │   ├── Section.tsx # 區塊容器(主題整合/動畫控制)
│   │   └── ...
│   ├── theme.ts        # 主題配置樞紐
│   ├── App.tsx         # 組件聚合與路由控制
│   └── styles/         # 全局樣式定義
├── public/             # 靜態資源管理
├── docs/               # 技術文檔系統
└── vite.config.ts      # 構建配置核心
```

主要交互關係：
- App.tsx 聚合所有頁面組件
- Header 與 Section 通過props傳遞滾動定位
- 組件通過theme.ts獲取樣式參數
- 全局樣式通過Emotion注入

```
my-resume-website/
├── public/              # 靜態資源
├── src/
│   ├── assets/         # 項目資源文件
│   ├── components/     # React組件
│   ├── styles/         # 全局樣式
│   ├── App.tsx         # 應用程序入口
│   ├── main.tsx        # 渲染入口
│   └── theme.ts        # 主題配置
├── index.html          # HTML模板
├── package.json        # 項目配置
├── tsconfig.json       # TypeScript配置
└── vite.config.ts      # Vite配置
```

## 主要功能模塊

### 頁首 (Header)
- 智能導航欄，支持平滑滾動
- 響應式設計，適配移動端
- 自動高亮當前區塊

### 關於我 (About)
- 個人基本資訊展示
- 專業技能標籤
- 聯繫方式

### 專業技能 (Skills)
- 技術能力可視化展示
- 分類展示各領域專長
- 技能熟練度評估

### 工作經驗 (Experience)
- 時間軸式展示
- 詳細工作內容描述
- 項目成果展示

### 教育背景 (Education)
- 學歷資訊展示
- 主修課程列表
- 學術成就展示

### 競賽成就 (Achievement)
- 重要競賽經歷
- 獲獎情況展示
- 專案作品展示

### 聯絡資訊 (Contact)
- 聯繫方式展示
- 社交媒體連結

## 開發指南

### 組件開發規範

- 使用TypeScript編寫所有組件
- 遵循函數式組件和Hooks的最佳實踐
- 確保組件的可重用性和可維護性

### 樣式開發

- 使用Emotion進行樣式管理
- 遵循響應式設計原則
- 保持一致的主題風格

### 代碼規範

- 使用ESLint進行代碼檢查
- 遵循TypeScript的嚴格模式
- 保持代碼的清晰和可讀性

## 部署

1. 執行構建命令生成生產版本：
   ```bash
   npm run build
   ```

2. 生產文件將生成在 `dist` 目錄中

3. 將 `dist` 目錄部署到你的Web服務器

## 貢獻指南

1. Fork 本專案
2. 創建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改動 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 版本歷史

- 0.0.0: 初始版本

## 授權

本專案基於 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解更多細節
