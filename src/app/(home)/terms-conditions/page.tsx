import React from 'react';
import { ScrollText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8" dir="rtl">
        {/* الشعار والعنوان */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-emerald-100 p-4 rounded-full mb-4">
            <ScrollText className="w-12 h-12 text-[#0abc8c]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            الشروط والأحكام
          </h1>
          <p className="text-[#0abc8c] mt-2">منصة سوار التعليمية</p>
        </div>

        {/* مقدمة */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">مقدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            مرحباً بك في منصة سوار التعليمية. من خلال استخدامك للمنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا التعليمية.
          </p>
        </section>

        {/* التسجيل والعضوية */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">التسجيل والعضوية</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>يجب أن تكون المعلومات المقدمة عند التسجيل صحيحة ودقيقة</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>المستخدمون مسؤولون عن الحفاظ على سرية معلومات حساباتهم</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>يحق للمنصة تعليق أو إنهاء الحسابات التي تنتهك الشروط</p>
            </li>
          </ul>
        </section>

        {/* المحتوى التعليمي */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">المحتوى التعليمي</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>جميع المواد التعليمية محمية بحقوق الملكية الفكرية</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>يمنع إعادة نشر أو مشاركة المحتوى دون إذن كتابي</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>المنصة تحتفظ بحق تحديث أو تغيير المحتوى التعليمي</p>
            </li>
          </ul>
        </section>

        {/* قواعد السلوك */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">قواعد السلوك</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>احترام جميع المستخدمين والمعلمين</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>الالتزام بالأخلاق والقيم التعليمية</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>عدم نشر أي محتوى مسيء أو غير لائق</p>
            </li>
          </ul>
        </section>

        {/* المدفوعات والاشتراكات */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">المدفوعات والاشتراكات</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2 mt-2"></div>
              <p>يمكن تغيير أسعار الاشتراكات مع إشعار مسبق</p>
            </li>
            </ul>
        </section>


        <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-emerald-100">
          آخر تحديث للشروط والأحكام : 15 ديسمبر 2024
        </div>
    </div>
    </div>
  );
};

export default Terms;