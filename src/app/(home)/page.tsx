'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Phone, PhoneDetail, ColorOption } from '@/types';
import { getPhones, getPhoneById } from '@/services/api';
import { normalizeHex, getHue } from '@/utils/color';
import { useLoading } from '@/context/LoadingContext';
import SearchBar from './_components/SearchBar/SearchBar';
import PhoneCard from './_components/PhoneCard/PhoneCard';
import styles from './page.module.css';

export default function HomePage() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [search, setSearch] = useState('');
  const { setLoading } = useLoading();

  const [filterOpen, setFilterOpen] = useState(false);
  const [phoneDetails, setPhoneDetails] = useState<Map<string, PhoneDetail>>(new Map());
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const fetchPhones = useCallback(
    async (searchTerm: string) => {
      setLoading(true);
      try {
        const results = await getPhones(searchTerm || undefined);
        setPhones(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  useEffect(() => {
    setFilterOpen(false);
    setSelectedColor(null);
    setPhoneDetails(new Map());

    if (search === '') {
      fetchPhones('');
      return;
    }
    const timer = setTimeout(() => {
      fetchPhones(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchPhones]);

  const handleFilterToggle = useCallback(async () => {
    if (filterOpen) {
      setFilterOpen(false);
      return;
    }

    if (phoneDetails.size > 0) {
      setFilterOpen(true);
      return;
    }

    setLoading(true);
    try {
      const details = await Promise.all(phones.map((p) => getPhoneById(p.id)));
      setPhoneDetails(new Map(details.map((d) => [d.id, d])));
      setFilterOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filterOpen, phoneDetails, phones, setLoading]);

  const availableColors = useMemo<ColorOption[]>(() => {
    const seen = new Set<string>();
    const colors: ColorOption[] = [];
    for (const detail of phoneDetails.values()) {
      for (const color of detail.colorOptions) {
        const normalized = normalizeHex(color.hexCode);
        if (!seen.has(normalized)) {
          seen.add(normalized);
          colors.push({ ...color, hexCode: normalized });
        }
      }
    }

    return colors.sort((a, b) => {
      const hA = getHue(a.hexCode);
      const hB = getHue(b.hexCode);
      if (hA === -1 && hB === -1) return 0;
      if (hA === -1) return 1;
      if (hB === -1) return -1;
      return hA - hB;
    });
  }, [phoneDetails]);

  const displayedPhones = useMemo(() => {
    if (!selectedColor) return phones;
    return phones.filter((p) => {
      const detail = phoneDetails.get(p.id);
      return detail?.colorOptions.some((c) => c.hexCode === selectedColor);
    });
  }, [phones, selectedColor, phoneDetails]);

  const tabletCols = Math.max(1, Math.min(displayedPhones.length, 2));
  const desktopCols = Math.max(1, Math.min(displayedPhones.length, 5));

  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
        count={displayedPhones.length}
        filterOpen={filterOpen}
        onFilterToggle={handleFilterToggle}
        availableColors={availableColors}
        selectedColor={selectedColor}
        onColorSelect={(hexCode) => {
          setSelectedColor(hexCode);
          setFilterOpen(false);
        }}
      />
      {displayedPhones.length > 0 && (
        <div className={styles.listWrapper}>
          <div
            className={styles.list}
            style={
              {
                '--tablet-cols': tabletCols,
                '--desktop-cols': desktopCols,
              } as React.CSSProperties
            }
          >
            {displayedPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
