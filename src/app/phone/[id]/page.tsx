import { getPhoneById, ApiError } from '@/services/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PhoneDetailClient from '@/components/PhoneDetail/PhoneDetailClient';

interface PhoneDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const { id } = await params;

  let phone;
  try {
    phone = await getPhoneById(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/">← BACK</Link>
      <PhoneDetailClient phone={phone} />

      <hr style={{ margin: '1rem 0' }} />

      <h2>Similar Products</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {phone.similarProducts.map((p) => (
          <Link key={p.id} href={`/phone/${p.id}`}>
            <div style={{ textAlign: 'center', width: '120px' }}>
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={120}
                height={120}
                style={{ objectFit: 'contain', width: '100%', height: '120px' }}
              />
              <p style={{ fontSize: '11px' }}>{p.brand}</p>
              <p style={{ fontSize: '12px' }}><strong>{p.name}</strong></p>
              <p style={{ fontSize: '12px' }}>{p.basePrice} EUR</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
