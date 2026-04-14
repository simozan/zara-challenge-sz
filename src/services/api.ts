import { Phone, PhoneDetail } from '@/types';

const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

const headers = {
  'x-api-key': API_KEY,
};

export async function getPhones(search?: string): Promise<Phone[]> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);

  const query = params.toString();
  const url = query ? `${BASE_URL}/products?${query}` : `${BASE_URL}/products`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[getPhones] ${res.status} ${res.statusText} — URL: ${url} — body: ${body}`);
    throw new Error(`Failed to fetch phones: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPhoneById(id: string): Promise<PhoneDetail> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    headers,
  });

  if (!res.ok) throw new Error(`Failed to fetch phone with id: ${id}: ${res.status} ${res.statusText}`);

  return res.json();
}
