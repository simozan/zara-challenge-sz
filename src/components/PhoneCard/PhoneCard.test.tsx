import { render, screen } from '@testing-library/react';
import PhoneCard from './PhoneCard';
import { Phone } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockPhone: Phone = {
  id: '42',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 1199,
  imageUrl: '/iphone15.jpg',
};

describe('PhoneCard', () => {
  it('renders phone name', () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  it('renders brand', () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renders price with EUR', () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText('1199 EUR')).toBeInTheDocument();
  });

  it('links to the correct phone detail page', () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/phone/42');
  });

  it('renders image with correct alt text', () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByAltText('iPhone 15')).toBeInTheDocument();
  });
});
