
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonInstructor = () => (
    <div className='flex flex-col justify-center items-center bg-white shadow-sm  rounded-3xl p-5 space-y-4'>
        <Skeleton className="h-28 w-28 rounded-full" />
        <Skeleton className="w-40 h-6 rounded-3xl" />
        <Skeleton className="w-44 h-6 rounded-3xl" />
        <Skeleton className="w-full h-7 rounded-3xl" />
        <Skeleton className="w-full h-12 rounded-2xl" />
    </div>
);

export default SkeletonInstructor;
