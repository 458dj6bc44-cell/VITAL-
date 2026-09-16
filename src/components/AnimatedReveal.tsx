import React, { useEffect, useRef, useState } from 'react';

interface AnimatedRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'blur-sharp';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  id?: string;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.12,
  className = '',
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            opacity: 0,
            transform: 'translateY(28px)',
            transition: baseTransition
          };
        case 'slide-left':
          return {
            opacity: 0,
            transform: 'translateX(-32px)',
            transition: baseTransition
          };
        case 'slide-right':
          return {
            opacity: 0,
            transform: 'translateX(32px)',
            transition: baseTransition
          };
        case 'scale-up':
          return {
            opacity: 0,
            transform: 'scale(0.92)',
            transition: baseTransition
          };
        case 'blur-sharp':
          return {
            opacity: 0,
            filter: 'blur(8px)',
            transform: 'translateY(16px)',
            transition: baseTransition
          };
        case 'fade-in':
        default:
          return {
            opacity: 0,
            transition: baseTransition
          };
      }
    }

    return {
      opacity: 1,
      transform: 'none',
      filter: 'none',
      transition: baseTransition
    };
  };

  return (
    <div
      id={id}
      ref={elementRef}
      style={getAnimationStyles()}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </div>
  );
};
