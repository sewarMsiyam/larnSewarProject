'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TitleSection from '@/components/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCourses from '@/components/pages/CoursesPage/showCourses';
import { fetchAll } from '@/app/api/dataFetch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function CoursesHome() {
    const t = useTranslations('HomePage');
   
    
    return (
        <>
            <section className="md:container my-11">
                <TitleSection text="الدروس التعليمية" />

                <Tabs defaultValue="tawjihi" dir="rtl" className="text-center">
                    <TabsList className='mb-5'>
                        <TabsTrigger value="tawjihi">
                            <Link href="/courses/tawjihi">طالب توجيهي</Link> 
                        </TabsTrigger>
                        <TabsTrigger value="university">
                            <Link href="/courses/university">طالب جامعة</Link> 
                        </TabsTrigger>
                    </TabsList>
                    <ShowCourses />
                </Tabs>
            </section>
        </>
    );
}