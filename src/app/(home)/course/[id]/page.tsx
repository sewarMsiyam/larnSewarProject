"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchOne } from '@/app/api/dataFetch';
import { useTranslations } from 'next-intl';
import { Course } from '@/app/api/interfaces';
import Star from '@/components/svgIcon/star';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Opinions from "@/components/home/body/Opinions"
import Video from "@/components/svgIcon/video"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DetailCourseProps {
  params: {
    id: number;
  };
}


    const getDayInArabic = (day: string): string => {
    const daysMap: { [key: string]: string } = {
        'saturday': 'السبت',
        'sunday': 'الأحد',
        'monday': 'الاثنين',
        'tuesday': 'الثلاثاء',
        'wednesday': 'الأربعاء',
        'thursday': 'الخميس',
        'friday': 'الجمعة'
    };
    
    const normalizedDay = day.toLowerCase();
    return daysMap[normalizedDay] || day;
    };
    
const formatTimeTo12Hour = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'م' : 'ص';
    const hour12 = hoursNum % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};


const getVideoEmbedUrl = (url: string): { type: string; embedUrl: string } => {
  if (!url) return { type: 'none', embedUrl: '' };
  
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  // Vimeo
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  return { type: 'direct', embedUrl: url };
};

const VideoPlayer = ({ url }: { url: string }) => {
  const { type, embedUrl } = getVideoEmbedUrl(url);

  if (type === 'none') return null;
  
  if (type === 'direct') {
    return (
      <video width="100%" height="400" controls className="rounded-lg">
        <source src={embedUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="400"
      className="rounded-lg"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
};



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
        const data = await fetchOne(endpoint, params.id.toString());
        if (data) {
          setCourse(data);
        } else {
          setError('تفاصيل الكورس غير موجودة');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('لا يوجد داتا !!.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  if (loading) return (
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
                      <Link href={`/course/${params.id.toString()}`} className="ms-3 font-bold text-primary">تفاصيل الكورس</Link>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="font-bold text-2xl lg:text-3xl leading-10">
                <Skeleton className="h-6 w-full" />
              </h1>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
            </div>
            <div className='lg:absolute mx-4 end-0 top-1/4 grow-0'>
            
            </div>
          </div>
        </div>
      </section>
        <div className="flex justify-center items-center h-screen">
        جاري التحميل ..
        </div>
    </>
  );

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
            <div className="p-5 lg:p-10 space-y-2 lg:space-y-5 lg:w-[75%]">
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
                      <Link href={`/course/${params.id.toString()}`} className="ms-3 font-bold text-primary">تفاصيل الكورس</Link>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="font-bold text-2xl lg:text-3xl leading-10 mb-8 ">{course.name}</h1>
              {/* <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <span> (300) تقييم</span>
              </div> */}
              <Link href={`/instructor/${course.instructor_id}`} className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage
                    src={course.instructor_image} alt="Teacher Image" className="w-10 h-10 rounded-full" />
                  <AvatarFallback>{course.instructor_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{course.instructor_name}</p>
                  <p className="text-primary text-xs">{course.category}</p>
                </div>
              </Link>
            </div>
            <div className='lg:absolute mx-4 end-0 top-1/4 grow-0'>
              <div className='bg-white shadow-lg rounded-2xl'>
                <div className='relative'>
                  <img src={course.image} alt='' className='h-[288px] w-full lg:w-[370px] rounded-t-2xl' />
                  <Dialog>
                    <DialogTrigger>
                      {course.introduction_video && (
                        <div className="w-full h-full block absolute z-10 top-0">
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Video />
                          </span>
                        </div>
                      )}
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="mb-4">{course.name}</DialogTitle>
                        <VideoPlayer url={course.introduction_video} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="p-5 pt-0 space-y-5">
                  <div className='flex items-center justify-between'>
                    <div className='text-[#FE7A36] text-lg'><span className="font-bold">{course.price} $</span>/ الكورس</div>
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
                    <Link href={{ pathname :'/checkout_course' , query: { id: course.id }}} className="btn-primary text-white text-center rounded-2xl font-medium py-2.5 w-[100%]">اشترك في الكورس</Link>
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

            {course.description && course.description.length > 0 && (
              <div className="mb-5">
                <h3 className="font-bold mb-3 text-primary">محتوى الكورس</h3>
                {course.description}
              </div>
            )}

            {course.course_result_desc && course.course_result_desc.length > 0 && (
              <div className="mb-5">
                <h3 className="font-bold mb-3  text-primary">مخرجات الكورس</h3>
                {course.course_result_desc}
              </div>
            )}


            {course.course_appointments && course.course_appointments.length > 0 && (
              <>
                <h2 className="font-bold mb-5 mt-10">وقت الكورس <span className="text-[#EA4335]">(الأوقات مبدئية ويتم الاتفاق عليها في بداية الكورس)</span></h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {course.course_appointments.map((duration) => (
                    <div key={duration.id} className="col-span-1">
                      <div className="flex justify-evenly gap-4 bg-[#F2F2F3] font-bold p-3.5 rounded-xl px-8">
                        <span>{getDayInArabic(duration.day)}</span>
                        <div className="w-px h-[29px] bg-[rgba(0,_0,_0,_0.20)]"></div>
                        <span className="text-primary">{formatTimeTo12Hour(duration.from_time)}  - {formatTimeTo12Hour(duration.to_time)}</span>
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
