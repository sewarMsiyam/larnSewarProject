
"use client";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import Star from '@/components/svgIcon/star';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import { Skeleton } from "@/components/ui/skeleton"
import BookPrivate from '@/components/pages/instructor/BookPrivate';
import CourseInstrctor from '@/components/pages/instructor/CourseInstrctor';
import Opinions from '@/components/home/body/Opinions';

interface DetailsInstructorsProps {
    id: number;
}

export default function DetailsInstructors({ id }: DetailsInstructorsProps) {

    const [instructor, setInstructor] = useState<Instructors | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const endpoint = 'instructors';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne(endpoint, id.toString());
                if (data) {
                    setInstructor(data);
                } else {
                    setError('Instructor not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);



    if (loading) {
        return (
            <>
                <section className="container bg-gridColor lg:h-[229.52px] rounded-xl p-10 flex items-end">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full relative -mb-16">
                        <div className="flex gap-5 items-center">
                            <div>
                                <Avatar>
                                    <AvatarImage
                                        src=''
                                        alt="Teacher Image"
                                        className="shadow rounded-full"
                                    />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <Skeleton className="w-24 h-5 mb-2" />
                                <Skeleton className="w-14 h-5" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-12 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 lg:p-10 space-y-10">
                    <Skeleton className="w-full h-24 mb-2" />
                </section>
            </>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!instructor) {
        return <p>No instructor data available.</p>;
    }


    return (
        <>
            <section className="container bg-gridColor lg:h-[229.52px] rounded-xl p-10 flex items-end">
                <div className="flex flex-col md:flex-row justify-between items-center w-full relative -mb-16">
                    <div className="flex gap-5 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage
                                    src={instructor.image}
                                    alt="Teacher Image"
                                    className="shadow rounded-full"
                                />
                                <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">{instructor.name}</h4>
                            <p className="text-primary">{instructor.specialist}</p>
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

            <section className="my-12 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 lg:p-10 space-y-10">
                {instructor.description}

                {/* <div className="flex items-start gap-3">
                    <img src="/moahelat.svg" alt="" />
                    <div>
                        <h4 className="font-bold">المؤهلات:</h4>
                        <ul className="mt-3">
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> درجة البكالوريوس في الأدب الإنجليزي من جامعة كامبريدج</li>
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> درجة البكالوريوس في الأدب الإنجليزي من جامعة كامبريدج</li>
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> درجة الماجستير في اللسانيات التطبيقية من جامعة أكسفورد</li>
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> شهادة TEFL (تدريس الإنجليزية كلغة أجنبية)</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <img src="/kebra.png" alt="" />
                    <div>
                        <h4 className="font-bold">الخبرة:</h4>
                        <p className="mt-3">
                            أكثر من 8 سنوات من الخبرة في تدريس اللغة الإنجليزية، حيث عملت مع طلاب من مختلف الأعمار والمستويات اللغوية، من المدارس الابتدائية إلى البالغين. تتخصص في تدريس اللغة الإنجليزية كلغة ثانية، وقواعد اللغة، ومهارات الكتابة، وتحليل الأدب. خلفية قوية في مساعدة الطلاب على تحسين فهم القراءة، وكتابة المقالات، ومهارات التواصل.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <img src="/engaz.png" alt="" />
                    <div>
                        <h4 className="font-bold">الانجازات:</h4>
                        <ul className="mt-3">
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> تأليف عدة أدلة لقواعد اللغة الإنجليزية للمتعلمين</li>
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> قيادة ورش عمل حول الكتابة الإبداعية وتطوير المقالات</li>
                            <li><span className="w-2 h-2 bg-[#FF6F61] inline-block mx-1"></span> مساعدة أكثر من 95% من الطلاب في تحقيق درجات عالية في اختبارات اللغة الإنجليزية الدولية (IELTS، TOEFL)</li>
                        </ul>
                    </div>
                </div>  */}
            </section>

            <section className="mb-12 lg:container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 py-10 lg:p-10 space-y-10">
                <BookPrivate id={instructor.id} />
            </section>


            <section className="mb-8 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-10 space-y-10">
                <CourseInstrctor id={instructor.id} />
            </section>

            <section className="mb-28">
                <Opinions />
            </section>

        </>
    );
}