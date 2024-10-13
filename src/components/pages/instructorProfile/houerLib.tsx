"use client";
import { useEffect, useState, useCallback,useMemo } from 'react';
import { TabsContent } from "@/components/ui/tabsProfile"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateCourseFun, fetchAllToken } from "@/app/api/dataFetch";
import { OfficeHours } from '@/app/api/interfaces';

type CheckoutFormProps = {
    token: string;
};

export default function HouerLib({ token }: CheckoutFormProps) {
    const [officeHours, setOfficeHours] = useState<OfficeHours[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        date: "",
        from_time: "",
        to_time: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const bookedDates = useMemo(() => {
        return new Set(officeHours.map(hour => hour.date));
    }, [officeHours]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const disablePastDates = (date: Date) => {
        return date < new Date(new Date().setHours(0, 0, 0, 0));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, date: formattedDate }));
        } else {
            setFormData(prev => ({ ...prev, date: "" }));
        }
    };

    const formatDate = (date: Date | string | undefined): string => {
        if (!date) return "لم يتم اختيار تاريخ";
        let dateObj: Date;
        if (typeof date === 'string') {
            dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) {
                return "تاريخ غير صالح";
            }
        } else {
            dateObj = date;
        }
        return dateObj.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    const formatTimeTo12Hour = (time: string): string => {
        const [hours, minutes] = time.split(':');
        const hoursNum = parseInt(hours, 10);
        const ampm = hoursNum >= 12 ? 'م' : 'ص';
        const hour12 = hoursNum % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.date) newErrors.date = "الرجاء اختيار يوم";
        if (!formData.from_time) newErrors.from_time = "الرجاء تحديد وقت البدء";
        if (!formData.to_time) newErrors.to_time = "الرجاء تحديد وقت الانتهاء";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        const courseData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                courseData.append(key, value.toString());
            }
        });
        try {
            const result = await CreateCourseFun("instructor/instructor_office_hours", token, courseData);
            if (result.status) {
                toast.success(result.message || "تم إضافة الموعد بنجاح");
                setFormData({ date: "", from_time: "", to_time: "" });
                setSelectedDate(undefined);
                loadOfficeHours(); 
            } else {
                toast.error(result.message || "فشل في إضافة الموعد");
            }
        } catch (error: any) {
            console.error("Error adding office hour:", error);
            toast.error(error.message || "حدث خطأ أثناء إضافة الموعد");
        } finally {
            setIsLoading(false);
        }
    };

    const loadOfficeHours = useCallback(async () => {
        if (token) {
            setIsLoading(true);
            try {
                const fetched = await fetchAllToken(`instructor/instructor_office_hours`, token);
                if (Array.isArray(fetched)) {
                    setOfficeHours(fetched);
                } else {
                    setError('البيانات المستلمة غير صحيحة');
                }
            } catch (err) {
                setError('حدث خطأ أثناء تحميل البيانات');
            } finally {
                setIsLoading(false);
            }
        }
    }, [token]);

    useEffect(() => {
        loadOfficeHours();
    }, [loadOfficeHours]);

    return (
        <>
            <TabsContent value="houerLib" className="bg-white rounded-lg p-2 lg:p-10 shadow-md">
            <ToastContainer />

            <h3 className="text-xl font-semibold mb-4">الساعات المكتبية الحالية</h3>
            {officeHours.length > 0 ? (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {officeHours.map((hour, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded-lg">
                            <p className="font-medium">{formatDate(hour.date)}</p>
                            <p>من: {formatTimeTo12Hour(hour.from_time)} - إلى: {formatTimeTo12Hour(hour.to_time)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mb-6">لا توجد ساعات مكتبية مضافة حاليًا.</p>
            )}

                <h3 className="my-5 ">اضافة الأوقات التي تستطيع فيها اعطاء دروس خصوصي</h3>
                <div className="grid col-span-1 lg:grid-cols-3 gap-5">
                    <div className="col-span-2">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={disablePastDates}
                            className="rounded-xl shadow-sm border w-full"
                            modifiers={{ booked: (date) => bookedDates.has(date.toISOString().split('T')[0]) }}
                            modifiersStyles={{
                                booked: { backgroundColor: '#3b82f6', color: 'white' }
                            }}
                        />
                    </div>
                    <div className="col-span-1">
                        <p>التاريخ المختار: {formatDate(selectedDate)}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">من</Label>
                                <Input
                                    type="time"
                                    id="from_time"
                                    value={formData.from_time}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder=""
                                />
                                {errors.from_time && <p className="text-red-500 text-xs mt-1">{errors.from_time}</p>}
                            </div>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">إلى</Label>
                                <Input
                                    type="time"
                                    id="to_time"
                                    value={formData.to_time}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder=""
                                />
                                {errors.to_time && <p className="text-red-500 text-xs mt-1">{errors.to_time}</p>}
                            </div>
                            <Button type="submit" disabled={isLoading} className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl w-full font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-[350px]">
                                {isLoading ? "جاري الإضافة..." : "إضافة الموعد"}                            
                            </Button>
                        </form>
                    </div>
                </div>
            </TabsContent>
        </>
    );
}