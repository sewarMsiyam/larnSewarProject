import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import HeaderAuth from '@/components/auth/Header';
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import LogoFooter from "@/components/home/layout/footer/logoFooter"
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

export const metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-expo">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 z-0">
            <Image src="/Authlayout.png" alt="Background" fill className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>

          <NextIntlClientProvider messages={messages}>
            <AOSWrapper>
              <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <HeaderAuth session={session} />
                <div className="flex flex-row items-center justify-center flex-grow">
                  <div className='flex justify-center'>
                    <div className='bg-Auth-gradient hidden lg:block lg:basis-1/4 '>
                      <div className="flex flex-col justify-center items-center h-full p-12 m-auto" >
                        <LogoFooter />
                        <p className="text-white text-center opacity-80 my-5">
                          لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!
                        </p>
                        <button className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex '>
                          الدخول ك معلم
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g clipPath="url(#clip0_444_317)">
                              <path d="M8.82748 14.0963L12.9136 18.1824L11.8364 19.2595L5.91147 13.3346L11.8364 7.40961L12.9136 8.48673L8.82748 12.5728H18.0996V14.0963H8.82748Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_444_317">
                                <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.0059 24.2775)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className='bg-white w-fall lg:basis-2/4'>
                      <div className='p-10 lg:p-10'>
                        {children}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </AOSWrapper>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>

  );
}
