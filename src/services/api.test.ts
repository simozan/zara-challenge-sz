import { ApiError, getPhones, getPhoneById } from './api';
import { Phone, PhoneDetail } from '@/types';

const mockPhone = (id: string): Phone => ({
  id,
  brand: 'Samsung',
  name: `Phone ${id}`,
  basePrice: 999,
  imageUrl: '/img.jpg',
});

const mockDetail = (id: string, similarProducts: Phone[] = []): PhoneDetail => ({
  id,
  brand: 'Samsung',
  name: `Phone ${id}`,
  description: 'desc',
  basePrice: 999,
  rating: 4,
  specs: {
    screen: '6.1"',
    resolution: '1080x2400',
    processor: 'Snapdragon',
    mainCamera: '50MP',
    selfieCamera: '12MP',
    battery: '4000mAh',
    os: 'Android 14',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [],
  storageOptions: [],
  similarProducts,
});

const mockFetch = (data: unknown, status = 200) => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: status < 400,
    status,
    json: async () => data,
  });
};

afterEach(() => jest.restoreAllMocks());

describe('ApiError', () => {
  it('stores status and message', () => {
    const err = new ApiError(404, 'Not found');
    expect(err.status).toBe(404);
    expect(err.message).toBe('Not found');
    expect(err.name).toBe('ApiError');
  });

  it('is an instance of Error', () => {
    expect(new ApiError(500, 'err')).toBeInstanceOf(Error);
  });
});

describe('getPhones', () => {
  it('returns phones from search query', async () => {
    const phones = [mockPhone('1'), mockPhone('2')];
    mockFetch(phones);
    const result = await getPhones('samsung');
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
  });

  it('deduplicates phones with same id', async () => {
    mockFetch([mockPhone('1'), mockPhone('1'), mockPhone('2')]);
    const result = await getPhones('samsung');
    expect(result).toHaveLength(2);
  });

  it('throws ApiError on 404', async () => {
    mockFetch(null, 404);
    await expect(getPhones('x')).rejects.toThrow(ApiError);
  });

  it('throws ApiError on 401', async () => {
    mockFetch(null, 401);
    await expect(getPhones('x')).rejects.toThrow(ApiError);
  });
});

describe('getPhoneById', () => {
  it('returns phone detail', async () => {
    mockFetch(mockDetail('1'));
    const result = await getPhoneById('1');
    expect(result.id).toBe('1');
    expect(result.brand).toBe('Samsung');
  });

  it('deduplicates similarProducts', async () => {
    const similar = [mockPhone('2'), mockPhone('2'), mockPhone('3')];
    mockFetch(mockDetail('1', similar));
    const result = await getPhoneById('1');
    expect(result.similarProducts).toHaveLength(2);
  });

  it('throws ApiError on 404', async () => {
    mockFetch(null, 404);
    await expect(getPhoneById('not-found')).rejects.toThrow(ApiError);
  });
});
