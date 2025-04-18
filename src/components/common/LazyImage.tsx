import React, { useState, useEffect, useRef } from 'react';
import { Spin } from 'antd';

interface LazyImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  placeholderSrc?: string;
  threshold?: number; // 可見性閾值，範圍 0-1
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 懶加載圖片組件
 * 使用 Intersection Observer API 實現圖片懶加載
 * 支援響應式圖片 (srcSet, sizes)
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  className,
  style,
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=',
  threshold = 0.1,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 設置 Intersection Observer 監聽元素可見性
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // 處理圖片加載完成
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // 處理圖片加載錯誤
  const handleError = () => {
    setIsError(true);
    
    // 使用預設圖片替換原始圖片
    if (imgRef.current && placeholderSrc) {
      // 創建一個新的圖片元素
      const errorImg = document.createElement('img');
      errorImg.src = placeholderSrc;
      errorImg.alt = alt;
      errorImg.style.width = '100%';
      errorImg.style.height = '100%';
      errorImg.style.objectFit = 'cover';
      errorImg.style.position = 'absolute';
      errorImg.style.top = '0';
      errorImg.style.left = '0';
      
      // 移除之前的錯誤顯示和舊圖片
      const errorDiv = imgRef.current.querySelector('div[style*="color: #ff4d4f"]');
      if (errorDiv) {
        errorDiv.remove();
      }
      
      // 清除之前可能存在的預設圖片
      const existingErrorImg = imgRef.current.querySelector('img[style*="position: absolute"]');
      if (existingErrorImg) {
        existingErrorImg.remove();
      }
      
      // 添加預設圖片
      imgRef.current.appendChild(errorImg);
    }
    
    // 調用外部錯誤處理函數
    onError?.();
  };

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
        background: '#f5f5f5',
        display: 'inline-block',
        ...style,
      }}
    >
      {!isLoaded && !isError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f5f5',
          }}
        >
          <Spin size="small" />
        </div>
      )}

      {/* 顯示佔位圖 */}
      {!isLoaded && (
        <img
          src={placeholderSrc}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isVisible ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* 實際圖片，僅在元素可見時加載 */}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* 顯示錯誤狀態 */}
      {isError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f5f5',
            color: '#ff4d4f',
            fontSize: '12px',
          }}
        >
          圖片加載失敗
        </div>
      )}
    </div>
  );
};

export default LazyImage;