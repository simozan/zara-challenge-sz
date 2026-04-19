'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button/Button';
import styles from './page.module.css';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>CART ({items.length})</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.cartItemId} className={styles.item}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={160}
                height={198}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.variant}>{item.storage} | {item.color}</span>
              <span className={styles.price}>{item.price} EUR</span>
              <button
                className={styles.delete}
                onClick={() => removeItem(item.cartItemId)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <Button variant="outline" href="/" className={styles.continueBtn}>Continue shopping</Button>
        {items.length > 0 && (
          <div className={styles.total}>
            <span>TOTAL</span>
            <span>{total} EUR</span>
          </div>
        )}
        {items.length > 0 && (
          <Button variant="filled" className={styles.payBtn}>Pay</Button>
        )}
      </div>
    </main>
  );
}
