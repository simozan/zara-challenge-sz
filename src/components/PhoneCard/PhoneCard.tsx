import Link from 'next/link';
import Image from 'next/image';
import { Phone } from '@/types';

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link href={`/phone/${phone.id}`}>
      <div>
        <Image
          src={phone.imageUrl}
          alt={phone.name}
          width={200}
          height={200}
          style={{ objectFit: 'contain', width: '100%', height: '200px' }}
        />
        <p style={{ fontSize: '11px', textTransform: 'uppercase' }}>{phone.brand}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>{phone.name}</strong>
          <span>{phone.basePrice} EUR</span>
        </div>
      </div>
    </Link>
  );
}
