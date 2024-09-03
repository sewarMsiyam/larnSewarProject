import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HomePage(){
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/testApi">about</Link>


 

    </div>
  );
}