/**
 * 性能監控工具
 * 使用 web-vitals 庫追蹤核心 Web 指標
 */

// 定義性能指標類型
export interface PerformanceMetric {
  name: string;       // 指標名稱
  value: number;      // 指標值
  id: string;         // 唯一識別碼
  delta?: number;     // 變化量
  navigationType?: string; // 導航類型
}

// 性能指標處理函數類型
export type MetricHandler = (metric: PerformanceMetric) => void;

/**
 * 發送性能指標到分析服務
 * 目前僅在控制台輸出，實際應用中可發送到 Google Analytics 或自定義後端
 */
export const sendToAnalytics = (metric: PerformanceMetric): void => {
  // 在控制台輸出性能指標
  console.log(`[Performance Metric] ${metric.name}: ${metric.value}`);
  
  // 實際應用中，可以發送到 Google Analytics 或自定義後端
  // 例如：
  // window.gtag('event', 'web_vitals', {
  //   event_category: 'Web Vitals',
  //   event_action: metric.name,
  //   event_value: Math.round(metric.value),
  //   event_label: metric.id,
  // });
};

/**
 * 初始化性能監控
 * 當 web-vitals 庫加載後調用此函數
 */
export const initPerformanceMonitoring = async (): Promise<void> => {
  try {
    // 動態導入 web-vitals 庫
    const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');
    
    // 註冊各項性能指標監控
    getCLS(sendToAnalytics);  // 累積布局偏移 (Cumulative Layout Shift)
    getFID(sendToAnalytics);  // 首次輸入延遲 (First Input Delay)
    getLCP(sendToAnalytics);  // 最大內容繪製 (Largest Contentful Paint)
    getFCP(sendToAnalytics);  // 首次內容繪製 (First Contentful Paint)
    getTTFB(sendToAnalytics); // 首字節時間 (Time to First Byte)
    
    console.log('[Performance] 性能監控已初始化');
  } catch (error) {
    console.error('[Performance] 初始化性能監控失敗:', error);
  }
};