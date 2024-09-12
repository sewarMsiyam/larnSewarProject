import Star from '@/components/svgIcon/star';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton"


const SkeletonReview = () => (
    <div className="bg-[#F5F5F5] p-8 rounded-xl animate-pulse">
        <div className="flex gap-2 mb-3">
            <Star /><Star /><Star /><Star /><Star />
        </div>
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="flex gap-3">
           <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
            <div>
                <div className="h-4 bg-gray-300 rounded mb-1">

                </div>
                <div className="h-3 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
);
export default SkeletonReview;