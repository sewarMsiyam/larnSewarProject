
"use client";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import Star from '@/components/svgIcon/star';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar"


export default function InstructorsDetals({ params }: Instructors) {

    const [instructor, setInstructor] = useState<Instructors | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const endpoint = 'instructors';


    // دالة لتحويل اليوم إلى رقم اليوم من الأسبوع
    const getDayOfWeek = (dayString: string) => {
        const daysOfWeek = {
            'الأحد': 0,
            'الاثنين': 1,
            'الثلاثاء': 2,
            'الأربعاء': 3,
            'الخميس': 4,
            'الجمعة': 5,
            'السبت': 6,
        };
        return daysOfWeek[dayString];
    };


    // دالة عند اختيار تاريخ جديد
    //   const handleSelectDate = (date: Date) => {
    //     if (selectedDates.includes(date)) {
    //       setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()));
    //     } else if (selectedDates.length < 3) {
    //       setSelectedDates([...selectedDates, date]);
    //     }
    //   };


    const handleSelectDate = (date: Date) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()));
        } else if (selectedDates.length < 3) {
            setSelectedDates([...selectedDates, date]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne(endpoint, params.id);
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
    }, [params.id]);



    // بعد جلب بيانات الأيام المتاحة، نعينها كتاريخ فعلي
    useEffect(() => {
        if (instructor && instructor.instructor_durations.length > 0) {
            const currentMonthDates = [];
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();

            instructor.instructor_durations.forEach((duration) => {
                const dayOfWeek = getDayOfWeek(duration.day);

                for (let i = 1; i <= 31; i++) {
                    const date = new Date(year, month, i);
                    if (date.getMonth() === month && date.getDay() === dayOfWeek) {
                        currentMonthDates.push(date);
                    }
                }
            });

            setSelectedDates(currentMonthDates);
        }
    }, [instructor]);


    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const times = [
        '08:00 ص - 10:00 ص',
        '10:00 ص - 12:00 م',
        '12:00 م - 02:00 م',
        '02:00 م - 04:00 م',
        '04:00 م - 06:00 م',
        '06:00 م - 08:00 م'
    ];

    // دالة لاختيار الوقت
    const handleSelectTime = (time: string) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter(t => t !== time));
        } else if (selectedTimes.length < 1) {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    if (loading) {
        return (
            <div className="grid">
                {/* <Skeleton className="h-10 w-40" /> */}
            </div>
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
            <Breadcrumb className="container mb-3 mt-3">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-[#333333] font-medium">الرئيسية</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 25 25"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_516_4347)">
                                <path
                                    d="M8.42761 13.305L13.7916 18.669L12.3776 20.083L4.59961 12.305L12.3776 4.52698L13.7916 5.94098L8.42761 11.305L20.5996 11.305V13.305H8.42761Z"
                                    fill="#333333"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_516_4347">
                                    <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="matrix(-1 0 0 -1 24.5996 24.3051)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components" className="text-primary font-bold">تفاصيل المعلم</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

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
                            {/* <p className="text-primary">{instructor.category.name}</p> */}
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
                </div> */}
            </section>


            <section className="mb-12 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-10 space-y-10">
                <div className="flex col-span-1 lg:col-span-2 gap-10">
                    <div className="col-span-1 w-full">
                        <h3 className="font-bold text-xl mb-3">حدد التاريخ المناسب</h3>
                        <div className=''>

                            {instructor.instructor_durations.length > 0 && (
                                <>
                                    {instructor.instructor_durations.map((duration) => (
                                        <span>{duration.day}</span>
                                    ))}
                                </>
                            )}

                                                        <Calendar
                                mode="multiple"
                                selected={selectedDates}
                                onSelect={handleSelectDate}
                                className="rounded-xl shadow-sm border w-full"
                            />
                            {/* <Calendar
                                mode="single"
                                selected={selectedDates}
                                onSelect={handleSelectDate}
                                className="rounded-xl shadow-sm border w-full"
                            /> */}

                        </div>
                    </div>
                    <div className="col-span-1">
                        <h3 className="font-bold text-xl mb-3">
                            حدد الوقت المناسب
                            <span className="text-sm text-[#707070] ps-5">(حدد موعدين على الأكثر)</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            {times.map((time, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelectTime(time)}
                                    className={`col-span-1 font-semibold border border-[#F2F2F3] rounded-2xl px-7 py-3 cursor-pointer ${selectedTimes.includes(time)
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-[#F2F2F3] hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>

                        {/* {date && (
                            <h3 className="font-bold mb-3">
                                <span>:التاريخ</span>
                                <span className="text-primary ps-3">{date.toLocaleDateString()}</span>
                            </h3>onSelect
                        )} */}

                        {selectedDates.length > 0 && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-semibold">Selected Dates:</p>
                                {selectedDates.map((date, index) => (
                                    <p key={index}>{date.toLocaleDateString()}</p>
                                ))}
                            </div>
                        )}


                        <div className="grid grid-cols-2 gap-5 mb-5">
                            {selectedTimes.map((time, index) => (
                                <div
                                    key={index}
                                    className="col-span-1 flex gap-2 font-semibold bg-[#F2F2F3] rounded-2xl px-7 py-3"
                                >
                                    <span
                                        onClick={() => handleSelectTime(time)}
                                        className="bg-[#E2E2E2] text-[#EA4335] rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                                    >
                                        x
                                    </span>
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}