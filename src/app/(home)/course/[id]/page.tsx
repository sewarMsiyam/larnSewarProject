"use client";
import { useEffect, useState } from 'react';

import { fetchOne } from '@/app/api/dataFetch';
import { useTranslations } from 'next-intl';
import { Course } from '@/app/api/interfaces';
import Star from '@/components/svgIcon/star';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Opinions from "@/components/home/body/Opinions"
import Video from "@/components/svgIcon/video"
import Exam from "@/components/svgIcon/exam"
import Shares from "@/components/svgIcon/shares"
import Summary from "@/components/svgIcon/summary"
import Time from "@/components/svgIcon/time"


interface DetailCourseProps {
  params: {
    id: string;
  };
}

export default function DetailCourse({ params }: DetailCourseProps) {
  const t = useTranslations('HomePage');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = 'courses';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchOne(endpoint, params.id);
        if (data) {
          setCourse(data);
        } else {
          setError('Course not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="grid">
        {/* <SkeletonCardcourses /> */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>No course data available.</p>;
  }

  return (
    <>
      <section className="bg-gridColor">
        <div className='lg:container relative'>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="p-5 lg:p-10 space-y-2 lg:space-y-5">


              <nav aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-5 ">
                  <li>
                    <div className="flex items-center">
                      <Link href="/" className="me-3 text-[#333]">الرئيسية</Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 25 25" fill="none">
                        <g clipPath="url(#clip0_516_4347)">
                          <path d="M8.42761 13.305L13.7916 18.669L12.3776 20.083L4.59961 12.305L12.3776 4.52698L13.7916 5.94098L8.42761 11.305L20.5996 11.305V13.305H8.42761Z" fill="#333333" />
                        </g>
                        <defs>
                          <clipPath id="clip0_516_4347">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.5996 24.3051)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <Link href="/" className="ms-3 font-medium text-primary">تفاصيل الكورس</Link>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="font-bold text-2xl lg:text-3xl leading-10">{course.name}</h1>
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <span> (300) تقييم</span>
              </div>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage
                    src={course.instructor_image} alt="Teacher Image" className="w-10 h-10 rounded-full" />
                  <AvatarFallback>{course.instructor_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-bold">{course.instructor_name}</span>
              </div>
            </div>


            <div className='lg:absolute end-0 top-1/4 grow-0'>
              <div className='bg-white shadow-lg rounded-2xl'>
                <div className='relative'>
                  <img src={course.image} alt='' className='h-[288px] w-full rounded-t-2xl' />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <Video />
                  </span>
                </div>
                <div className="p-5 space-y-5">
                  <div className='flex items-center justify-between'>
                    <div className='text-[#FE7A36] text-lg'><span className="font-bold">{course.price} $</span>/ حصة</div>
                    <div className="text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs">
                      {/* 40 دقيقة */} {course.duration}
                    </div>
                  </div>
                  <div className="space-y-3">

                    {course.course_features.length > 0 && (
                    <>
                       <b>المميزات</b>
                    {course.course_features.map((feature) => (
                      <p key={feature.id} className="flex gap-3">
                        {feature.feature}
                      </p>
                    ))}
                    
                    </>)}
                 

                  </div>
                  <div className="flex w-full">
                    <Link href='/' className="btn-primary text-center rounded-2xl font-medium py-2.5 w-[100%]">اشترك في الكورس</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container my-5'>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 lg:p-9 xl:p-5 text-justify leading-8">
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
            {course.course_durations.length > 0 && (
                    <>
                      <h2 className="font-bold mb-5 mt-10">وقت الكورس <span className="text-[#EA4335]">(الأوقات مبدئية ويتم الاتفاق عليها في بداية الكورس)</span></h2>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {course.course_durations.map((duration) => (
                          <div key={duration.id} className="col-span-1">
                            <div className="flex justify-evenly gap-4 bg-[#F2F2F3] font-bold p-3.5 rounded-xl px-8">
                              <span>{duration.day}</span>
                              <div className="w-px h-[29px] bg-[rgba(0,_0,_0,_0.20)]"></div>
                              <span className="text-primary">{duration.from_time} - {duration.to_time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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
