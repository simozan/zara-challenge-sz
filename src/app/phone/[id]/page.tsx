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
import styles from './page.module.css';

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

  const specs: [string, string][] = [
    ['Brand', phone.brand],
    ['Name', phone.name],
    ['Description', phone.description],
    ['Screen', phone.specs.screen],
    ['Resolution', phone.specs.resolution],
    ['Processor', phone.specs.processor],
    ['Main camera', phone.specs.mainCamera],
    ['Selfie camera', phone.specs.selfieCamera],
    ['Battery', phone.specs.battery],
    ['OS', phone.specs.os],
    ['Screen refresh rate', phone.specs.screenRefreshRate],
  ];

  return (
    <main>
      <div className={styles.container}>

        <div className={styles.hero}>
          <Link href="/" className={styles.back}>
            ‹ BACK
          </Link>

          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <Image
                src={currentImage}
                alt={phone.name}
                width={400}
                height={400}
                className={styles.image}
              />
            </div>

            <div className={styles.productInfo}>
              <div className={styles.nameBlock}>
                <h1 className={styles.name}>{phone.name}</h1>
                <p className={styles.price}>
                  {selectedStorage ? `${currentPrice} EUR` : `From ${phone.basePrice} EUR`}
                </p>
              </div>

              <div>
                <p className={styles.sectionLabel}>Storage ¿How much space do you need?</p>
                <div role="group" aria-label="Storage options" className={styles.storageOptions}>
                  {phone.storageOptions.map((s) => (
                    <button
                      key={s.capacity}
                      onClick={() => setSelectedStorage(s)}
                      aria-pressed={selectedStorage?.capacity === s.capacity}
                      className={`${styles.storageBtn}${selectedStorage?.capacity === s.capacity ? ` ${styles.storageBtnSelected}` : ''}`}
                    >
                      {s.capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className={styles.sectionLabel}>Color. Pick your favourite.</p>
                <div role="group" aria-label="Color options" className={styles.colorOptions}>
                  {phone.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c.name}
                      aria-pressed={selectedColor?.name === c.name}
                      className={`${styles.colorSwatch}${selectedColor?.name === c.name ? ` ${styles.colorSwatchSelected}` : ''}`}
                      style={{ backgroundColor: c.hexCode }}
                    />
                  ))}
                </div>
                <p className={styles.colorName}>{selectedColor?.name ?? '\u00A0'}</p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!canAdd}
                className={`${styles.addToCart}${canAdd ? ` ${styles.addToCartEnabled}` : ''}`}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        <section className={styles.specsSection}>
          <h2 className={styles.specsTitle}>Specifications</h2>
          <table className={styles.specsTable}>
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label} className={styles.specsRow}>
                  <td className={styles.specsLabel}>{label}</td>
                  <td className={styles.specsValue}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {phone.similarProducts.length > 0 && (
          <section className={styles.similarSection}>
            <h2 className={styles.similarTitle}>Similar Products</h2>
            <div className={styles.similarGrid}>
              {phone.similarProducts.map((p) => (
                <Link key={p.id} href={`/phone/${p.id}`} className={styles.similarCard}>
                  <div className={styles.similarImageWrapper}>
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      width={200}
                      height={200}
                      className={styles.similarImage}
                    />
                  </div>
                  <div className={styles.similarInfo}>
                    <p className={styles.similarBrand}>{p.brand}</p>
                    <p className={styles.similarName}>{p.name}</p>
                    <p className={styles.similarPrice}>{p.basePrice} EUR</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
