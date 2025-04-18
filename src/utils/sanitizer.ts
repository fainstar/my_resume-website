/**
 * 內容安全工具
 * 使用 DOMPurify 庫淨化富文本內容，防止 XSS 攻擊
 */
import DOMPurify from 'dompurify';

/**
 * 配置選項類型
 */
interface SanitizeOptions {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  FORBID_TAGS?: string[];
  FORBID_ATTR?: string[];
  ADD_URI_SAFE_ATTR?: string[];
}

/**
 * 默認的允許標籤
 */
const DEFAULT_ALLOWED_TAGS = [
  'p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
  'hr', 'span', 'div', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

/**
 * 默認的允許屬性
 */
const DEFAULT_ALLOWED_ATTR = [
  'href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style',
  'width', 'height', 'id', 'name'
];

/**
 * 淨化 HTML 內容
 * 移除潛在的惡意代碼，防止 XSS 攻擊
 * 
 * @param html 要淨化的 HTML 字符串
 * @param options 淨化選項
 * @returns 淨化後的安全 HTML 字符串
 */
export const sanitizeHtml = (html: string, options?: SanitizeOptions): string => {
  const sanitizeOptions: SanitizeOptions = {
    ALLOWED_TAGS: options?.ALLOWED_TAGS || DEFAULT_ALLOWED_TAGS,
    ALLOWED_ATTR: options?.ALLOWED_ATTR || DEFAULT_ALLOWED_ATTR,
    ...options
  };

  return DOMPurify.sanitize(html, sanitizeOptions);
};

/**
 * 淨化博客文章內容
 * 使用針對博客內容優化的設置
 * 
 * @param content 博客文章內容
 * @returns 淨化後的安全內容
 */
export const sanitizeBlogContent = (content: string): string => {
  return sanitizeHtml(content, {
    // 博客特定的允許標籤
    ALLOWED_TAGS: [
      ...DEFAULT_ALLOWED_TAGS,
      'iframe', // 允許嵌入視頻
      'figure', 'figcaption' // 允許圖片說明
    ],
    // 博客特定的允許屬性
    ALLOWED_ATTR: [
      ...DEFAULT_ALLOWED_ATTR,
      'frameborder', 'allowfullscreen', // iframe 屬性
      'loading' // 圖片懶加載屬性
    ],
    // 添加安全的 URI 屬性
    ADD_URI_SAFE_ATTR: ['poster', 'data-src']
  });
};