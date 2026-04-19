import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { CartItem } from '@/types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const makeItem = (overrides: Partial<Omit<CartItem, 'cartItemId'>> = {}): Omit<CartItem, 'cartItemId'> => ({
  phoneId: '1',
  brand: 'Samsung',
  name: 'Galaxy S24',
  imageUrl: '/img.jpg',
  storage: '256GB',
  color: 'Black',
  price: 999,
  ...overrides,
});

beforeEach(() => localStorage.clear());

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.itemCount).toBe(0);
    expect(result.current.items).toHaveLength(0);
  });

  it('adds an item and updates itemCount', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addItem(makeItem()); });
    expect(result.current.itemCount).toBe(1);
  });

  it('removes an item by cartItemId', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addItem(makeItem()); });
    const id = result.current.items[0].cartItemId;
    act(() => { result.current.removeItem(id); });
    expect(result.current.itemCount).toBe(0);
  });

  it('can hold multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(makeItem({ color: 'Black' }));
      result.current.addItem(makeItem({ color: 'White' }));
    });
    expect(result.current.itemCount).toBe(2);
  });

  it('only removes the targeted item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(makeItem({ color: 'Black' }));
      result.current.addItem(makeItem({ color: 'White' }));
    });
    const id = result.current.items[0].cartItemId;
    act(() => { result.current.removeItem(id); });
    expect(result.current.itemCount).toBe(1);
    expect(result.current.items[0].color).toBe('White');
  });

  it('persists items to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => { result.current.addItem(makeItem()); });
    const stored = JSON.parse(localStorage.getItem('zara-cart') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Galaxy S24');
  });

  it('throws outside of CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow();
  });
});
