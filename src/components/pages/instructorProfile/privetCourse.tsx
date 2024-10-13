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
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type CheckoutFormProps = {
    token: string;
};

export default function PrivetCourse({ token }: CheckoutFormProps) {
    const [studentsSubscribe, setStudentsSubscribe] = useState<OfficeHours[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        zoom_link: "",
    });
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        loadStudentsSubscribe();
    }, [token]);

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

        try {
            const result = await CreateCourseFun(`instructor/students/store_zoom_link/${selectedAppointmentId}`, token, courseData);
            if (result.status) {
                toast.success(result.message || "تم إضافة رابط الزوم بنجاح");
                setStudentsSubscribe(prev => prev.map(student =>
                    student.id === selectedAppointmentId ? { ...student, zoom_link: formData.zoom_link } : student
                ));
                setFormData({ zoom_link: "" });
                setIsDialogOpen(false);
                await loadStudentsSubscribe();
            } else {
                toast.error(result.message || "فشل في إضافة رابط الزوم");
            }
        } catch (error: any) {
            console.error("Error adding Zoom link:", error);
            toast.error(error.message || "فشل في إضافة رابط الزوم");
        }
    };

    return (
        <TabsContent value="privetCourse" className="bg-white rounded-lg p-2 lg:p-10 shadow-md">
            <ToastContainer />
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
                            <td className="bg-[#FAFAFA]">{student.from_time} - {student.to_time}</td>
                            <td className="bg-[#FAFAFA]">
                                {student.zoom_link ? (
                                    <a
                                        href={student.zoom_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[200px] text-nowrap block text-ellipsis overflow-hidden text-blue-600 hover:underline hover:decoration-sky-500/30"
                                    >
                                        <span className="ms-1">↗</span>
                                        {student.zoom_link}
                                    </a>
                                ) : (
                                    <>
                                    <AlertDialog dir="rtl" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <AlertDialogTrigger
                                            className="bg-primary text-white py-3 px-5 rounded-2xl"
                                            onClick={() => {
                                                setSelectedAppointmentId(student.id);
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            اضافة رابط
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>اضف رابط زوم للطالب {student.student_name}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mb-4">
                                                            <Label className="block text-sm font-medium text-gray-700">رابط الزوم</Label>
                                                            <Input
                                                                type="text"
                                                                id="zoom_link"
                                                                value={formData.zoom_link}
                                                                onChange={handleChange}
                                                                className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div onClick={() => setIsDialogOpen(false)}>إلغاء</div>
                                                            <Button  type="submit" disabled={loading}>
                                                                 {loading ? "جاري إضافة الرابط..." : "إضافة الرابط"}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TabsContent>
    );
}