"use client";
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabsProfile";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@/contexts/UserContext';

type CheckoutFormProps = {
    token: string;
};
export default function UpdateInformation({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');
    const { updateUser } = useUser();

    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        image: null as File | null,
        email: '',
        phone: '',
        phone_code: '',
    });

    const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('student/student_details', token);
            if (profileData && profileData.item) {
                setFormData({
                    first_name: profileData.item.first_name || '',
                    last_name: profileData.item.last_name || '',
                    image: profileData.item.image || '',
                    email: profileData.item.email || '',
                    phone: profileData.item.phone || '',
                    phone_code: profileData.item.phone_code || '',
                });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
        }
    }, [token]);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            first_name: formData.first_name,
            last_name: formData.last_name,
        };
        try {
            const response = await updateProfile('student/update', token as string, data);
            if (response.status === 200) {
                toast.success('تم تحديث البيانات ', {
                    autoClose: 1500,
                });
                setFormData(prevFormData => ({
                    ...prevFormData,
                    first_name: response.item.first_name || prevFormData.first_name,
                    last_name: response.item.last_name || prevFormData.last_name,
                }));
                updateUser({
                    first_name: response.item.first_name || response.item.first_name || formData.first_name,
                    last_name: response.item.last_name || response.item.last_name || formData.last_name,
                    email: response.item.email || formData.email,
                    image: response.item.image || formData.image,
                    userType: 'student',
                });
            } else {
                console.error('Unexpected server response:', response);
                toast.error('فشل تعديل البيانات!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error instanceof Error) {
                console.error(`An error occurred while updating the profile: ${error.message}`);
            } else {
                console.error('An unknown error occurred while updating the profile. Please try again.');
            }
        }
    };

    return (
        <TabsContent value="setting" className="bg-white rounded-xl p-5 lg:p-10">
            <h4 className='font-bold text-lg mb-4'> معلومات عامة </h4>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="first_name">الاسم الاول</Label>
                        <Input
                            id="first_name"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="last_name">اسم العائلة</Label>
                        <Input
                            id="last_name"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">البريد الالكتروني</Label>
                        <Input
                            id="email"
                            type="email"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            value={formData.email}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="flex gap-x-3">
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="056666666"
                                value={formData.phone}
                                readOnly
                                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            />
                            <Input
                                id="phone_code"
                                type="number"
                                placeholder="056"
                                value={formData.phone_code}
                                readOnly
                                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div>
                </div>
                    <div className="text-end">
                        <Button type="submit" disabled={loading} className="btn-primary rounded-2xl font-medium py-2.5 px-8 md:px-3 lg:px-16 m-1 text-white before:ease relative overflow-hidden btn-primary transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                            {loading ? "جاري حفظ التغيرات ..." : "حفظ التغيرات"}
                        </Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </TabsContent>
    );
}
