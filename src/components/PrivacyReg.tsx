"use client";
import { useEffect, useState } from 'react';
import { Privacy } from '@/app/api/interfaces';
import { fetchOneP } from '@/app/api/dataFetch';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from 'next/navigation';

export default function PrivacyReg() {
    const pathname = usePathname();
    const [privacyData, setPrivacyData] = useState<Privacy | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                let endpoint = 'student_privacy_policy';
                if (pathname.includes('instructor')) {
                    endpoint = 'instructor_privacy_policy';
                }

                const data = await fetchOneP(endpoint);
                console.log(data);
                if (data) {
                    setPrivacyData(data);
                }
            } catch (error) {
                console.error('Error fetching terms:', error);
                setError('An error occurred while fetching terms and conditions.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [pathname]);

    if (loading) {
        return (
            <div>
                <Skeleton className="h-5 w-40 mx-3" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!privacyData) {
        return <p className="text-yellow-500">No privacy policy data available</p>;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-[#0abc8c] hover:text-[#09ab7f] mx-1 cursor-pointer">
                الشروط والأحكام
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl" dir="rtl">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2 mb-4">
                        <AlertDialogTitle className="text-xl font-bold text-gray-900">
                            {privacyData?.name}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription 
                        className="space-y-4 text-gray text-start max-h-[75vh] overflow-auto"
                    >
                        {privacyData?.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row-reverse gap-2">
                    <AlertDialogAction className="btn-primary text-white hover:bg-[#09ab7f] w-full">
                        موافق
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}