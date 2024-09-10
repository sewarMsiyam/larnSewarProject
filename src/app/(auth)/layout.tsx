import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import HeaderAuth from '@/components/auth/Header';
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-expo">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 z-0">
            <img src="/Authlayout.png" alt="Background" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>

          <NextIntlClientProvider messages={messages}>
            <AOSWrapper>
              <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <HeaderAuth session={session} />
                <div className="flex flex-col items-center justify-center flex-grow">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div></div>
                    <div> {children}</div>
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
