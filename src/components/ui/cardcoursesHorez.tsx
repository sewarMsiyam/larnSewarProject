"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Exam from "@/components/svgIcon/exam"
import Shares from "@/components/svgIcon/shares"
import Summary from "@/components/svgIcon/summary"
import Time from "@/components/svgIcon/time"

interface CourseCardProps {
  id: number;
  imageSrc?: string;
  title?: string;
  description?: string;
  duration?: string;
  lessons?: string;
  exam?: string;
  summary?: string;
  teacherImage?: string;
  teacherName?: string;
  price?: string;
}

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`} />
);

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  imageSrc,
  title,
  description,
  duration,
  lessons,
  exam,
  summary,
  teacherImage,
  teacherName,
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
    <div className="border border-[#0000001A] rounded-xl p-3 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-2/4 relative overflow-hidden rounded-2xl">
        <Link href={`/course/${id}`}>
          <img src={imageSrc} alt="Course Image" className="w-full h-full object-fill" />
        </Link>
      </div>

      <div className="w-full px-4 space-y-3 mt-3 lg:mt-0">
        <div className="flex items-center justify-between">
          <Link href={`/course/${id}`} className=" font-bold text-dark">{title}</Link>
          <p className="text-[#FE7A36]">
            <span className="font-bold">{price} $</span>/ الكورس
          </p>
        </div>
        <p className="line-clamp-2 text-xs">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1 items-center text-xs">
            <Shares />
            <span>{lessons} حصص</span>
          </div>
          {/* <div className="flex gap-1 items-center text-xs">
            <Exam />
            <span>{exam} اختبار</span>
          </div>
          <div className="flex gap-1 items-center text-xs">
            <Summary />
            <span>{summary} ملخص</span>
          </div> */}
          <div className="flex gap-1 items-center text-xs">
            <Time />
            <span>{duration} مدة </span>
          </div>
          <div className="flex gap-1 items-center text-xs">
           
          </div>
        </div>
        {/* <div className="text-primary flex py-1 px-2 rounded-lg text-xs">
          <Time />
          {duration}
        </div> */}
        <div className='text-end'>
          <Link href={`/course/${id}`}  className="btn-primary text-xs font-medium py-2.5 w-1/2 before:ease relative overflow-hidden btn-primary px-3 rounded-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">اشترك في الكورس</Link>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;
