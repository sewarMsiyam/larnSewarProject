"use client";
import React, { useEffect, useState } from 'react';
import { fetchAllToken } from '@/app/api/dataFetch';
import Link from "next/link";

type Lesson = {
  id: number;
  name: string;
  course_id: number;
  course_name: string;
  recorded_video_link: string;
  slug: string;
  zoom_link: string;
  summary_file: string | null;
  status: number;
};

type CheckoutFormProps = {
  token: string;
  id: string;
};

export default function UserCourseLessons({ token, id }: CheckoutFormProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const loadLessons = async () => {
    if (token) {
      try {
        const fetchedLessons = await fetchAllToken(`student/courses/${id}/lessons`, token);
        if (Array.isArray(fetchedLessons)) {
          setLessons(fetchedLessons);
          setSelectedLesson(fetchedLessons[0]);
        } else {
          setError('البيانات المستلمة غير صحيحة');
        }
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadLessons();
  }, [token]);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleLessonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const lesson = lessons.find(l => l.id === selectedId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  const getVideoEmbedUrl = (url: string): { type: string; embedUrl: string } => {
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


  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      جاري التحميل...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      {error}
    </div>
  );

  return (
    <div className="container bg-white rounded-3xl py-8 lg:p-16 my-10 shadow-md">

      {lessons.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl font-semibold text-gray-600">لا يوجد دروس متاحة حالياً لهذا الكورس بعد .</p>
        </div>
      ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <h4 className='font-bold text-lg'>
                {lessons[0]?.course_name} <span className='text-gray-500 text-sm block lg:inline'>عدد الدروس ({lessons.length})</span>
              </h4>
              <Link href='/profile' className="text-xs text-[#FF6F61] flex items-center space-x-5 cursor-pointer">
                <svg width="5" height="9" className="mx-1" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.40039 11.4015L6.40039 6.38725L1.40039 1.37305" stroke="#FF6F61" strokeWidth="2.13068" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                الرجوع لقائمة الكورسات
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:hidden mb-4">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleLessonChange}
                  value={selectedLesson?.id}
                >
                  {lessons.map((lesson, index) => (
                    <option key={lesson.id} value={lesson.id}>
                      {index + 1}. {lesson.name}
                    </option>
                  ))}
                </select>
              </div>

              <ul className="hidden lg:block space-y-3">
                {lessons.map((lesson, index) => (
                  <li
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`w-full flex items-center justify-between rounded-2xl py-4 px-8 cursor-pointer ${selectedLesson?.id === lesson.id
                        ? 'border border-primary bg-[#E6F8F3] text-primary font-bold'
                        : 'bg-gray-100'
                      }`}
                  >
                    {index + 1}. {lesson.name}
                    <span>
                      <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.89035 11.5119L1.61035 6.21688L6.89035 0.921875" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="col-span-1 lg:col-span-2 ">

                
                {selectedLesson && (
                  (() => {
                    const { type, embedUrl } = getVideoEmbedUrl(selectedLesson.recorded_video_link);
                    if (type === 'direct') {
                      return (
                        <video width="100%" height="400" controls>
                          <source src={embedUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    } else {
                      return (
                        <iframe
                          src={embedUrl}
                          width="100%"
                          height="400"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen 
                        ></iframe>
                      );
                    }
                  })()
                )}

                {selectedLesson && selectedLesson.summary_file && (
                  <div className="mt-8">
                    <h5 className="font-bold mb-3">الملخص</h5>
                    <div className="w-full flex items-center justify-between rounded-2xl py-4 px-4 lg:px-8 bg-gray-100">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <img src="/summary_file.svg" alt="Summary File" className="" />
                        <p className="text-dark hover:underline">
                          <a href={`https://sewaar.net${selectedLesson.summary_file}`} target="_blank" >ملف الملخص</a>
                        </p>
                      </div>
                      <a href={`https://sewaar.net${selectedLesson.summary_file}`} target="_blank" className="flex gap-1 bg-primary rounded-xl px-5 py-2 text-white">
                        <img src="/dwonload.svg" alt="Download" className="me-2" />
                        تنزيل الملف
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>
          
          </>

      )}

    </div>
  );
}