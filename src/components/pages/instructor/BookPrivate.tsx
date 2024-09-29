"use client";
import { useEffect, useState } from 'react';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';


interface DetailsInstructorsProps {
    id: number;
}

export default function BookPrivate({ id }: DetailsInstructorsProps) {
    const [instructor, setInstructor] = useState<Instructors | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const { data: session } = useSession();
    const endpoint = 'instructors';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne(endpoint, id.toString());
                if (data) {
                    setInstructor(data);
                    const dates = getAvailableDates(data.instructor_durations);
                    setAvailableDates(dates);
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

    const getAvailableDates = (durations: any[]): Date[] => {
        const currentMonthDates: Date[] = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        durations.forEach((duration) => {
            const dayOfWeek = getDayOfWeek(duration.day);
            for (let i = 1; i <= 31; i++) {
                const date = new Date(year, month, i);
                if (date.getMonth() === month && date.getDay() === dayOfWeek) {
                    currentMonthDates.push(date);
                }
            }
        });

        return currentMonthDates;
    };

    const getDayOfWeek = (dayString: string): number => {
        const daysOfWeek: { [key: string]: number } = {
            'الأحد': 0, 'الإثنين': 1, 'الثلاثاء': 2, 'الأربعاء': 3,
            'الخميس': 4, 'الجمعة': 5, 'السبت': 6,
        };
        return daysOfWeek[dayString] ?? -1;
    };

    const handleDateSelect = async (date: Date | undefined) => {
        if (date && instructor) {
            setSelectedDate(date);
            const dayName = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][date.getDay()];
            const availableDuration = instructor.instructor_durations.find(duration => duration.day === dayName);

            if (availableDuration) {
                setAvailableTimes([`${availableDuration.from_time} - ${availableDuration.to_time}`]);
            } else {
                setAvailableTimes([]);
            }
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const isDateUnavailable = (date: Date) => {
        if (!availableDates || availableDates.length === 0) {
            return true;
        }
        return !availableDates.some(availableDate =>
            availableDate.toDateString() === date.toDateString()
        );
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) return <div className="grid">Loading...</div>;
    if (error) return <p>{error}</p>;
    if (!instructor) return <p>No instructor data available.</p>;

    return (
        <div className="grid col-span-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
                <div className="flex flex-col lg:flex-row">
                    <h3 className="font-bold text-xl mb-3">
                        حدد التاريخ المناسب
                    </h3>
                    {instructor.instructor_durations.length > 0 && (
                        <p className="text-sm text-[#707070] ps-5 ">
                            الأيام المتاح فيها المعلم هي
                            <span className="mx-2">(
                                {instructor.instructor_durations
                                    .map((duration) => duration.day)
                                    .join(' - ')}
                                )</span>
                        </p>
                    )}

                    {instructor.instructor_durations.length <= 0 && (
                        <p className="text-sm text-[#707070] ps-5 ">لا يوجد ايام فراغ لدى المعلم</p>
                    )}
                </div>

                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={isDateUnavailable}
                    modifiers={{ unavailable: isDateUnavailable }}
                    modifiersStyles={{
                        unavailable: {
                            color: '#ccc',
                            position: 'relative',
                        }
                    }}
                    components={{
                        DayContent: ({ date }) => (
                            <div className="relative w-full h-full flex items-center justify-center">
                                {date.getDate()}
                                {isDateUnavailable(date) && (
                                    <span></span>
                                )}
                            </div>
                        ),
                    }}
                    className="rounded-xl shadow-sm border w-full"
                />
            </div>

            <div className="col-span-1">
                <h3 className="font-bold text-xl">
                    حدد الوقت المناسب
                </h3>
                <span className="text-sm text-[#707070] ">( اختار يومك المناسب من الايام المتاحة ثم حدد وقتك المناسب)</span>
                {selectedDate && (
                    <>
                        <div className="grid grid-cols-1 gap-5 mb-5 mt-3">
                            {availableTimes.map((time, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`col-span-1 font-semibold text-sm border border-[#F2F2F3] rounded-2xl p-3 cursor-pointer w-full text-center ${selectedTime === time ? 'bg-[#F2F2F3] border-primary text-primary' : ''
                                        }`}>
                                    {time}
                                </div>
                            ))}
                        </div>
                        {selectedTime && (
                            <div className="w-full">
                                {session ? (
                                    <Link
                                        href={{
                                            pathname: '/checkout_private',
                                            query: {
                                                id: instructor.id,
                                                date: formatDate(selectedDate),
                                                time: selectedTime
                                            }
                                        }}
                                        className="w-full block text-center btn-primary font-medium py-2.5 before:ease relative overflow-hidden btn-primary px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                                    >
                                        احجز المعلم
                                    </Link>
                                ) : (
                                    <Dialog>
                                        <DialogTrigger className="w-full block text-center btn-primary font-medium py-2.5 before:ease relative overflow-hidden btn-primary px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">احجز معلم</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogDescription className="flex flex-col items-center">
                                                    <Image src="/login.png" alt="" width="150" height="150" className="text-center" />
                                                    <p className="text-lg text-dark font-bold my-5"> يجب ان تكون مسجل بالموقع حتى تتمكن من حجز خصوصي</p>
                                                    <div className="flex ">
                                                        <Link href="/student/login" className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                                                            <span className="relative z-10">تسجيل دخول</span>
                                                        </Link>
                                                        <Link href="/student/register" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 relative overflow-hidden border border-primary text-primary transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-color-gradient before:duration-300 before:ease-out hover:text-white hover:shadow-color-gradient hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                                                            <span className="relative z-10">إنشاء حساب</span>
                                                        </Link>
                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}