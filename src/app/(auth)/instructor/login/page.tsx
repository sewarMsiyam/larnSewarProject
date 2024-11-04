'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from  'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleSignInButton from "@/components/auth/childLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('instructor-credentials', {
      redirect: false,
      email,
      password,
    });

    console.log(result);
    if (result?.error) {
      setLoading(false);
      switch (result.error) {
        case 'otp is not checked':
          setErrorMessage('أنت مسجل فعلا بالموقع سيتم التواصل معك عبر الواتساب في اقرب وقت ممكن لتفعيل حسابك');
          break;
        case 'These credentials do not match our records.':
          setErrorMessage('أنت غير مسجل في الموقع، سجل من خلال صفحة التسجيل.');
          break;
        default:
          setErrorMessage('حدث خطأ ما , يجب ان تكون مسجل بالموقع');
      }
      setSuccessMessage('');
    } else {
      setSuccessMessage('تم تسجيل الدخول بنجاح!');
        setLoading(false);
        router.push('/instructor/profile');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className='border-0 p-0 m-0 shadow-none'>
          <CardHeader>
            <CardTitle className="text-2xl">تسجيل الدخول معلم </CardTitle>
            <CardDescription>
              يرجى إدخال معلومات تسجيل الدخول الخاصة بك
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6 pt-0'>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الالكتروني</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 flex items-center px-3 ring-0 focus-visible:ring-0 "
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <label>
                  <input type="checkbox" className="h-4 w-4 shrink-0 bg-gray-10 rounded-sm " /> تذكرني
                </label>
                <Link href="/forgetpass" className="text-primary">هل نسيت كلمة المرور؟</Link>
              </div>

              <Button type="submit" className="w-full bg-btn-authColor rounded-xl text-white" disabled={loading}>
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>              
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
          </CardContent>
        </Card>
      </form>
      <div className="grid gap-4 mb-5">
        <div>
          <div className="flex items-center">
            <hr className='w-full' />
            <span className="text-xs px-5 text-nowrap text-gray-400">أو التسجيل من خلال</span>
            <hr className='w-full' />
          </div>
        </div>
      </div>

      <GoogleSignInButton />

      <div className="mt-4 text-center text-sm">
        ليس لديك حساب ؟  
        <Link href="/instructor/register" className="text-primary px-1">
          إنشاء حساب جديد 
        </Link>
      </div>
    </>
  );
};

export default Login;
