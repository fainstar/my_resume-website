import React from 'react';

// 按鈕類型定義
export type ButtonType = 'default' | 'primary' | 'link';

/**
 * 獲取通用按鈕樣式
 * @param type 按鈕類型：default, primary, link
 * @param isActive 是否處於激活狀態
 * @returns 按鈕樣式對象
 */
export const getButtonStyle = (type: ButtonType = 'default', isActive: boolean = false) => {
  const baseStyle = {
    fontSize: '16px',
    padding: '8px 24px',
    transition: 'all 0.3s',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  if (type === 'primary' || isActive) {
    return {
      ...baseStyle,
      background: 'linear-gradient(145deg, #4a6bff 0%, #2b4bdf 100%)',
      border: 'none',
      boxShadow: '0 4px 12px rgba(74, 107, 255, 0.25)',
      color: '#fff'
    };
  }

  if (type === 'link') {
    return {
      ...baseStyle,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      color: '#4a6bff',
      padding: '8px 16px',
    };
  }

  return {
    ...baseStyle,
    background: '#fff',
    border: '1px solid #d9d9d9',
    boxShadow: 'none',
    color: 'rgba(0, 0, 0, 0.88)'
  };
};

/**
 * 按鈕懸停效果
 * @param element HTML元素
 * @param isActive 是否處於激活狀態
 */
export const getHoverEffects = (element: HTMLElement, isActive: boolean = false) => {
  if (isActive) return;
  
  element.style.background = '#f0f2ff';
  element.style.borderColor = '#4a6bff';
  element.style.color = '#4a6bff';
};

/**
 * 按鈕離開效果
 * @param element HTML元素
 * @param isActive 是否處於激活狀態
 */
export const getLeaveEffects = (element: HTMLElement, isActive: boolean = false) => {
  if (isActive) return;
  
  element.style.background = '#fff';
  element.style.borderColor = '#d9d9d9';
  element.style.color = 'rgba(0, 0, 0, 0.88)';
};