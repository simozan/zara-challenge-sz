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

export async function getPhones(search?: string): Promise<Phone[]> {
  const params = new URLSearchParams();
  if (search) {
    params.set('search', search);
  } else {
    params.set('limit', '20');
  }

  const url = BASE_URL + '/products?' + params.toString();

  const phones = await apiFetch<Phone[]>(url, 'Phones');
  return phones.filter((p, index, arr) => arr.findIndex((x) => x.id === p.id) === index);
}

export async function getPhoneById(id: string): Promise<PhoneDetail> {
  const phone = await apiFetch<PhoneDetail>(BASE_URL + '/products/' + id, 'Phone');
  phone.similarProducts = phone.similarProducts.filter(
    (p, index, arr) => arr.findIndex((x) => x.id === p.id) === index,
  );
  return phone;
}
