'use client';

import { useEffect, useRef } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import { ColorOption } from '@/types';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
  filterOpen: boolean;
  onFilterToggle: () => void;
  availableColors: ColorOption[];
  selectedColor: string | null;
  onColorSelect: (hexCode: string | null) => void;
}

export default function SearchBar({
  value,
  onChange,
  count,
  filterOpen,
  onFilterToggle,
  availableColors,
  selectedColor,
  onColorSelect,
}: SearchBarProps) {
  const filterAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (filterAreaRef.current && !filterAreaRef.current.contains(e.target as Node)) {
        onFilterToggle();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen, onFilterToggle]);

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
        <div className={styles.filterArea} ref={filterAreaRef}>
          <button
            className={styles.filterButton}
            onClick={onFilterToggle}
            aria-label="Filter by color"
            aria-expanded={filterOpen}
          >
            FILTER{selectedColor ? ' (1)' : ''}
          </button>
          {selectedColor && (
            <button
              className={styles.clearFilter}
              onClick={() => onColorSelect(null)}
              aria-label="Clear color filter"
            >
              <CloseIcon width={14} height={14} />
            </button>
          )}
          {filterOpen && (
            <div className={styles.popover} role="group" aria-label="Color filter options">
              {availableColors.map((color) => (
                <button
                  key={color.hexCode}
                  className={`${styles.swatch} ${selectedColor === color.hexCode ? styles.swatchSelected : ''}`}
                  style={{ backgroundColor: color.hexCode }}
                  onClick={() => onColorSelect(selectedColor === color.hexCode ? null : color.hexCode)}
                  aria-label={color.name}
                  aria-pressed={selectedColor === color.hexCode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
