// app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header';
import Footer from '@/components/home/layout/footer/Footer';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';
import SessionWrapper from '@/components/home/layout/SessionWrapper';

export const metadata: Metadata = {
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
          <NextIntlClientProvider messages={messages}>
            <AOSWrapper>
              <SessionWrapper>
              <Header session={session}/>
              {children}
              <Footer />
              </SessionWrapper>
            </AOSWrapper>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
