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
  title: "سوار - نظم تعليمك بسهولة وفعالية",
  description: "نظم تعليمك بسهولة وفعالية أكثر مع سوار - منصة تعليمية متكاملة لإدارة المساقات والدورات التعليمية",
  keywords: [
    "سوار",
    "تعليم",
    "دورات تعليمية",
    "منصة تعليمية",
    "إدارة المساقات",
    "تعلم عن بعد",
    "تعليم إلكتروني"
  ],
  openGraph: {
    title: "سوار - نظم تعليمك بسهولة وفعالية",
    description: "نظم تعليمك بسهولة وفعالية أكثر مع سوار - منصة تعليمية متكاملة",
    type: "website",
    locale: "ar_SA",
    siteName: "سوار"
  },
  twitter: {
    card: "summary_large_image",
    title: "سوار - نظم تعليمك بسهولة وفعالية",
    description: "نظم تعليمك بسهولة وفعالية أكثر مع سوار - منصة تعليمية متكاملة"
  },
  alternates: {
    canonical: "https://sewaar.com"
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
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
