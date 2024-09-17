import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HeroHome() {
  const t = useTranslations('HomePage');

  return (
    <>
    <section className="md:container">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 lg:gap-20 p-8 pb-16 md:pb-9 bg-[url('/hero_section.webp')] backdrop-blur-xl bg-cover bg-center rounded-2xl"> 
        <div className="xl:ps-12">
          <div className="mb-3"><Image src="/logoW.png" alt="logo" width={150} height={20} className="w-[95px] md:w-[150px] inline-block mb-5" /><span className="text-2xl md:text-4xl text-white font-bold">- نظم تعليمك بسهولة وفعالية أكثر</span></div>
          <p className="text-base	md:text-lg text-white opacity-95 md:px-5 mb-4">
            تحقق التنظيم الكامل لجداولك الدراسية وحصصك الخاصة بفضل أدواتنا المتكاملة. استمتع بتجربة تعليمية تفاعلية وسلسة بين الطلاب والمعلمين في بيئة رقمية متقدمة.
          </p>
            <div className="flex flex-row items-center">
            <Link href="/login" className="bg-white text-primary border border-transparent font-bold text-center py-2.5 w-40 m-1 rounded-2xl hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-200">ابدأ الأن</Link>
            <Link href="/login" className="border border-white text-white font-bold text-center py-2.5 w-40 m-1 rounded-2xl hover:bg-white hover:text-primary transition-all duration-200">احجز معلم</Link>
          </div>

        </div>
        <div className="relative">
          <img src="/heroBgImg.png" alt="heroBgImg" className="" />
          <div className="absolute top-9 right-9">
            <img 
              src="/hero.png"
              alt="Hero Image"
              className="rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
</>
  );
}
