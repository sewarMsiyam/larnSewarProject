"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { fetchOneToken } from '@/app/api/dataFetch';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import SkeletonInstructor from "@/components/ui/SkeletonInstructor";
import { useRouter } from "next/router";

export default function InstructionPrivate() {
    const session = useSession();
    const token = session?.data?.user?.authToken;

    const searchParams = useSearchParams();
    const id = searchParams.get('id');


    const [instruction, setInstruction] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchInstruction = async () => {
            if (!id || !token) return;
            setLoading(true);
            try {
                const data = await fetchOneToken('checkout/instructors', id, token);
                setInstruction(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstruction();
    }, []);

    if (loading) {
        return  <SkeletonInstructor />;
    }

    if (!instruction) {
        return <div>instruction data not available</div>;
    }


    return (

        <div className="bg-white p-10 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-4">
            <Avatar>
                <AvatarImage src={instruction.image} alt="name" className="rounded-full" />
                <AvatarFallback>{instruction.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg">{instruction.name}</h3>
            <p>{instruction.specialist}</p>

            <div className="py-5 bg-[#F9F9F9] w-full rounded-xl flex justify-around items-center font-bold">
                <div>
                    <p>التاريخ:</p>
                    <p>الوقت:</p>
                </div>
                <div>
                    <p className="text-primary">11 سبتمبر 2024</p>
                    <p className="text-primary">11 سبتمبر 2024</p>
                </div>
            </div>

            <div className="flex justify-between items-center w-full">
                <p>المجموع الفرعي</p>
                <b className="text-[#FE7A36]">50$</b>
            </div>
            <div className="flex justify-between items-center w-full">
                <p>خصم (10%)</p>
                <b className="text-[#FE7A36]">-10$</b>
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full" />
            <div className="flex justify-between items-center w-full">
                <p> المبلغ الكلي</p>
                <b className="text-[#FE7A36]">40$</b>
            </div>
        </div>
    );
}