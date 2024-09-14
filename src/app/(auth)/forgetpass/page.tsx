'use client';
import React, { useState } from 'react';
// import { signIn } from  'next-auth';
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

const Forget: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message
  const [loading, setLoading] = useState(false);


  return (
    <>
  <form>
        <Card className='border-0 p-0 m-0 shadow-none'>
          <CardHeader>
            <CardTitle className="text-2xl"> هل نسيت كلمة المرور؟</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور.
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


              <Button type="submit" className="w-full bg-btn-authColor rounded-xl text-white" disabled={loading}>
                {loading ? 'جاري إرسال الرمز...' : 'إرسال الرمز'}
              </Button>              
              {/* {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}
            </div>
          </CardContent>
        </Card>
      </form>
    
      <div className="mt-4 text-center text-sm">
        تذكرت كلمة المرور؟
        <Link href="/login" className="text-primary px-1">
          تسجيل الدخول   
        </Link>
      </div>
    </>
  );
};

export default Forget;
