import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCheckoutCourse = () => (
    <div className='bg-white rounded-2xl shadow-md flex flex-col items-center justify-start space-y-10'>
        <Skeleton className='h-[288px] w-full rounded-t-2xl' />

         <div className="px-8 py-5 space-y-2 w-full">
                <Skeleton className="w-4/5 h-6 rounded-3xl" />
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-6 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-6 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-6 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                <div className="flex justify-between items-center w-full">
                   <Skeleton className="h-6 w-12 rounded-lg" />
                   <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
            </div>
    </div>
);

export default SkeletonCheckoutCourse;
