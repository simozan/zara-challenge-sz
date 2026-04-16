'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone } from '@/types';
import { getPhones } from '@/services/api';
import { useLoading } from '@/context/LoadingContext';
import SearchBar from './_components/SearchBar/SearchBar';
import PhoneCard from './_components/PhoneCard/PhoneCard';
import styles from './page.module.css';

export default function HomePage() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [search, setSearch] = useState('');
  const { setLoading } = useLoading();

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
    if (search === '') {
      fetchPhones('');
      return;
    }
    const timer = setTimeout(() => {
      fetchPhones(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchPhones]);

  const tabletCols = Math.max(1, Math.min(phones.length, 2));
  const desktopCols = Math.max(1, Math.min(phones.length, 5));

  return (
    <>
      <SearchBar value={search} onChange={setSearch} count={phones.length} />
      {phones.length > 0 && (
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
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
