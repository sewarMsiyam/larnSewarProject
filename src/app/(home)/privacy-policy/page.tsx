import React from 'react';
import { BookOpen } from 'lucide-react';

const SiwarPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8" dir="rtl">
        {/* الشعار والعنوان */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-emerald-100 p-4 rounded-full mb-4">
            <BookOpen className="w-12 h-12 text-[#0abc8c]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            سياسة الخصوصية
          </h1>
          <p className="text-[#0abc8c] mt-2">منصة سوار التعليمية</p>
        </div>

        {/* مقدمة */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">مقدمة</h2>
          <p className="text-gray-600 leading-relaxed">
            في منصة سوار التعليمية، نحن نؤمن بأهمية حماية خصوصية طلابنا ومعلمينا. نلتزم بحماية المعلومات الشخصية وضمان سرية البيانات التعليمية لجميع مستخدمي المنصة.
          </p>
        </section>

        {/* جمع المعلومات */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">المعلومات التي نجمعها</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              معلومات الحساب التعليمي
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              التقدم في المناهج والدورات
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              نتائج الاختبارات والتقييمات
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              بيانات التواصل الأساسية
            </li>
          </ul>
        </section>

        {/* استخدام المعلومات */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">كيف نستخدم معلوماتك</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              تخصيص تجربة التعلم
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              تتبع التقدم الأكاديمي
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              تحسين المحتوى التعليمي
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              التواصل بشأن التحديثات التعليمية
            </li>
          </ul>
        </section>

        {/* حماية البيانات */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">حماية البيانات التعليمية</h2>
          <p className="text-gray-600 leading-relaxed">
            نطبق أعلى معايير الأمان لحماية البيانات التعليمية والمعلومات الشخصية لطلابنا ومعلمينا. نستخدم تقنيات التشفير المتقدمة ونتبع أفضل ممارسات أمن المعلومات.
          </p>
        </section>

        {/* حقوق المستخدمين */}
        <section className="mb-8 bg-white p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold text-[#0abc8c] mb-4">حقوق المستخدمين التعليمية</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              الوصول إلى السجل التعليمي
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              تحديث المعلومات الشخصية
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              طلب حذف البيانات
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-[#0abc8c] rounded-full ml-2"></div>
              التحكم في إعدادات الخصوصية
            </li>
          </ul>
        </section>

        {/* تاريخ التحديث */}
        <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-emerald-100">
          آخر تحديث لسياسة الخصوصية: 15 ديسمبر 2024
        </div>
      </div>
    </div>
  );
};

export default SiwarPrivacyPolicy;