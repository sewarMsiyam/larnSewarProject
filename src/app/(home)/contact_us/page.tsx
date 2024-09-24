import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import ContactUs from '@/components/home/body/ContactUs';

export const metadata: Metadata = {
  title: "سوار - الصفحة الئيسية",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
    <div className="-mt-14">
        <ContactUs />
    </div>
    </>
  );
}
