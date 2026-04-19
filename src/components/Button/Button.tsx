import Link from 'next/link';
import styles from './Button.module.css';

type BaseProps = {
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
  className?: string;
};

type AsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AsLink = BaseProps & { href: string };

type ButtonProps = AsButton | AsLink;

export default function Button({ children, variant = 'filled', className, ...props }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]}${className ? ` ${className}` : ''}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as AsButton & { href?: never };
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
