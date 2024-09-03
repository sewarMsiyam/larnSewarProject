import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/home/layout/header/header';
import LocaleSwitcher from "@/components/LocaleSwitcher"
import '@/app/globals.css'


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Header />
          {children}
          
        </NextIntlClientProvider>
      </body>
    </html>
  );
}