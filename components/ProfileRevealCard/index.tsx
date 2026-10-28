"use client";

import React, { useState, useRef, useCallback } from 'react';

export interface ProfileRevealCardTheme {
  /** 底图背景色 */
  background: string;
  /** 底图文字颜色 */
  color: string;
  /** 光圈渐变背景 */
  overlay: string;
}

export interface ProfileRevealCardProps {
  /** 默认状态显示的主文字 */
  baseText: string;
  /** 默认状态光圈内显示的文字 */
  overlayText: string;
  /** 默认状态主文字的额外类名 */
  baseTextClassName?: string;
  /** 默认状态主题色 */
  baseTheme?: ProfileRevealCardTheme;
  /** 默认状态下提示语 */
  hintToOverlay?: string;
  /** 自定义根节点类名 */
  className?: string;
  /** 自定义根节点样式 */
  style?: React.CSSProperties;
}

const defaultBaseTheme: ProfileRevealCardTheme = {
  background: 'transparent',
  color: 'rgb(23, 30, 46)',
  overlay: 'transparent',
};

export default function ProfileRevealCard({
  baseText,
  overlayText,
  baseTextClassName = '',
  baseTheme = defaultBaseTheme,
  hintToOverlay = '',
  className = '',
  style,
}: ProfileRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 鼠标是否位于卡片内
  const [isInside, setIsInside] = useState(false);

  // 统一控制放大镜半径，底层遮罩和上层光圈共用同一个尺寸
  const magnifierRadius = '48px';

  // 双击切换中英文：交换底层与光圈层文案
  const [swapped, setSwapped] = useState(false);

  // 当前主题与文案
  const currentTheme = baseTheme;
  const currentBaseText = swapped ? overlayText : baseText;
  const currentOverlayText = swapped ? baseText : overlayText;

  // 直接更新 CSS 变量，避免鼠标移动触发 React 重渲染
  const updatePointer = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updatePointer(e);
      setIsInside(true);
    },
    [updatePointer]
  );

  const toggleLanguage = useCallback(() => {
    setSwapped((value) => !value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLanguage();
      }
    },
    [toggleLanguage]
  );

  const cssVariables = {
    '--profile-base-bg': currentTheme.background,
    '--profile-base-color': currentTheme.color,
    '--profile-overlay-bg': currentTheme.overlay,
    '--profile-magnifier-radius': magnifierRadius,
  };

  return (
    <div
      className={`profile-reveal-card ${className}`}
      ref={cardRef}
      style={{ ...cssVariables, ...style } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-label="切换中英文"
      onMouseMove={updatePointer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsInside(false)}
      onDoubleClick={toggleLanguage}
      onKeyDown={handleKeyDown}
    >
      {/* 底层文字 */}
      <div
        className={`profile-reveal-card__base ${isInside ? 'active' : ''}`}
      >
        <p className={baseTextClassName}>{currentBaseText}</p>
      </div>

      {/* 上层文字：通过 clip-path 圆形蒙版显示 */}
      <div
        className={`profile-reveal-card__overlay ${isInside ? 'active' : ''}`}
      >
        <p>{currentOverlayText}</p>
      </div>

      {/* 跟随鼠标的圆形光标环 */}
      {isInside && <div className="profile-reveal-card__cursor" />}

      {/* 当前操作提示 */}
      <div className="profile-reveal-card__hint">
        {hintToOverlay}
      </div>
    </div>
  );
}
