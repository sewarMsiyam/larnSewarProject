"use client";
import { useEffect, useState } from 'react';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
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
    name: string;
    instructor_office_hours: OfficeHour[];
}
export default function BookPrivate({ id }: DetailsInstructorsProps) {
    const [instructor, setInstructor] = useState<Instructors | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableTimes, setAvailableTimes] = useState<OfficeHour[]>([]);
    const [selectedTime, setSelectedTime] = useState<OfficeHour | null>(null);
    const { data: session } = useSession();
    const endpoint = 'instructors';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne(endpoint, id.toString());
                console.log(data.instructor_office_hours)
                if (data) {
                    setInstructor(data);
                    const dates = getAvailableDates(data.instructor_office_hours);
                    setAvailableDates(dates);
                    console.log(dates)
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

    const getAvailableDates = (officeHours: OfficeHour[]): Date[] => {
        return officeHours.map(oh => new Date(oh.day));
    };
    const handleDateSelect = (date: Date | undefined) => {
        if (date && instructor) {
            setSelectedDate(date);
            const selectedDateString = date.toLocaleDateString('en-CA').split('T')[0];
            const availableHours = instructor.instructor_office_hours.filter(
                oh => oh.day === selectedDateString // Changed 'date' to 'day'
            );
            setAvailableTimes(availableHours);
            setSelectedTime(null);
        }
    };
    

    const handleTimeSelect = (time: OfficeHour) => {
        setSelectedTime(time);
    };

    const isDateUnavailable = (date: Date) => {
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

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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
                    {instructor.instructor_office_hours.length > 0 && (
                        <p className="text-sm text-[#707070] ps-5 ">
                            الأيام المتاح فيها المعلم
                        </p>
                    )}
                    {instructor.instructor_office_hours.length <= 0 && (
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
                            {availableTimes.map((time) => (
                                <div
                                    key={time.id}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`col-span-1 font-semibold text-sm border border-[#F2F2F3] rounded-2xl p-3 cursor-pointer w-full text-center ${selectedTime === time ? 'bg-[#F2F2F3] border-primary text-primary' : ''
                                        }`}>
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
                                                from_time: `${formatTime(selectedTime.from_time)}`,
                                                to_time: `${formatTime(selectedTime.to_time)}`,
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