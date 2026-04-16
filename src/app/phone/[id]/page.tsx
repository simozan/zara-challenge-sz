'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPhoneById, ApiError } from '@/services/api';
import { useLoading } from '@/context/LoadingContext';
import { useCart } from '@/context/CartContext';
import { PhoneDetail, ColorOption, StorageOption } from '@/types';

export default function PhoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const { setLoading } = useLoading();

  const [phone, setPhone] = useState<PhoneDetail | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

  useEffect(() => {
    setLoading(true);
    getPhoneById(id)
      .then((data) => setPhone(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) setIsNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  if (isNotFound) notFound();
  if (!phone) return null;

  const currentImage = selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl ?? '';
  const currentPrice = selectedStorage?.price ?? phone.basePrice;
  const canAdd = selectedColor !== null && selectedStorage !== null;

  const handleAddToCart = () => {
    if (!canAdd || !selectedColor || !selectedStorage) return;
    addItem({
      phoneId: phone.id,
      brand: phone.brand,
      name: phone.name,
      imageUrl: selectedColor.imageUrl,
      storage: selectedStorage.capacity,
      color: selectedColor.name,
      price: selectedStorage.price,
    });
    router.push('/cart');
  };

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/">← BACK</Link>

      <Image
        src={currentImage}
        alt={phone.name}
        width={400}
        height={400}
        style={{ objectFit: 'contain', width: '100%', height: '300px', marginTop: '1rem' }}
      />

      <h1>{phone.name}</h1>
      <p>{phone.brand}</p>
      <p>{selectedStorage ? `${currentPrice} EUR` : `From ${phone.basePrice} EUR`}</p>

      <hr style={{ margin: '1rem 0' }} />

      <h2>Storage</h2>
      <div
        role="group"
        aria-label="Storage options"
        style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}
      >
        {phone.storageOptions.map((s) => (
          <button
            key={s.capacity}
            onClick={() => setSelectedStorage(s)}
            aria-pressed={selectedStorage?.capacity === s.capacity}
            style={{
              padding: '0.5rem',
              border: selectedStorage?.capacity === s.capacity ? '2px solid black' : '1px solid #ccc',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            {s.capacity}
          </button>
        ))}
      </div>

      <hr style={{ margin: '1rem 0' }} />

      <h2>Color</h2>
      <div
        role="group"
        aria-label="Color options"
        style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}
      >
        {phone.colorOptions.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedColor(c)}
            aria-label={c.name}
            aria-pressed={selectedColor?.name === c.name}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: c.hexCode,
              border: selectedColor?.name === c.name ? '2px solid black' : '1px solid #ccc',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
      {selectedColor && (
        <p style={{ marginTop: '0.25rem', fontSize: '12px' }}>{selectedColor.name}</p>
      )}

      <hr style={{ margin: '1rem 0' }} />

      <button
        onClick={handleAddToCart}
        disabled={!canAdd}
        style={{
          padding: '1rem',
          width: '100%',
          background: canAdd ? 'black' : '#ccc',
          color: 'white',
          cursor: canAdd ? 'pointer' : 'not-allowed',
          border: 'none',
        }}
      >
        ADD TO CART
      </button>

      <hr style={{ margin: '1rem 0' }} />

      <h2>Specifications</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <tbody>
          {(
            [
              ['Screen', phone.specs.screen],
              ['Resolution', phone.specs.resolution],
              ['Processor', phone.specs.processor],
              ['Main camera', phone.specs.mainCamera],
              ['Selfie camera', phone.specs.selfieCamera],
              ['Battery', phone.specs.battery],
              ['OS', phone.specs.os],
              ['Refresh rate', phone.specs.screenRefreshRate],
            ] as [string, string][]
          ).map(([label, value]) => (
            <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem', color: '#888', width: '40%' }}>{label}</td>
              <td style={{ padding: '0.5rem' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: '1rem 0' }} />

      <h2>Similar Products</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {phone.similarProducts.map((p) => (
          <Link key={p.id} href={`/phone/${p.id}`}>
            <div style={{ textAlign: 'center', width: '120px' }}>
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={120}
                height={120}
                style={{ objectFit: 'contain', width: '100%', height: '120px' }}
              />
              <p style={{ fontSize: '11px' }}>{p.brand}</p>
              <p style={{ fontSize: '12px' }}>
                <strong>{p.name}</strong>
              </p>
              <p style={{ fontSize: '12px' }}>{p.basePrice} EUR</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
