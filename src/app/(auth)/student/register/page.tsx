'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignInButton from "@/components/auth/childLogin";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dialCode: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dialCode?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dialCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.password ? "كلمات المرور غير متطابقة" : ""
      }));
    }
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value.slice(country.dialCode.length), // Remove dial code from phone number
      dialCode: country.dialCode
    }));
    setErrors(prev => ({ ...prev, phoneNumber: "", dialCode: "" }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "الاسم الأول مطلوب ويجب أن يكون نصًا.";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "اسم العائلة مطلوب ويجب أن يكون نصًا.";
      isValid = false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 9) {
      newErrors.phoneNumber = "الرجاء ادخال رقم هاتف صحيح";
      isValid = false;
    }

    if (!formData.dialCode) {
      newErrors.dialCode = "رمز الهاتف مطلوب.";
      isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني مطلوب ويجب أن يكون عنوان بريد إلكتروني صالح.";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون أكثر من 8 أحرف.";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("https://sewaar.net/api/v1/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phoneNumber,
          phone_code: formData.dialCode,
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.message || "حدث خطأ ما.";
        toast.error(errorMessage);
      } else {
        toast.success("تم إنشاء الحساب بنجاح!");
        router.push('/student/login');
      }
    } catch (error) {
      toast.error("فشل في إنشاء الحساب. حاول مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 p-0 m-0 shadow-none">
      <CardHeader className='p-0'>
        <CardTitle className="text-2xl font-bold">إنشاء حساب</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          مرحبا بك انضم إلى سوار اليوم وابدأ رحلتك التعليمية!
        </CardDescription>
      </CardHeader>
      <CardContent className='p-0'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="firstName">اسم الطالب</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.firstName ? 'border-red-500' : ''}`}
                required
              />
              {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
            </div>
            <div className="space-y-3">
              <Label htmlFor="lastName">اسم العائلة</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.lastName ? 'border-red-500' : ''}`}
                required
              />
              {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <PhoneInput
              country={'sa'} // Default country
              value={formData.dialCode + formData.phoneNumber}
              onChange={handlePhoneChange}
              inputClass="!w-full !h-10 !border-none !rounded-full !mt-1 !bg-gray-100 !ring-0 !focus-visible:ring-0 !focus-visible:ring-offset-0"
              containerClass="!w-full"
              dropdownClass="!bg-white"
            />
            {(errors.phoneNumber || errors.dialCode) && (
              <p className="text-red-600 text-sm">{errors.phoneNumber || errors.dialCode}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              required
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="accent-primary mx-2" required />
              <span>أوافق على <Link href="/" className="text-primary">الشروط والأحكام</Link></span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-btn-authColor rounded-xl text-white"
            disabled={loading}
          >
            {loading ? "إنشاء حساب ..." : "إنشاء حساب"}
          </Button>
        </form>

        <div className="my-5 flex items-center">
          <hr className="flex-grow" />
          <span className="px-5 text-xs text-nowrap text-gray-400">أو التسجيل من خلال</span>
          <hr className="flex-grow" />
        </div>

        <GoogleSignInButton />

        <div className="mt-4 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link href="/student/login" className="text-primary hover:underline">تسجيل الدخول</Link>
        </div>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}