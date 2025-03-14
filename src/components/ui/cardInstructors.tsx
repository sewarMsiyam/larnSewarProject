import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Instructors } from '@/app/api/interfaces';

const renderInstructorCard = (instructor: Instructors) => (
  <div key={instructor.id} className='flex flex-col justify-between items-center bg-white shadow-sm rounded-3xl p-5 '>
    <Avatar className="mb-3">
      <AvatarImage src={instructor.image} alt={instructor.name} className="rounded-full" />
      <AvatarFallback>{instructor.name[0]}</AvatarFallback>
    </Avatar>
    <h3 className="font-bold text-lg mb-1 ">{instructor.name}</h3>
    <span className="font-bold text-primary mb-3"> {instructor.specialization}</span>
    <p className="text-center text-ellipsis w-full px-5 text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis mb-3">
      {instructor.achievement}
    </p>

      {/* {instructor.skills.length > 0 && ( space-y-4
      <div className="flex flex-wrap justify-center gap-2">
        {instructor.skills.map((skill, index) => (
          <p key={index} className="text-sm bg-[#EEEEEE] px-4 py-2 rounded-2xl">
            {skill}
          </p>
        ))}
      </div>
    )} */}



    <Link
      href={`/instructor/${instructor.id}`}
      className="w-full text-center rounded-2xl py-3 border border-primary font-bold text-primary hover:text-white hover:bg-primary transition-all duration-200"
    >
      احجز خصوصي
    </Link>
  </div>
);

export default renderInstructorCard;
