"use client";
import { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
import { useTranslations } from 'next-intl';
import SkeletonCardcourses from '@/components/ui/SkeletonCardcourses';
import Star from '@/components/svgIcon/star';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Opinions from "@/components/home/body/Opinions"
import Video from "@/components/svgIcon/video"
import Exam from "@/components/svgIcon/exam"
import Shares from "@/components/svgIcon/shares"
import Summary from "@/components/svgIcon/summary"
import Time from "@/components/svgIcon/time"

export default function DetailCourse() {
  const t = useTranslations('HomePage');

  // const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const endpoint = 'courses';
  const mainCategory = 'tawjhi';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        //  const data = await fetchOne<Course>(endpoint, mainCategory);
        // if (Array.isArray(data)) {
        //   setCourses(data);
        // } else {
        //   console.error('Invalid data format:', data);
        //   setError('Failed to load data.');
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading && error) {
    return (
      <div className="grid">
        <SkeletonCardcourses />
      </div>
    );
  }

  return (
    <>
      <section className="bg-gridColor">
        <div className='container relative'>

          <div className="flex">
            <div className="p-10">
              <div>
                الرئيسية
                تفاصيل الكورس
              </div>
              <h1>كورس تعليمي لغة إنجليزية  للثانوية العامة</h1>
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <span> (300) تقييم</span>
              </div>
              <div className='flex items-center justify-center'>
                <Avatar>
                  <AvatarImage
                    src="/" alt="Teacher Image" className="w-10 h-10 rounded-full" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <span className="font-bold">الأستاذ محمد علي</span>
              </div>
            </div>


            <div className='absolute end-0 top-1/4 grow-0'>
              <div className='bg-white shadow-lg rounded-2xl'>
                <div className='relative'>
                  <img src="/course2.png" alt='' className='w-[390px] rounded-t-2xl' />
                  <span className="absolute top-1/2 left-1/2 ">
                    <Video />
                  </span>
                </div>
                <div className="p-5">
                  <div className='flex items-center justify-between'>
                    <div className='text-[#FE7A36]'><span className="font-bold">20 $</span>/ حصة</div>
                    <div className="text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs">
                      40 دقيقة
                    </div>
                  </div>
                  <div>
                    <b>المميزات</b>
                    <p className="flex gap-3"><Summary /> ملخص شامل لكل الحصص</p>
                    <p className="flex gap-3"><Exam /> اختبار تحصيلي بعد الحصص</p>
                    <p className="flex gap-3"><Shares /> 08 حصص مسجلة عبر زوم مييتنج</p>
                    <p className="flex gap-3"><Time />مدة الحصة الواحدة 40 دقيقة</p>
                  </div>
                  <div>
                    <Link href='/' className="btn-primary font-medium py-2.5 w-full">اشترك في الكورس</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
      <section className='container'>
        <div className="grid  grid-cols-3">
          <div className="col-span-2">

            <h4>محتوى الكورس</h4>
            <h6>تعلم اللغة الإنجليزية بسهولة وفعالية!</h6>
            <p>
              هل تبحث عن طريقة فعالة لتحسين مهاراتك في اللغة الإنجليزية؟ انضم إلى كورسنا المصمم خصيصًا لمساعدتك على اكتساب الثقة والقدرة على التحدث والكتابة بطلاقة. يركز الكورس على تقديم مجموعة من الدروس التفاعلية التي تغطي أساسيات اللغة، مثل القواعد الأساسية والمفردات اليومية والتعبيرات الشائعة.
              مخرجات الكورس
              محتوى متكامل: يغطي الكورس كل ما تحتاجه من القواعد والمفردات إلى مهارات المحادثة والاستماع، مما يضمن لك بناء أساس قوي.
              تدريبات عملية: ستتمكن من ممارسة اللغة عبر تمارين تطبيقية وحوارات واقعية، تساعدك على تحسين نطقك وفهمك بسرعة.
              مناسب للجميع: سواء كنت مبتدئًا أو ترغب في تحسين مستواك الحالي، فالكورس مصمم ليتناسب مع جميع المستويات.
              تجربة تفاعلية: يقدم الكورس محتوى متنوعاً من الفيديوهات والتدريبات التفاعلية التي تجعل التعلم ممتعًا ومفيدًا.
              ابدأ رحلتك في تعلم اللغة الإنجليزية اليوم معنا واكتشف كيف يمكن لك تحقيق أهدافك اللغوية بسهولة ومرونة!
            </p>
          </div>
          <div className="col-span-1"></div>
        </div>


      </section>







      <div className="my-20">
        <Opinions />
      </div>
      
    </>
  );
}
