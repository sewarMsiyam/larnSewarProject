'use client';

import { HomeIcon, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import '@/app/globals.css';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* صورة 404 */}
        <div className="relative">
          <img 
            src="/404.webp" 
            alt="صفحة غير موجودة"
            className="w-full rounded-lg drop-shadow-2xl"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">عذراً، الصفحة غير موجودة</h1>
          <p className="text-gray-600 text-lg">
            يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/"
            className="flex justify-center gap-2 btn-primary text-center font-medium py-2.5 w-1/2 before:ease relative overflow-hidden btn-primary px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
          >
            <HomeIcon className="w-5 h-5" />
            الرئيسية
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 w-1/2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[16px] hover:bg-gray-50 transition duration-150 ease-in-out"
          >
                        العودة للخلف
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}