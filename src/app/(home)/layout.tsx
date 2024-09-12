// app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header'; // Should be a Client Component
import Footer from '@/components/home/layout/footer/Footer';
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';

export const metadata: Metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-expo">
        <NextIntlClientProvider messages={messages}>
          <AOSWrapper>
            <Header session={session} />
            {children}
            <Footer />
          </AOSWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
