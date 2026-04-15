'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>CART ({items.length})</h1>

      {items.length === 0 ? (
        <p style={{ margin: '2rem 0', color: '#888' }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            {items.map((item) => (
              <li
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  borderBottom: '1px solid #eee',
                  padding: '0.75rem 0',
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ objectFit: 'contain', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
                    {item.storage} · {item.color}
                  </p>
                  <p style={{ margin: 0 }}>{item.price} EUR</p>
                </div>
                <button
                  onClick={() => removeItem(item.cartItemId)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: 'bold', textAlign: 'right' }}>Total: {total} EUR</p>
        </>
      )}

      <Link
        href="/"
        style={{
          display: 'block',
          padding: '1rem',
          width: '100%',
          marginTop: '1rem',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        CONTINUE SHOPPING
      </Link>
    </main>
  );
}
