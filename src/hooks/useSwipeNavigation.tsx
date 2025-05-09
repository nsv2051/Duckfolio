import { useState, useEffect } from 'react';
import { PanInfo } from 'framer-motion';

export function useSwipeNavigation(initialSection = 'profile') {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 处理滑动事件
  const handleDragEnd = (info: PanInfo) => {
    if (!isMobile) return;

    const { offset, velocity } = info;

    const swipeThreshold = 100;
    const velocityThreshold = 0.5;

    const isLeftSwipe =
      offset.x < -swipeThreshold || velocity.x < -velocityThreshold;
    const isRightSwipe =
      offset.x > swipeThreshold || velocity.x > velocityThreshold;

    if (isLeftSwipe && activeSection === 'profile') {
      setActiveSection('links');
    } else if (isRightSwipe && activeSection === 'links') {
      setActiveSection('profile');
    }
  };

  const dragProps = {
    drag: isMobile ? ('x' as const) : false,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    onDragEnd: handleDragEnd,
  };

  return {
    activeSection,
    setActiveSection,
    isMobile,
    dragProps,
  };
}
