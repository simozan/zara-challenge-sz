import { Phone, PhoneDetail } from '@/types';

const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

const headers = {
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function apiFetch<T>(url: string, context: string): Promise<T> {
  const res = await fetch(url, { headers });

  if (!res.ok) {
    if (res.status === 401) {
      throw new ApiError(401, 'Service temporarily unavailable. Please try again later.');
    }
    if (res.status === 404) {
      throw new ApiError(404, context + ' not found.');
    }
    throw new ApiError(res.status, 'Something went wrong. Please try again.');
  }

  return res.json();
}

function dedupe(phones: Phone[]): Phone[] {
  return phones.filter((p, index, arr) => arr.findIndex((x) => x.id === p.id) === index);
}

export async function getPhones(search?: string): Promise<Phone[]> {
  if (search) {
    const url = BASE_URL + '/products?' + new URLSearchParams({ search }).toString();
    return dedupe(await apiFetch<Phone[]>(url, 'Phones'));
  }

  let accumulated: Phone[] = [];
  let offset = 0;

  while (accumulated.length < 20) {
    const needed = 20 - accumulated.length;
    const raw = await apiFetch<Phone[]>(
      BASE_URL +
        '/products?' +
        new URLSearchParams({ limit: String(needed), offset: String(offset) }).toString(),
      'Phones',
    );
    accumulated = dedupe([...accumulated, ...raw]);
    if (raw.length < needed) break;
    offset += needed;
  }

  return accumulated.slice(0, 20);
}

export async function getPhoneById(id: string): Promise<PhoneDetail> {
  const phone = await apiFetch<PhoneDetail>(BASE_URL + '/products/' + id, 'Phone');
  phone.similarProducts = phone.similarProducts.filter(
    (p, index, arr) => arr.findIndex((x) => x.id === p.id) === index,
  );
  return phone;
}
