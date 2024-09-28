"use client";
import { useEffect, useState } from 'react';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import { Calendar } from "@/components/ui/calendar"
import Link from 'next/link';

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
            return true; // Если даты не загружены, считаем все даты недоступными
        }
        return !availableDates.some(availableDate =>
            availableDate.toDateString() === date.toDateString()
        );
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
                    <p className="text-sm text-[#707070] ps-5 ">
                            الأيام المتاح فيها المعلم هي  
                            <span className="mx-2">(
                                {instructor.instructor_durations.length > 0 && (
                                <>
                                    {instructor.instructor_durations
                                        .map((duration) => duration.day)
                                        .join(' - ')}
                                </>
                            )}
                            )</span>        
                    </p>
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
              
            {selectedDate && (
                <div className="col-span-1">
                    <h3 className="font-bold text-xl mb-3">
                        حدد الوقت المناسب
                        <span className="text-sm text-[#707070] ps-5">(حدد موعدك المناسب)</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-5 mb-5">
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
                            <Link
                                href={{
                                    pathname: '/checkout_private',
                                    query: {
                                        id: instructor.id,
                                        date: selectedDate.toISOString(),
                                        time: selectedTime
                                    }
                                }}
                                className="w-full block text-center btn-primary font-medium py-2.5 before:ease relative overflow-hidden btn-primary px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                            >
                                احجز المعلم
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}