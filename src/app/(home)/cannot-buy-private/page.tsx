import type { Metadata } from "next";
import Link from 'next/link';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: "سوار -  الملف الشخصي",
  description: "نظم تعليمك بسهولة وفعالية أكثر",
  keywords: ['Next.js', 'SEO', 'website'],
};


export default async function Unauthorized() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-bold text-red-600 mb-2">عذراً، حدث خطأ</h2>
        <p className="text-gray-600">لا يمكنك كمعلم حجز خصوصي <br/> يجب التسجيل بحساب طالب </p>
      </div>
    );
}