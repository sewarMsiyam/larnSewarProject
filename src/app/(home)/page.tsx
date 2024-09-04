import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center rounded gap-5 lg:gap-20 p-7 bg-[url('/hero_section.png')] bg-cover bg-center"> 
        <div>
          <div><Image src="/logoW.png" alt="logo" width={150} height={20} className="inline-block" /><span className="text-4xl text-white font-bold leading-relaxed">- نظم تعليمك بسهولة وفعالية أكثر</span></div>
          <p className="text-lg text-white opacity-95 px-5 mb-4">
            تحقق التنظيم الكامل لجداولك الدراسية وحصصك الخاصة بفضل أدواتنا المتكاملة. استمتع بتجربة تعليمية تفاعلية وسلسة بين الطلاب والمعلمين في بيئة رقمية متقدمة.
          </p>
          {/* <div>
            <Link href="" className="bg-white text-primary py-2.5 w- md:px-3 lg:px-6 m-1 rounded-[30px]">
            ابدأ الآن
            </Link>
            <Link href="" className="border border-white py-2.5 px-6 md:px-3 lg:px-6 m-1 rounded-[30px]">
            احجز معلم
            </Link>
          </div> */}
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

<br/><br/><br/>

      {/* bg-gradient 
      
       <div className="relative h-64">
            <Image
              src="/heroBgImg.png"
              alt="Hero Image"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
            <Image
              src="/hero.png"
              alt="Hero Image"
              width="10"
              height="20"
              priority
            />
          </div>
          
          <section className="container">
      <div className="flex flex-col md:flex-row items-center rounded bg-gradient"> 
        <div className="basis-1/2">
          <div className="flex items-center">
            <Image src="/logoW.png" alt="logo" width={110} height={36} />
            <h3 className="text-white"> - نظم تعليمك بسهولة وفعالية أكثر</h3>
          </div>
          <p  className="text-white opacity-80">
            تحقق التنظيم الكامل لجداولك الدراسية وحصصك الخاصة بفضل أدواتنا المتكاملة. استمتع بتجربة تعليمية تفاعلية وسلسة بين الطلاب والمعلمين في بيئة رقمية متقدمة.
          </p>
          <div>
            <Link href="" className="btn-primary py-2.5 px-6 md:px-3 lg:px-6 m-1">
              Link
            </Link>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="relative h-64">
            <Image
              src="/hero.png"
              alt="Hero Image"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
     
      </div>
    </section> */}


    </section>
  );
}
