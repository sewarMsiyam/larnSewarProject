import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Instructors } from '@/app/api/interfaces';

const renderInstructorCard = (instructor: Instructors) => (
  <div key={instructor.id} className='flex flex-col justify-center items-center bg-white shadow-sm rounded-3xl p-5 space-y-4'>
    <Avatar>
      <AvatarImage src={instructor.image} alt={instructor.name} className="rounded-full" />
      <AvatarFallback>{instructor.name[0]}</AvatarFallback>
    </Avatar>
    <h3 className="font-bold text-lg">{instructor.name}</h3>
    <p className="font-bold text-primary">{instructor.category.name}</p>
    <p className="text-ellipsis w-full px-5 text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis ">
      {instructor.description}
    </p>

    <Link href={`/instructor/${instructor.id}`} className="w-full text-center rounded-2xl py-3 border border-primary font-bold text-primary hover:text-white hover:btn-primary transition-all duration-200">احجز خصوصي</Link>
  </div>
);

export default renderInstructorCard;
