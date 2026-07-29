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

const defaultOverlayTheme: ProfileRevealCardTheme = {
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

  // 鼠标在卡片内的坐标
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  // 跟踪鼠标位置，用于移动圆形光圈与光标环
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onDoubleClick={() => setSwapped((s) => !s)}
    >
      {/* 底层文字 */}
      <div
        className={`profile-reveal-card__base ${isInside ? 'active' : ''}`}
        style={{
          '--x': `${mousePos.x}px`,
          '--y': `${mousePos.y}px`,
        } as React.CSSProperties}
      >
        <p className={baseTextClassName}>{currentBaseText}</p>
      </div>

      {/* 上层文字：通过 clip-path 圆形蒙版显示 */}
      <div
        className={`profile-reveal-card__overlay ${isInside ? 'active' : ''}`}
        style={{
          '--x': `${mousePos.x}px`,
          '--y': `${mousePos.y}px`,
        } as React.CSSProperties}
      >
        <p>{currentOverlayText}</p>
      </div>

      {/* 跟随鼠标的圆形光标环 */}
      {isInside && (
        <div
          className="profile-reveal-card__cursor"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* 当前操作提示 */}
      <div className="profile-reveal-card__hint">
        {hintToOverlay}
      </div>
    </div>
  );
}
