'use client';

import CloseIcon from '@/assets/icons/close.svg';
import { ColorOption } from '@/types';
import ColorSwatch from '@/components/ColorSwatch/ColorSwatch';
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
        {filterOpen ? (
          <>
            <div
              className={styles.swatches}
              role="group"
              aria-label="Color filter options"
            >
              {availableColors.map((color) => (
                <ColorSwatch
                  key={color.hexCode}
                  color={color}
                  isSelected={selectedColor === color.hexCode}
                  onClick={() =>
                    onColorSelect(selectedColor === color.hexCode ? null : color.hexCode)
                  }
                />
              ))}
            </div>
            <button
              className={styles.cerrarButton}
              onClick={onFilterToggle}
              aria-label="Close color filter"
            >
              CLOSE
            </button>
          </>
        ) : (
          <>
            <p className={styles.results}>{count} RESULTS</p>
            <div className={styles.filterArea}>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
