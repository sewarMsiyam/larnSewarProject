'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IntlTelInput from 'intl-tel-input/react';
import 'intl-tel-input/build/css/intlTelInput.css';
import Link from "next/link";
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

// Define the type for form data
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  phone_code: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the type for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  phone_code?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    phone_code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== formData.password ? "كلمات المرور غير متطابقة" : ""
      }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    // Validate firstName
    if (!formData.firstName) {
      newErrors.firstName = "الاسم الأول مطلوب ويجب أن يكون نصًا.";
      isValid = false;
    }

    // Validate lastName
    if (!formData.lastName) {
      newErrors.lastName = "اسم العائلة مطلوب ويجب أن يكون نصًا.";
      isValid = false;
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = "رقم الهاتف مطلوب.";
      isValid = false;
    }

    // Validate phone_code
    if (!formData.phone_code) {
      newErrors.phone_code = "رمز الهاتف مطلوب.";
      isValid = false;
    }

    // Validate email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني مطلوب ويجب أن يكون عنوان بريد إلكتروني صالح.";
      isValid = false;
    }

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون أكثر من 8 أحرف.";
      isValid = false;
    }

    // Validate confirmPassword
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
          phone: formData.phone,
          phone_code: formData.phone_code,
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
    <>
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
                  className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.lastName ? 'border-red-500' : ''}`}
                  required
                />
                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName">اسم العائلة </Label>
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
              <div className="flex gap-3">
                <div className="w-5/6">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="056666666"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.phone ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                <div className="w-1/6">
                  <Input
                    id="phone_code"
                    type="number"
                    placeholder="056"
                    value={formData.phone_code}
                    onChange={handleChange}
                    className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.phone_code ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
              </div> 
              {errors.phone_code && <p className="text-red-600 text-sm">{errors.phone_code}</p>}
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
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
            <div className="space-y-3 mt-4">
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
              <label>
                <input type="checkbox" className="accent-primary" /> أوافق على
                <Link href="/" className="text-primary"> الشروط والأحكام </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-btn-authColor rounded-xl text-white space-y-3"
              disabled={loading}
            >
              {loading ? "إنشاء حساب ..." : "إنشاء حساب"}
            </Button>
          </form>
           <div className="grid gap-4 my-5">
        <div>
          <div className="flex items-center">
            <hr className='w-full' />
            <span className="text-xs px-5 text-nowrap text-gray-400">أو التسجيل من خلال</span>
            <hr className='w-full' />
          </div>
        </div>
      </div>
      
          <GoogleSignInButton />
          <div className="mt-4 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link href="/student/login" className="text-primary hover:underline"> تسجيل الدخول </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
