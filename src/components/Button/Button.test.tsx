import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Button', () => {
  it('renders a <button> when no href is provided', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders an <a> when href is provided', () => {
    render(<Button href="/home">Go home</Button>);
    const link = screen.getByRole('link', { name: 'Go home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled attribute', async () => {
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies outline variant class', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('outline');
  });

  it('applies filled variant class by default', () => {
    render(<Button>Filled</Button>);
    expect(screen.getByRole('button')).toHaveClass('filled');
  });

  it('forwards extra className', () => {
    render(<Button className="extra">Btn</Button>);
    expect(screen.getByRole('button')).toHaveClass('extra');
  });
});
