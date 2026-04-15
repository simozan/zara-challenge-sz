'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone } from '@/types';
import { getPhones } from '@/services/api';
import PhoneCard from '@/components/PhoneCard/PhoneCard';

interface PhoneListProps {
  initialPhones: Phone[];
}

export default function PhoneList({ initialPhones }: PhoneListProps) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPhones = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const results = await getPhones(searchTerm || undefined);
      setPhones(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPhones(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchPhones]);

  return (
    <main style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search for a smartphone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <p>{phones.length} RESULTS</p>
      {loading && <p>Loading...</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </main>
  );
}
