'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TitleSection from '@/components/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCourses from '@/components/home/body/showCourses';
import { fetchAll } from '@/app/api/dataFetch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Specialization {
  id: number;
  name: string;
}

export default function CoursesHome() {
    const t = useTranslations('HomePage');
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => {
        const loadSpecializations = async () => {
        try {
            const data = await fetchAll<Specialization>("specializations");
            if (Array.isArray(data)) {
            setSpecializations(data);
            } else {
            console.error("Fetched data is not an array:", data);
            // toast.error("حدث خطأ أثناء تحميل التخصصات. يرجى تحديث الصفحة.");
            }
        } catch (error) {
            console.error("Failed to fetch specializations:", error);
            // toast.error("فشل في تحميل التخصصات. يرجى تحديث الصفحة.");
        }
        };
        loadSpecializations();
    }, []);

    
    return (
        <>
            <section className="md:container my-11">
                <TitleSection text="الدروس التعليمية" />

                <Tabs defaultValue="tawjihi" dir="rtl" className="text-center">
                    <TabsList className='mb-5'>
                        <TabsTrigger value="tawjihi">طالب توجيهي</TabsTrigger>
                        <TabsTrigger value="university">طالب جامعة</TabsTrigger>
                    </TabsList>

                    {/* <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>
                        <div className="grid gap-5 lg:grid-cols-7 items-end">
                            <div className="grid gap-2 col-span-2	">
                                <Label htmlFor="search"> ابحث عن اسم الكورس</Label>
                                <div className="relative">
                                    <Input
                                        id="search"
                                        type="text"
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="كورس "
                                        // value={searchQuery}
                                        // onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2 col-span-2	">
                                <Label htmlFor="search"> ابحث عن اسم معلم</Label>
                                <div className="relative">
                                    <Input
                                        id="search"
                                        type="text"
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="معلم "
                                    />
                                </div>
                            </div>
                            <div className="col-span-2	">
                                <div className="grid gap-2 col-span-4	">
                                    <Label htmlFor="text"> التخصص</Label>
                                    <div className="relative">
                                        <Select dir="rtl" name="specialization_id">
                                            <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                <SelectValue placeholder="التخصص" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {specializations.map((spec) => (
                                                    <SelectItem key={spec.id} value={spec.id.toString()}>
                                                        {spec.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1	">
                                <button type="submit" className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'>ابحث</button>
                            </div>
                        </div>
                    </div> */}

                    <ShowCourses />
                </Tabs>
            </section>
        </>
    );
}