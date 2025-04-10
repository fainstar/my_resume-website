# 組件文檔

本文檔詳細描述了專案中的各個組件，包括其功能、結構、屬性和使用方式。

## 目錄

1. [Section 組件](#section-組件)
2. [Header 組件](#header-組件)
3. [Hero 組件](#hero-組件)
4. [About 組件](#about-組件)
5. [Skills 組件](#skills-組件)
6. [Experience 組件](#experience-組件)
7. [Education 組件](#education-組件)
8. [Achievement 組件](#achievement-組件)
9. [Contact 組件](#contact-組件)
10. [Footer 組件](#footer-組件)
11. [ProfileInfo 組件](#profileinfo-組件)
12. [Blog 組件](#blog-組件)
13. [BlogPost 組件](#blogpost-組件)

## Section 組件

`Section.tsx` 是所有區塊的基礎容器組件，提供統一的佈局和樣式。

### 功能

- 提供統一的區塊容器，包含標題和內容區域
- 根據區塊ID自動設置背景漸變色
- 自動添加對應的圖標到標題前
- 提供一致的間距和響應式佈局

### 屬性

```typescript
interface SectionProps {
  id: string;         // 區塊ID，用於導航和樣式選擇
  title: string;      // 區塊標題
  children: React.ReactNode; // 區塊內容
  backgroundColor?: string; // 可選的背景顏色
}
```

### 使用示例

```tsx
<Section id="skills" title="專業技能" backgroundColor="#fff7e6">
  {/* 區塊內容 */}
</Section>
```

## Header 組件

`Header.tsx` 是網站的頂部導航欄，提供各區塊的快速訪問。

### 功能

- 固定在頁面頂部的導航欄
- 提供各區塊的快速訪問鏈接
- 響應式設計，在移動端自動轉為抽屜菜單
- 滾動時自動高亮當前區塊

### 使用方式

在 `App.tsx` 中引入並放置在頁面頂部。

## Hero 組件

`Hero.tsx` 是網站的首屏區域，提供個人簡介和主要信息。

### 功能

- 展示個人姓名、頭像和簡短介紹
- 提供社交媒體鏈接和聯繫方式
- 包含一個引人注目的背景設計

## About 組件

`About.tsx` 展示個人詳細資訊和自我介紹。

### 功能

- 展示個人基本資訊（姓名、年齡、學歷等）
- 提供詳細的自我介紹文字
- 展示個人標籤和興趣愛好

## Skills 組件

`Skills.tsx` 展示個人專業技能和能力水平。

### 功能

- 將技能分類展示（前端開發、後端開發、基礎設施等）
- 使用星級評分系統顯示技能熟練度
- 使用卡片佈局，懸停時有動畫效果

### 數據結構

```typescript
interface Skill {
  name: string;  // 技能名稱
  level: string; // 技能水平（專精、普通、初學）
}

interface SkillCategory {
  title: string; // 分類標題
  skills: Skill[]; // 該分類下的技能列表
}
```

### 樣式常量

組件使用了以下樣式常量來保持一致性：

- `CARD_HEAD_STYLE`: 卡片標題樣式
- `TAG_STYLE`: 技能標籤樣式
- `SKILL_ITEM_STYLE`: 技能項目樣式
- `SKILLS_CONTAINER_STYLE`: 技能列表容器樣式

## Experience 組件

`Experience.tsx` 展示工作經驗和專業背景。

### 功能

- 按時間順序展示工作經歷
- 包含公司名稱、職位、時間段和工作描述
- 使用卡片佈局，懸停時有動畫效果

### 數據結構

```typescript
interface Experience {
  company: string;     // 公司名稱
  position: string;    // 職位
  period: string;      // 工作時間段
  description: string[]; // 工作描述（多條）
}
```

## Education 組件

`Education.tsx` 展示教育背景和學術成就。

### 功能

- 展示學校、專業、學位和時間段
- 可包含課程、成績和學術成就
- 使用卡片佈局，懸停時有動畫效果

## Achievement 組件

`Achievement.tsx` 展示個人競賽成就和獎項。

### 功能

- 展示競賽名稱、獎項和獲獎時間
- 使用獎杯圖標和動畫效果突出顯示
- 使用卡片佈局，懸停時有動畫效果

### 數據結構

```typescript
interface Achievement {
  date: string;   // 獲獎日期
  title: string;  // 競賽名稱
  award: string;  // 獎項
}
```

## Contact 組件

`Contact.tsx` 提供聯繫表單和聯繫信息。

### 功能

- 提供聯繫表單，包括姓名、電子郵件、主題和消息
- 展示聯繫信息，如電子郵件和電話號碼
- 表單驗證和提交功能
- 集成社交媒體鏈接，包括 GitHub 和 Instagram
- 支持表單提交到 Google 表單
- 提供表單提交狀態的反饋模態框

### 屬性

```typescript
interface ContactProps {
  id: string; // 區塊ID，用於導航
}
```

### 使用示例

```tsx
<Contact id="contact" />
```

## Footer 組件

`Footer.tsx` 是網站的底部區域，提供版權信息和其他鏈接。

### 功能

- 顯示版權信息
- 提供社交媒體鏈接
- 提供網站地圖和其他重要鏈接

## ProfileInfo 組件

`ProfileInfo.tsx` 是一個用於展示個人基本資訊的組件，包括頭像、姓名、電子郵件和電話號碼。

### 功能

- 展示個人頭像，支持自定義大小和樣式
- 顯示姓名、電子郵件和電話號碼等聯絡資訊
- 提供統一的樣式和排版

### 屬性

```typescript
interface ProfileInfoProps {
  name: string;       // 姓名
  avatar: string;     // 頭像圖片路徑
  email?: string;     // 可選的電子郵件
  phone?: string;     // 可選的電話號碼
}
```

### 使用示例

```tsx
<ProfileInfo 
  name="王小明" 
  avatar="/path/to/avatar.jpg" 
  email="example@mail.com" 
  phone="0912345678" 
/>
```

## Blog 組件

`Blog.tsx` 是一個用於展示和管理部落格文章的組件，支持文章的創建、編輯、刪除和查看。

### 功能

- 展示部落格文章列表，包括標題、摘要和發布日期
- 提供文章的創建、編輯和刪除功能
- 集成 ReactQuill 富文本編輯器，支持格式化文本、插入圖片等
- 支持文章的密碼保護功能
- 提供文章分類和標籤功能

### 屬性

```typescript
interface BlogProps {
  onBack: () => void; // 返回上一頁的回調函數
}
```

### 使用示例

```tsx
<Blog onBack={() => navigate('/')} />
```

## BlogPost 組件

`BlogPost.tsx` 是用於展示單篇部落格文章的組件，支持文章內容的渲染和密碼保護功能。

### 功能

- 展示文章的標題、內容、發布日期和作者
- 支持富文本內容的渲染
- 提供返回部落格列表的功能
- 支持密碼保護的文章訪問控制

### 使用示例

```tsx
<BlogPost /> // 通常通過路由參數獲取文章ID
```