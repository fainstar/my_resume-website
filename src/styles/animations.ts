import { keyframes } from '@emotion/react';

export const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const trophyShine = keyframes`
  0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
  50% { transform: scale(1.2) rotate(10deg); filter: brightness(1.3); }
  100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
`;

export const cardHoverEffect = {
  transform: 'translateY(-8px)',
  transition: 'all 0.3s ease-in-out',
};

export const cardStyles = {
  base: {
    background: 'linear-gradient(145deg, #ffffff 0%, var(--card-bg-color) 100%)',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(0)',
    opacity: 1,
    animation: 'slideIn 0.8s ease-out',
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    '&:hover': {
      ...cardHoverEffect,
    },
  },
  experience: {
    '--card-bg-color': '#fff0f6',
    hoverBoxShadow: '0 12px 28px rgba(235, 47, 150, 0.15)',
    hoverBackground: 'linear-gradient(145deg, #ffffff 0%, #ffd6e7 100%)',
  },
  achievement: {
    '--card-bg-color': '#f6ffed',
    hoverBoxShadow: '0 12px 28px rgba(82, 196, 26, 0.15)',
    hoverBackground: 'linear-gradient(145deg, #ffffff 0%, #e6ffe6 100%)',
  },
  skills: {
    '--card-bg-color': '#fff7e6',
    hoverBoxShadow: '0 12px 28px rgba(245, 130, 32, 0.2)',
    hoverBackground: 'linear-gradient(145deg, #ffffff 0%, #fff2e8 100%)',
  },
};