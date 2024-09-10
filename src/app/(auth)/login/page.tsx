'use client';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react';

const SignIn: NextPage = () => {
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      phone,
      phone_code: phoneCode,
      password,
      token
    });
    
    if (result?.error) {
      console.error(result.error);
    } else {
      // Handle successful sign-in, token is stored in session
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm" dir="ltr">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your phone and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="token">token</Label>
              <Input
                id="token"
                type="text"
                placeholder="0000"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneCode">Phone Code</Label>
              <Input
                id="phoneCode"
                type="text"
                placeholder="0000"
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full text-white">
              Login
            </Button>
            <Button onClick={() => signIn('google')} variant="outline" className="w-full">
              Login with Google
            </Button>
            
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}


export default SignIn;