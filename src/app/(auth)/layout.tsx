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
import RightSection from '@/components/auth/rightSection';
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
                    <RightSection />

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
