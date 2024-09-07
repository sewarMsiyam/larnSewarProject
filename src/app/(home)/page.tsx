import { useTranslations } from 'next-intl';
import HeroHome from '@/components/home/body/heroHome';
import CoursesHome from '@/components/home/body/coursesHome';
import RegistrationSteps from '@/components/home/body/registrationSteps';
import WhyUs from '@/components/home/body/whyus';
import Opinions from '@/components/home/body/Opinions';
export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <HeroHome />
      <CoursesHome />
      <RegistrationSteps/>
      <WhyUs />
      <Opinions />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}
