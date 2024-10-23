"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Exam from "@/components/svgIcon/exam"
import Shares from "@/components/svgIcon/shares"
import Summary from "@/components/svgIcon/summary"

interface CourseCardProps {
  id: number;
  imageSrc?: string;
  title?: string;
  duration?: string;
  lessons?: string;
  exam?: string;
  summary?: string;
  teacherImage?: string;
  teacherName?: string;
  instructor_id?: string;
  price?: string;
}

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`} />
);

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  imageSrc,
  title,
  duration,
  lessons,
  exam,
  summary,
  teacherImage,
  teacherName,
  instructor_id,
  price
}: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg">
      <div className="h-60 relative overflow-hidden rounded-2xl mb-4">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
            <Link href={`/course/${id}`}>
              <img src={imageSrc} alt="Course Image" className="w-full h-full object-fill" />
            </Link>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        {loading ? (
          <>
            <Skeleton className="h-6 w-1/2 rounded-lg" />
            <Skeleton className="h-6 w-12 rounded-lg" />
          </>
        ) : (
          <>
            <Link href={`/course/${id}`} className="text-lg font-bold text-dark">{title}</Link>
            <div className="text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs">
              {duration}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        {loading ? (
          <>
            <Skeleton className="h-7 w-full rounded-lg" />
            <Skeleton className="h-7 w-full mx-10 rounded-lg" />
            <Skeleton className="h-7 w-full rounded-lg" />
          </>
        ) : (
          <>
            <div className="flex gap-1 items-center">
              <Shares />
              <span>{lessons} حصص</span>
            </div>
            <div className="flex gap-1 items-center">
              <Exam />
              <span>{exam} اختبار</span>
            </div>
            <div className="flex gap-1 items-center">
              <Summary />
              <span>{summary} ملخص</span>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        {loading ? (
          <>
            <div className="flex gap-2 items-center">
              <Skeleton className="w-10 h-10 rounded-full mr-2" />
              <Skeleton className="h-6 w-32 rounded-lg" />
            </div>
            <Skeleton className="h-6 w-24 rounded-lg" />
          </>
        ) : (
          <>
            <Link href={`/instructor/${instructor_id}`} className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={teacherImage}
                  alt="Teacher Image"
                  className="w-10 h-10 rounded-full"
                />
                <AvatarFallback>{teacherName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-bold">{teacherName}</span>
            </Link>
            <p className="text-[#FE7A36]">
              <span className="font-bold">{price} $</span>/ الكورس
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-1 xl:gap-2 mb-3">
        {loading ? (
          <>
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </>
        ) : (
          <>       
            <Link href={`/course/${id}`}  className="btn-primary font-medium py-2.5 w-1/2 before:ease relative overflow-hidden btn-primary px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">اشترك في الكورس</Link>
            <Link href={`/instructor/${instructor_id}`}  className="btn-outLine-primary relative overflow-hidden btn-outLine-primary font-medium py-2.5 w-1/2 px-3 transition-all before:absolute before:bottom-0 before:right-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-color-gradient before:transition-all before:duration-500 hover:text-white hover:before:right-0 hover:before:w-full "><span className="relative z-10">احجز المعلم</span></Link>
          
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
