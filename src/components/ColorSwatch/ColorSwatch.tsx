import { ColorOption } from '@/types';
import styles from './ColorSwatch.module.css';

interface Props {
  color: ColorOption;
  isSelected: boolean;
  onClick: () => void;
}

export default function ColorSwatch({ color, isSelected, onClick }: Props) {
  return (
    <button
      data-swatch
      data-name={color.name}
      onClick={onClick}
      aria-label={color.name}
      aria-pressed={isSelected}
      className={`${styles.swatch}${isSelected ? ` ${styles.selected}` : ''}`}
      style={{ backgroundColor: color.hexCode }}
    />
  );
}
