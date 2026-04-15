import { getPhones } from '@/services/api';
import PhoneList from '@/components/PhoneList/PhoneList';

export default async function HomePage() {
  const phones = await getPhones();

  return <PhoneList initialPhones={phones} />;
}
