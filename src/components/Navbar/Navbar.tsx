'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #e0e0e0',
        background: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.1em' }}>
        MBST
      </Link>

      <Link
        href="/cart"
        style={{ position: 'relative', fontSize: '1.2rem' }}
        aria-label={itemCount > 0 ? `Cart (${itemCount} items)` : 'Cart'}
      >
        🛒
        {itemCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              background: 'black',
              color: 'white',
              borderRadius: '50%',
              fontSize: '10px',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
