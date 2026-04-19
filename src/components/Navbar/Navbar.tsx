'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLoading } from '@/context/LoadingContext';
import Logo from '@/assets/icons/logo.svg';
import CartIcon from '@/assets/icons/cart.svg';
import CartIconFilled from '@/assets/icons/Black bag icon.svg';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { loading } = useLoading();

  return (
    <nav className={styles.nav} role="banner">
      <Link href="/" className={styles.logo} aria-label="Go to home">
        <Logo aria-hidden="true" />
      </Link>
      <Link
        href="/cart"
        className={styles.cartLink}
        aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart, 0 items'}
      >
        {itemCount > 0 ? <CartIconFilled aria-hidden="true" /> : <CartIcon aria-hidden="true" />}
        <span className={styles.cartCount}>{itemCount}</span>
      </Link>
      {loading && (
        <div className={styles.loadingTrack}>
          <div className={styles.loadingBar} />
        </div>
      )}
    </nav>
  );
}
