// app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header';
import Footer from '@/components/home/layout/footer/Footer';
import { getServerSession } from 'next-auth/next';
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';

export const metadata: Metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session = await getServerSession(AuthOptions);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-expo">
          <NextIntlClientProvider messages={messages}>
            <AOSWrapper>
              <Header session={session}/>
              {children}
              <Footer />
            </AOSWrapper>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
