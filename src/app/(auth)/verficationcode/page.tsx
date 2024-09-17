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
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);


  return (
    <>
  <form>
        <Card className='border-0 p-0 m-0 shadow-none'>
          <CardHeader>
            <CardTitle className="text-2xl">رمز التحقق</CardTitle>
            <CardDescription>
            تم إرسال رمز التحقق الخاص بك على رقم الهاتف المسجل 
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6 pt-0'>
            <div className="grid gap-4">
              <div className="grid grid-cols-5 gap-2">
                    <Input
                        type="text"
                        className="w-14 h-14 border-none rounded-xl mt-1 block bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                        value={1}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="w-14 h-14 border-none rounded-xl mt-1 block bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                        value={2}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="w-14 h-14 border-none rounded-xl mt-1 block bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                        value={3}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="w-14 h-14 border-none rounded-xl mt-1 block bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                        value={4}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="w-14 h-14 border-none rounded-xl mt-1 block bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                        value={5}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
