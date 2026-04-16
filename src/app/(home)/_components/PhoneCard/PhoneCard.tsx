import Link from 'next/link';
import Image from 'next/image';
import { Phone } from '@/types';
import styles from './PhoneCard.module.css';

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link href={`/phone/${phone.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={phone.imageUrl}
          alt={phone.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className={styles.info}>
        <span className={styles.brand}>{phone.brand}</span>
        <div className={styles.nameRow}>
          <span className={styles.name}>{phone.name}</span>
          <span className={styles.price}>{phone.basePrice} EUR</span>
        </div>
      </div>
    </Link>
  );
}
