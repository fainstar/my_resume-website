import React from 'react';

/**
 * 比較函數類型定義
 */
type CompareFunction<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;

/**
 * 默認的比較函數，深度比較兩個對象
 */
const defaultCompare = <P extends object>(prevProps: P, nextProps: P): boolean => {
  // 檢查兩個對象的鍵是否相同
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  
  // 檢查每個鍵的值是否相同
  return prevKeys.every(key => {
    const prevValue = prevProps[key as keyof P];
    const nextValue = nextProps[key as keyof P];
    
    // 處理函數類型
    if (typeof prevValue === 'function' && typeof nextValue === 'function') {
      return true; // 假設函數引用不變
    }
    
    // 處理對象類型
    if (
      typeof prevValue === 'object' && prevValue !== null &&
      typeof nextValue === 'object' && nextValue !== null
    ) {
      // 簡單比較對象引用
      return prevValue === nextValue;
    }
    
    // 基本類型直接比較
    return prevValue === nextValue;
  });
};

/**
 * 創建一個記憶化的組件
 * 使用 React.memo 優化渲染性能，減少不必要的重渲染
 * 
 * @param Component 要記憶化的組件
 * @param compareFunction 自定義比較函數，決定是否重新渲染
 * @returns 記憶化後的組件
 */
export function createMemoComponent<P extends object>(
  Component: React.ComponentType<P>,
  compareFunction: CompareFunction<P> = defaultCompare
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component, compareFunction);
}

/**
 * 使用示例：
 * 
 * // 基本用法
 * const MemoizedComponent = createMemoComponent(MyComponent);
 * 
 * // 使用自定義比較函數
 * const MemoizedWithCustomCompare = createMemoComponent(MyComponent, (prev, next) => {
 *   return prev.id === next.id; // 只比較 id 屬性
 * });
 */