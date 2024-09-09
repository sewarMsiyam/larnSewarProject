// app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header';
import '@/app/globals.css';
import AOSWrapper from '@/components/AOSWrapper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
 
export const metadata: Metadata = {
  title: "سوار",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  // You can pass session data to components or handle it as needed
  // Example: You can pass session as props to child components if required

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-expo">
        <NextIntlClientProvider messages={messages}>
          <AOSWrapper>
            <Header session={session} /> {/* Pass session data to Header or other components */}
            {children}
          </AOSWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
