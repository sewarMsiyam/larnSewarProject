import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HeroHome from '@/components/home/body/heroHome';
import CoursesHome from '@/components/home/body/coursesHome';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <HeroHome />
      <CoursesHome />
    </>
  );
}
