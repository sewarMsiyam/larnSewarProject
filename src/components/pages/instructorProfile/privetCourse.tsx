"use client";
import React, { useEffect, useState } from 'react';
import { TabsContent } from "@/components/ui/tabsProfile"
import { fetchAllToken, CreateCourseFun } from '@/app/api/dataFetch';
import { OfficeHours } from '@/app/api/interfaces'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

type CheckoutFormProps = {
    token: string;
};
const formatTimeTo12Hour = (time: string): string => {
    // {formatTimeTo12Hour(duration.from_time)}
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'م' : 'ص';
    const hour12 = hoursNum % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};
export default function PrivetCourse({ token }: CheckoutFormProps) {
    const [studentsSubscribe, setStudentsSubscribe] = useState<OfficeHours[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        zoom_link: "",
    });
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

    useEffect(() => {
        const loadStudentsSubscribe = async () => {
            if (token) {
                try {
                    const fetchedStudents = await fetchAllToken(`instructor/students`, token);
                    if (Array.isArray(fetchedStudents)) {
                        setStudentsSubscribe(fetchedStudents);
                    } else {
                        setError('البيانات المستلمة غير صحيحة');
                    }
                } catch (err) {
                    setError('حدث خطأ أثناء تحميل البيانات');
                } finally {
                    setLoading(false);
                }
            }
        };
        loadStudentsSubscribe();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedAppointmentId) {
            toast.error("لم يتم تحديد موعد");
            return;
        }
        const courseData = new FormData();
        courseData.append('zoom_link', formData.zoom_link);

        console.log(formData.zoom_link);
        console.log(selectedAppointmentId);
        try {
            const result = await CreateCourseFun(`instructor/students/store_zoom_link/${selectedAppointmentId}`, token, courseData);
            if (result.status) {
                toast.success(result.message || "تم إضافة رابط الزوم بنجاح");
                // Update the local state to reflect the change
                setStudentsSubscribe(prev => prev.map(student => 
                    student.id === selectedAppointmentId ? { ...student, zoom_link: formData.zoom_link } : student
                ));
                setFormData({ zoom_link: "" });
            } else {
                toast.error(result.message || "فشل في إضافة رابط الزوم");
            }
        } catch (error: any) {
            console.error("Error adding Zoom link:", error);
            toast.error(error.message || "فشل في إضافة رابط الزوم");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col lg:flex-row gap-2">
                    <h4 className='font-bold text-lg'> مواعيد الخصوصي </h4>
                    <p className='text-gray-300'>عدد الحجوزات  <span className='text-gray-950'>{studentsSubscribe.length}</span></p>
                </div>
            </div>

            <table className="border-separate border-spacing-y-5 w-full">
                <thead>
                    <tr>
                        <th className="text-start">#</th>
                        <th className="text-start">اسم الطالب</th>
                        <th className="text-start">التاريخ</th>
                        <th className="text-start">الوقت</th>
                        <th className="text-start">رابط الزوم</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsSubscribe.map((student, index) => (
                        <tr key={student.id} className="">
                            <td className="px-5 py-5 font-bold bg-[#FAFAFA] rounded-s-2xl ">{index + 1}</td>
                            <td className="bg-[#FAFAFA]">{student.student_name}</td>
                            <td className="bg-[#FAFAFA]">{student.date}</td>
                            <td className="bg-[#FAFAFA]">{formatTimeTo12Hour(student.from_time)} - {formatTimeTo12Hour(student.to_time)}</td>
                            <td className="bg-[#FAFAFA]">
                                {student.zoom_link ? (
                                    <a
                                        href={student.zoom_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[100px] lg:w-[200px] text-nowrap block text-ellipsis overflow-hidden text-blue-600 hover:underline hover:decoration-sky-500/30"
                                    >
                                        <span className="ms-1">↗</span>
                                        {student.zoom_link}
                                    </a>
                                ) : (
                                    <AlertDialog>
                                        <AlertDialogTrigger 
                                            className="bg-primary text-white py-3 px-5 rounded-2xl"
                                            onClick={() => setSelectedAppointmentId(student.id)}
                                        >
                                            اضافة رابط
                                        </AlertDialogTrigger>
                                        <AlertDialogContent  dir="rtl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-start mb-5">اضف رابط زوم للطالب {student.student_name}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <form onSubmit={handleSubmit} className="text-start">
                                                        <div className="mb-4">
                                                            <Label className="block text-sm font-medium text-gray-700">رابط الزوم</Label>
                                                            <Input
                                                                type="text"
                                                                id="zoom_link"
                                                                value={formData.zoom_link}
                                                                onChange={handleChange}
                                                                className="border-none mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                                            />
                                                        </div>
                                                        <AlertDialogFooter className="gap-2 mt-4">
                                                             <AlertDialogAction className="text-white w-full rounded-full " onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSubmit(e as any);
                                                            }}>
                                                                إضافة الرابط
                                                            </AlertDialogAction>
                                                            <AlertDialogCancel className="w-full rounded-full ">إلغاء</AlertDialogCancel>
                                                        </AlertDialogFooter>
                                                    </form>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}