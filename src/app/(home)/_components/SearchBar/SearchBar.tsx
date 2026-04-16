'use client';

import CloseIcon from '@/assets/icons/close.svg';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

export default function SearchBar({ value, onChange, count }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputFrame}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search for a smartphone..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <CloseIcon width={20} height={19} />
          </button>
        )}
      </div>
      <div className={styles.meta}>
        <p className={styles.results}>{count} RESULTS</p>
        <button className={styles.filterButton} aria-label="Filter by color">
          FILTER
        </button>
      </div>
    </div>
  );
}
