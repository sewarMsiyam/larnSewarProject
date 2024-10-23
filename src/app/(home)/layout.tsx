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
  title: "سوار - منصة تعليمية رائدة في الوطن العربي",
  description: "منصة سوار التعليمية - نظام تعليمي متكامل يخدم الطلاب والمعلمين في فلسطين، مصر، السعودية والأردن. تعلم بسهولة وفعالية مع أفضل المناهج العربية",
  keywords: [
    "سوار",
    "منصة تعليمية",
    "تعليم في فلسطين",
    "تعليم في مصر",
    "تعليم في السعودية",
    "تعليم في الأردن",
    "المناهج الفلسطينية",
    "المناهج المصرية",
    "المناهج السعودية",
    "المناهج الأردنية",
    "تعليم عن بعد",
    "تعلم إلكتروني",
    "مدارس عربية",
    "تعليم عربي"
  ],
  authors: [{ name: 'سوار' }],
  openGraph: {
    type: 'website',
    locale: 'ar',
    title: 'سوار - منصة تعليمية رائدة في الوطن العربي',
    description: 'نظام تعليمي متكامل يخدم الطلاب والمعلمين في فلسطين، مصر، السعودية والأردن',
    siteName: 'سوار',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سوار - منصة تعليمية رائدة في الوطن العربي',
    description: 'نظام تعليمي متكامل يخدم الطلاب والمعلمين في فلسطين، مصر، السعودية والأردن',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  alternates: {
    canonical: 'https://sewaar.com',
  },
  other: {
    'theme-color': '#ffffff',
    'google-site-verification': 'your-verification-code',
  },
  metadataBase: new URL('https://sewaar.com'),
  category: 'education',
  creator: 'سوار',
  generator: 'Next.js',
  applicationName: 'سوار',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
}


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
