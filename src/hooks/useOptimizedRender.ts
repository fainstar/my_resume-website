/**
 * 優化渲染的自定義Hook
 * 提供多種優化React組件渲染的工具函數
 */
import { useRef, useCallback, useEffect, useState, useMemo, DependencyList } from 'react';

/**
 * 使用防抖函數
 * 在指定延遲時間內多次調用只執行最後一次
 * 
 * @param fn 要執行的函數
 * @param delay 延遲時間（毫秒）
 * @returns 防抖處理後的函數
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | null>(null);
  
  // 清除之前的定時器
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);
}

/**
 * 使用節流函數
 * 在指定時間內只執行一次函數
 * 
 * @param fn 要執行的函數
 * @param limit 時間限制（毫秒）
 * @returns 節流處理後的函數
 */
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  const lastRunRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);
  
  // 清除之前的定時器
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - lastRunRef.current;
    
    if (elapsed >= limit) {
      lastRunRef.current = now;
      fn(...args);
    } else if (timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout(() => {
        lastRunRef.current = Date.now();
        timeoutRef.current = null;
        fn(...args);
      }, limit - elapsed);
    }
  }, [fn, limit]);
}

/**
 * 使用記憶化值
 * 只有當依賴項變化時才重新計算值
 * 與 useMemo 類似，但提供更清晰的類型定義和錯誤處理
 * 
 * @param factory 計算值的工廠函數
 * @param deps 依賴項數組
 * @returns 記憶化的值
 */
export function useMemoized<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(() => {
    try {
      return factory();
    } catch (error) {
      console.error('Error in useMemoized:', error);
      throw error;
    }
  }, deps);
}

/**
 * 使用前一個值
 * 保存並返回狀態的前一個值
 * 
 * @param value 當前值
 * @returns 前一個值
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

/**
 * 使用異步狀態
 * 處理異步操作的狀態管理
 * 
 * @param asyncFunction 異步函數
 * @param initialData 初始數據
 * @returns 包含數據、加載狀態和錯誤的對象
 */
export function useAsync<T, P extends any[] = []>(
  asyncFunction: (...params: P) => Promise<T>,
  initialData: T
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = useCallback(async (...params: P) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...params);
      setData(result);
      return result;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);
  
  return { data, loading, error, execute };
}