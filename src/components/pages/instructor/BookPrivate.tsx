"use client";
import { useEffect, useState } from 'react';
import '@/app/globals.css';
import { fetchOne } from '@/app/api/dataFetch';
import { Calendar } from "@/components/ui/calendar"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';

interface DetailsInstructorsProps {
    id: number;
}

interface OfficeHour {
    id: number;
    day: string;
    from_time: string;
    to_time: string;
}

interface Instructor {
    id: number;
    hourly_rate_price: number;
    instructor_office_hours: OfficeHour[];
}

type DayMapType = {
    [key: string]: number;
};

type DayMapArType = {
    [key: string]: string;
};

const DAYS_MAP: DayMapType = {
    'saturday': 6,
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5
} as const;

const DAYS_MAP_AR: DayMapArType = {
    'saturday': 'السبت',
    'sunday': 'الأحد',
    'monday': 'الإثنين',
    'tuesday': 'الثلاثاء',
    'wednesday': 'الأربعاء',
    'thursday': 'الخميس',
    'friday': 'الجمعة'
} as const;

export default function BookPrivate({ id }: DetailsInstructorsProps) {
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableTimes, setAvailableTimes] = useState<OfficeHour[]>([]);
    const [selectedTime, setSelectedTime] = useState<OfficeHour | null>(null);
    const { data: session } = useSession();
    const [availableDays, setAvailableDays] = useState<string[]>([]);

    // Helper function to get unique days
    const getUniqueDays = (officeHours: OfficeHour[]): string[] => {
        return Array.from(new Set(officeHours.map(oh => oh.day)));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne('instructors', id.toString());
                if (data) {
                    setInstructor(data);
                    const uniqueDays = getUniqueDays(data.instructor_office_hours);
                    setAvailableDays(uniqueDays);
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

    const isDateAvailable = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (date < today) {
            return false;
        }

        const dayOfWeek = date.getDay();
        return availableDays.some(day => DAYS_MAP[day] === dayOfWeek);
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date && instructor && isDateAvailable(date)) {
            setSelectedDate(date);
            const dayName = Object.keys(DAYS_MAP).find(
                key => DAYS_MAP[key] === date.getDay()
            );
            if (dayName) {
                const availableHours = instructor.instructor_office_hours.filter(
                    oh => oh.day === dayName
                );
                setAvailableTimes(availableHours);
                if (availableHours.length > 0) {
                    setSelectedTime(availableHours[0]);
                }
            }
        }
    };

    const handleTimeSelect = (time: OfficeHour): void => {
        setSelectedTime(time);
    };

    const formatTime = (timeString: string): string => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('EN-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-lg font-medium text-gray-600">جاري تحميل البيانات...</p>
            </div>
        );
    }
    
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!instructor) return <p className="text-center">لا توجد بيانات متاحة.</p>;

    return (
        <div className="grid col-span-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex flex-col lg:flex-row">
                        <h3 className="font-bold text-xl mb-3">
                            حدد التاريخ المناسب
                        </h3>
                        {availableDays.length > 0 && (
                            <p className="text-sm text-[#707070] ps-5">
                                الأيام المتاحة: {availableDays.map(day => DAYS_MAP_AR[day as keyof typeof DAYS_MAP_AR]).join('، ')}
                            </p>
                        )}
                        {availableDays.length <= 0 && (
                            <p className="text-sm text-[#707070] ps-5">لا يوجد أيام متاحة لدى المعلم</p>
                        )}
                    </div>
                    <p className="text-[#FE7A36] px-3">سعر الحصة الخصوصي <span className="font-bold">{instructor.hourly_rate_price}$</span></p>
                </div>
                <Calendar
                     mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => !isDateAvailable(date)}
                    modifiers={{ 
                        available: isDateAvailable,
                        selected: (date) => selectedDate ? date.toDateString() === selectedDate.toDateString() : false 
                    }}
                    className="rounded-xl shadow-sm border w-full [&_.rdp-day_focus]:bg-primary [&_.rdp-day_focus]:text-white"
                    // styles={{
                    //     day: (date:any) => ({
                    //         ...(isDateAvailable(date) && {
                    //             backgroundColor: '#e5f6f6',
                    //             color: '#0f766e',
                    //             fontWeight: 'bold',
                    //         }),
                    //         ...(selectedDate &&
                    //             date.toDateString() === selectedDate.toDateString() && {
                    //             backgroundColor: 'var(--primary)',
                    //             color: 'white',
                    //             fontWeight: 'bold',
                    //         })
                    //     })
                    // }}
                />
            </div>

            <div className="col-span-1">
                <h3 className="font-bold text-xl">
                    حدد الوقت المناسب
                </h3>
                <span className="text-sm text-[#707070]">(اضغط على التوقيت المناسب لك)</span>

                {selectedDate && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-5 text-right text-lg mt-5">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">اليوم: {DAYS_MAP_AR[Object.keys(DAYS_MAP).find(
                                key => DAYS_MAP[key as keyof typeof DAYS_MAP] === selectedDate.getDay()
                            ) as keyof typeof DAYS_MAP_AR]}</span>
                            <span className="text-primary font-semibold">{formatDate(selectedDate)}</span>
                        </div>
                    </div>
                )}

                {selectedDate && (
                    <>
                        
                        <div className="grid grid-cols-1 gap-5 mb-5 mt-3">
                            {availableTimes.map((time) => (
                                <div
                                    key={time.id}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`col-span-1 font-semibold text-sm border border-[#F2F2F3] rounded-2xl p-3 cursor-pointer w-full text-center transition-all duration-200 hover:bg-[#F2F2F3] ${
                                        selectedTime?.id === time.id ? 'bg-[#F2F2F3] border-primary text-primary' : ''
                                    }`}
                                >
                                    {formatTime(time.from_time)} - {formatTime(time.to_time)}
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
                                                from_time: formatTime(selectedTime.from_time),
                                                to_time: formatTime(selectedTime.to_time),
                                            }
                                        }}
                                        className="w-full block text-center btn-primary font-medium py-2.5 before:ease relative overflow-hidden px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                                    >
                                        احجز المعلم
                                    </Link>
                                ) : (
                                    <Dialog>
                                        <DialogTrigger className="w-full block text-center btn-primary font-medium py-2.5 before:ease relative overflow-hidden px-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                                            احجز معلم
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogDescription className="flex flex-col items-center">
                                                    <Image src="/login.png" alt="" width="150" height="150" className="text-center" />
                                                    <p className="text-lg text-dark font-bold my-5">يجب أن تكون مسجلاً في الموقع حتى تتمكن من حجز درس خصوصي</p>
                                                    <div className="flex">
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