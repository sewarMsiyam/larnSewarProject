import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header';
import '@/app/globals.css'
import AOSWrapper from '@/components/AOSWrapper';

export const metadata: Metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};


export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} >
      <body className="font-expo">
        <NextIntlClientProvider messages={messages}>
          <AOSWrapper>
          <Header />
            {children}
          </AOSWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}