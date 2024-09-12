import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import HeroHome from '@/components/home/body/heroHome';
import CoursesHome from '@/components/home/body/coursesHome';
import RegistrationSteps from '@/components/home/body/registrationSteps';
import WhyUs from '@/components/home/body/whyus';
import Opinions from '@/components/home/body/Opinions';
import RegisterNow from '@/components/home/body/registerNow';
import ContactUs from '@/components/home/body/ContactUs';

export const metadata: Metadata = {
  title: "سوار - الصفحة الئيسية",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <HeroHome />
      <CoursesHome />
      <RegistrationSteps/>
      <WhyUs />
      <Opinions />
      <RegisterNow />
      {/* <ContactUs /> */}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </>
  );
}
