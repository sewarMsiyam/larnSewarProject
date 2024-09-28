"use client";

import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useRef } from 'react';
import { updateProfile } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";

interface FormData {
    first_name: string;
    last_name: string;
    photo: string | null;
}

interface UpdateProfileResponse {
    status: number;
    item?: {
        photo?: string;
    };
}

export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        photo: null,
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                photo: URL.createObjectURL(file),
            }));

            const confirmed = window.confirm('هل أنت متأكد من حفظ الصورة؟');
            if (confirmed) {
                handleSubmit(file);
            }
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (file: File) => {
        const data = new FormData();
        data.append('photo', file);

        try {
            if (!token) {
                throw new Error('No authentication token available');
            }

            const response = await updateProfile('instructor/update', token, data) as UpdateProfileResponse;

            if (response && response.status === 200 && response.item) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    photo: prevFormData.photo,
                }));
            } else {
                console.error('Unexpected server response:', response);
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
        <>
            <Avatar>
                <AvatarImage
                    src={formData.photo || ''}
                    alt="User Image"
                    className="shadow rounded-full cursor-pointer"
                    onClick={handleAvatarClick}
                />
                <AvatarFallback>س</AvatarFallback>
            </Avatar>

            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700">Image</Label>
                <Input
                    type="file"
                    id="photo"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>
        </>
    );
}