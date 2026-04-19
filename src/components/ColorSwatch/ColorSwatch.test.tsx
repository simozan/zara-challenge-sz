import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorSwatch from './ColorSwatch';
import { ColorOption } from '@/types';

const red: ColorOption = { name: 'Red', hexCode: '#ff0000', imageUrl: '/red.jpg' };

describe('ColorSwatch', () => {
  it('renders a button with aria-label from color name', () => {
    render(<ColorSwatch color={red} isSelected={false} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Red' })).toBeInTheDocument();
  });

  it('sets aria-pressed to false when not selected', () => {
    render(<ColorSwatch color={red} isSelected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('sets aria-pressed to true when selected', () => {
    render(<ColorSwatch color={red} isSelected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies selected class when isSelected', () => {
    render(<ColorSwatch color={red} isSelected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('selected');
  });

  it('does not apply selected class when not selected', () => {
    render(<ColorSwatch color={red} isSelected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).not.toHaveClass('selected');
  });

  it('sets background color from hexCode', () => {
    render(<ColorSwatch color={red} isSelected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<ColorSwatch color={red} isSelected={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
