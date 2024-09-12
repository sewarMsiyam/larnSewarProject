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

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phone_code: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName) {
      return "الاسم الأول مطلوب.";
    }
    if (!formData.lastName) {
      return "اسم العائلة مطلوب.";
    }
    if (!formData.phone) {
      return "رقم الهاتف مطلوب.";
    }
    if (!formData.email) {
      return "البريد الإلكتروني مطلوب.";
    }
    if (!formData.password) {
      return "كلمة المرور مطلوبة.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      setLoading(false);
      return;
    }

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
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success("تم إنشاء الحساب بنجاح!");
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    } catch (error) {
      setError("فشل في إنشاء الحساب. حاول مرة أخرى لاحقاً.");
      toast.error("فشل في إنشاء الحساب. حاول مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (isValid: boolean, number: string, countryData: any) => {
    setFormData((prev) => ({
      ...prev,
      phone: number,
      phone_code: countryData.dialCode,
    }));
  };

  return (
    <>
      <Card className="border-0 p-0 m-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">إنشاء حساب</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            مرحبا بك انضم إلى سوار اليوم وابدأ رحلتك التعليمية!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="firstName">اسم الطالب</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-none rounded-full mt-1 block w-full bg-gray-100"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName">اسم العائلة </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-none rounded-full mt-1 block w-full bg-gray-100"
                  required
                />
              </div>
            </div>
{/* 
            <div className="space-y-3">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                onPhoneNumberChange={handlePhoneChange}
              />
            </div> */}

                   <div className="space-y-3">
              <Label htmlFor="phone_code">Phone Code</Label>
              <Input
                id="phone_code"
                type="number"
                placeholder="056"
                value={formData.phone_code}
                onChange={handleChange}
                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
            <div>
            
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="056666666"
                value={formData.phone}
                onChange={handleChange}
                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-none rounded-full mt-1 block w-full bg-gray-100"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-none rounded-full mt-1 block w-full bg-gray-100"
                required
              />
            </div>

            <div className="space-y-3">
              <label>
                <input type="checkbox" className="accent-primary" /> أوافق على
                <Link href="/" className="text-primary"> الشروط والأحكام </Link>
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-color-gradient rounded-2xl text-white"
              disabled={loading}
            >
              {loading ? "إنشاء حساب ..." : "إنشاء حساب"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-blue-600 hover:underline"> تسجيل الدخول </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
