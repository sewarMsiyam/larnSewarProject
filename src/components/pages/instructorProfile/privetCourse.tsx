"use client";
import { TabsContent } from "@/components/ui/tabsProfile"


export default function PrivetCourse() {
    return (
        <>
            <TabsContent value="privetCourse" className="bg-white rounded-lg p-2 lg:p-10 shadow-md">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <h4 className='font-bold text-lg'> مواعيد الخصوصي </h4>
                        <p className='text-gray-300'>عدد الحجوزات  <span className='text-gray-950'>0</span></p>
                    </div>
                </div>

                
                <table className="border-separate border-spacing-y-5 w-full">
                    <thead>
                        <tr>
                            <th className="text-start">#</th>
                            <th className="text-start">اسم الطالب</th>
                            <th className="text-start">الدرس</th>
                            <th className="text-start">اسم الكورس</th>
                            <th className="text-start">التاريخ</th>
                            <th className="text-start">الوقت</th>
                            <th className="text-start">رابط الزووم</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr className="">
                                    <td className="px-5 py-5 font-bold bg-[#FAFAFA] rounded-s-2xl ">1</td>
                                    <td className="bg-[#FAFAFA]">نور صيام</td>
                                    <td className="bg-[#FAFAFA]">لغة انجليززية</td>
                                    <td className="bg-[#FAFAFA]">محادثة </td>
                                    <td className="bg-[#FAFAFA]">10/5/2024 </td>
                                    <td className="bg-[#FAFAFA]">8:00 pm </td>
                                    <td className="px-5 py-5 font-bold bg-[#FAFAFA] rounded-e-2xl ">
                                        <a href="" target="_blank" className="w-[200px] text-nowrap block text-ellipsis overflow-hidden text-blue-600 after:content-['_↗'] hover:underline hover:decoration-sky-500/30">ddd</a>
                                     </td>
                                </tr>
                    </tbody>
                </table>

            </TabsContent>

        </>
    );
}