import Image from 'next/image';
import Link from 'next/link';
import Exam from '@/components/svgIcon/exam';
import Shares from '@/components/svgIcon/shares';
import Summary from '@/components/svgIcon/summary';

interface CourseCardProps {
  imageSrc: string;
  title: string;
  duration: string;
  lessons: string;
  exam: string;
  summary: string;
  teacherImage: string;
  teacherName: string;
  price: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  imageSrc,
  title,
  duration,
  lessons,
  exam,
  summary,
  teacherImage,
  teacherName,
  price
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg">
      <div className="h-60 relative overflow-hidden rounded-2xl mb-4">
        <Image src={imageSrc} alt="Course Image" fill objectFit="cover" />
      </div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-lg font-bold text-dark">{title}</h1>
        <div className='text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs'>
          {duration}
        </div>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-1 items-center'>
          <Shares />
          <span>{lessons} حصص</span>
        </div>
        <div className='flex gap-1 items-center'>
          <Exam />
          <span>{exam} اختبار</span>
        </div>
        <div className='flex gap-1 items-center'>
          <Summary />
          <span> {summary} ملخص</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className='flex gap-2 items-center'>
          <img src={teacherImage} alt="teacherImage" className='w-10 h-10 rounded-full' />
          <span className="font-bold">{teacherName}</span>
        </div>
        <p className="text-[#FE7A36]"><span className="font-bold">{price}</span>/ حصة</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Link href="/" className="btn-primary font-medium py-2.5 w-1/2">اشترك في الكورس</Link>
        <Link href="/" className="btn-outLine-primary font-medium py-2.5 w-1/2">احجز المعلم</Link>
      </div>
    </div>
  );
};

export default CourseCard;
