import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LoadingProvider } from '@/context/LoadingContext';
import Navbar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'MBST | Smartphones',
  description: 'Smartphone catalog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <LoadingProvider>
            <Navbar />
            {children}
          </LoadingProvider>
        </CartProvider>
      </body>
    </html>
  );
}
