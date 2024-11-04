'use client';
import { useState, useEffect } from 'react';
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
import { fetchAll } from '@/app/api/dataFetch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormData {
  name: string;
  phoneNumber: string;
  dialCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization_id: string;
}

interface Specialization {
  id: number;
  name: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    dialCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization_id: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const data = await fetchAll<Specialization>("specializations");
        if (Array.isArray(data)) {
          setSpecializations(data);
        } else {
          console.error("Fetched data is not an array:", data);
          toast.error("حدث خطأ أثناء تحميل التخصصات. يرجى تحديث الصفحة.");
        }
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
        toast.error("فشل في تحميل التخصصات. يرجى تحديث الصفحة.");
      }
    };
    loadSpecializations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value.slice(country.dialCode.length), 
      dialCode: country.dialCode
    }));
    setErrors(prev => ({ ...prev, phoneNumber: "", dialCode: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "الاسم مطلوب";
    if (!formData.phoneNumber) newErrors.phoneNumber = "رقم الهاتف مطلوب";
    if (!formData.dialCode) newErrors.dialCode = "رمز الهاتف مطلوب";
    if (!formData.specialization_id) newErrors.specialization_id = "التخصص مطلوب";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "البريد الإلكتروني غير صالح";
    if (formData.password.length < 8) newErrors.password = "كلمة المرور يجب أن تكون أكثر من 8 أحرف";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare the data for API submission
    const submitData = {
      name: formData.name,
      phone: formData.phoneNumber,
      phone_code: formData.dialCode,
      email: formData.email,
      password: formData.password,
      specialization_id: formData.specialization_id
    };

    setLoading(true);
    try {
      const response = await fetch("https://sewaar.net/api/v1/instructors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "حدث خطأ ما");

      toast.success("تم إنشاء الحساب بنجاح!");
      router.push('/instructor/register-stutas')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل في إنشاء الحساب. حاول مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 p-0 m-0 shadow-none">
      <CardHeader className='p-0'>
        <CardTitle className="text-2xl font-bold">إنشاء حساب معلم</CardTitle>
        <CardDescription>مرحبا بك انضم إلى سوار اليوم وابدأ رحلتك التعليمية!</CardDescription>
      </CardHeader>
      <CardContent className='pt-5'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="الاسم" name="name" type="text" value={formData.name} onChange={handleChange} error={errors.name} />

          <div className="space-y-3">
            <Label htmlFor="specialization_id">التخصص</Label>
            <Select dir="rtl"
              name="specialization_id"
              value={formData.specialization_id}
              onValueChange={(value) => handleChange({ target: { name: 'specialization_id', value } })}
            >
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
            {errors.specialization_id && <p className="text-red-600 text-sm">{errors.specialization_id}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone">رقم الهاتف <span className="text-sm text-gray-500">(يفضل رقم الواتساب لانه سيتم التواصل معك من خلاله)</span></Label>
            <PhoneInput
              country={'sa'}
              value={formData.dialCode + formData.phoneNumber}
              onChange={handlePhoneChange}
              inputClass="!w-full !h-10 !border-none !rounded-full !mt-1 !bg-gray-100 !ring-0 !focus-visible:ring-0 !focus-visible:ring-offset-0 "
              containerClass="!w-full"
              dropdownClass="!bg-white"
            />
            {(errors.phoneNumber || errors.dialCode) && (
              <p className="text-red-600 text-sm">{errors.phoneNumber || errors.dialCode}</p>
            )}
          </div>

          <FormField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <FormField label="كلمة المرور" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
          <FormField label="تأكيد كلمة المرور" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="accent-primary mx-2" required />
              <span>أوافق على <Link href="/" className="text-primary">الشروط والأحكام</Link></span>
            </label>
          </div>

          <Button type="submit" className="w-full bg-btn-authColor rounded-xl text-white" disabled={loading}>
            {loading ? "إنشاء حساب ..." : "إنشاء حساب"}
          </Button>
        </form>

        <div className="my-5 flex items-center">
          <hr className="flex-grow" />
          <span className="px-5 text-xs text-gray-400">أو التسجيل من خلال</span>
          <hr className="flex-grow" />
        </div>

        <GoogleSignInButton />

        <div className="mt-4 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link href="/instructor/login" className="text-primary hover:underline">تسجيل الدخول</Link>
        </div>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}

const FormField = ({ label, name, type, value, onChange, error }: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div className="space-y-3">
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);