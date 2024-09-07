import TitleSection from '@/components/title';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Star from '@/components/svgIcon/star';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Opinions() {
    return (
        <>
            <div className="container mt-20">
                <TitleSection text="آراء طلابنا" />
                <div className='container'>

                    <Carousel dir='ltr'>
                        <CarouselContent dir='rtl'>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="md:basis-1/2">
                                     <div className="bg-[#F5F5F5] p-8 rounded-xl">
                                    <div className="flex gap-2 mb-3">
                                        <Star /><Star /><Star /><Star /><Star />
                                    </div>
                                    <p className="text-[#333333] text-justify mb-3">
                                        التجربة كانت أكثر من رائعة! الحجز عبر المنصة كان سهلاً جداً، وتمكنت من اختيار المعلم المناسب لمستواي. الحصة تمت عبر زوم، وكانت تفاعلية ومليئة بالمعلومات المفيدة. شعرت بفرق كبير في مستوى فهمي للمادة منذ أن بدأت باستخدام هذه المنصة، وأخطط لاستمرار استخدام الخدمة لتحسين مستواي.
                                    </p>
                                    <div className="flex gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
                                            <AvatarFallback>SA</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h5 className=" text-[#333333] opacity-90">محمد احمد</h5>
                                            <p className="text-xs text-[#333333]">طالب ثانوي</p>
                                        </div>
                                    </div>
                                </div>
                                </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext />
                    </Carousel>                    
                </div>
            </div>
        </>
    );
}

