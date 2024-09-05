import { useTranslations } from 'next-intl';
import HeroHome from '@/components/home/body/heroHome';
import CoursesHome from '@/components/home/body/coursesHome';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <HeroHome />
      <CoursesHome />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <div className="bg-[url('/')] bg-cover bg-center rounded-2xl">
            h1
        </div>
      </div>
    </>
  );
}
