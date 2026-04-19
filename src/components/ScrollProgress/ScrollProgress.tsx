'use client';

import { useEffect, useState, RefObject } from 'react';
import styles from './ScrollProgress.module.css';

interface Props {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollProgress({ scrollRef }: Props) {
  const [thumbPct, setThumbPct] = useState(100);
  const [leftPct, setLeftPct] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollWidth <= clientWidth) {
        setThumbPct(100);
        setLeftPct(0);
        return;
      }
      const thumb = (clientWidth / scrollWidth) * 100;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setThumbPct(thumb);
      setLeftPct(progress * (100 - thumb));
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollRef]);

  return (
    <div className={styles.track}>
      <div
        className={styles.thumb}
        style={{ width: `${thumbPct}%`, left: `${leftPct}%` }}
      />
    </div>
  );
}
