
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import Star from '@/components/svgIcon/star';

export default function InstructorsDetals() {

//      const breadcrumbs = [
//     { label: 'الرئيسية', href: '/' },
//     { label: 'المعلمين', href: '/instructor', isActive: true }
//     { label: 'تفاصيل المعلم', href: '/instructor/[id]', isActive: true }
//   ]

  
    return (
    <>
         {/* <Breadcrumb breadcrumbs={breadcrumbs} /> */}


        <section className="container bg-gridColor lg:h-[229.52px] rounded-xl p-10 flex items-end">
            <div className="flex flex-col md:flex-row justify-between items-center w-full relative -mb-16">
                <div className="flex gap-5 items-center">
                    <div>
                        <Avatar>
                            <AvatarImage
                                src='/'
                                alt="Teacher Image"
                                className="shadow rounded-full"
                            />
                            <AvatarFallback>s</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">الأستاذ محمد علي</h4>
                        <p className="text-primary">مدرس لغة إنجليزية</p>
                    </div>
                </div>
                <div className="hidden md:flex gap-1 items-center ">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <span className="text-[#707070] text-sm px-2"> (300) تقييم</span>
                </div>
           </div>
        </section>

        <section className="mt-16 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-10">
            <div className="flex items-start gap-3">
                <img src="/moahelat.svg" alt="" />
                <div>
                    <h4 className="font-bold">المؤهلات:</h4>
                    <ul className="mt-3">
                        <li>درجة البكالوريوس في الأدب الإنجليزي من جامعة كامبريدج</li>
                        <li><span className="w-5 h-5bg-[#FF6F61] d-block"></span></li>
                        <li>درجة الماجستير في اللسانيات التطبيقية من جامعة أكسفورد</li>
                        <li>شهادة TEFL (تدريس الإنجليزية كلغة أجنبية)</li>
                    </ul>
                </div>
            </div>
            {/* المؤهلات:
درجة البكالوريوس في الأدب الإنجليزي من جامعة كامبريدج
درجة الماجستير في اللسانيات التطبيقية من جامعة أكسفورد
شهادة TEFL (تدريس الإنجليزية كلغة أجنبية) */}
        </section>
    </>
    );
}