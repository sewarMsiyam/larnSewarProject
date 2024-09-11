"use client";
import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const GoogleSignInButton: React.FC = () => {
  return (
    <Button onClick={() => signIn('google')} variant="outline" className="w-full">
      تسجيل الدخول باستخدام جوجل
    </Button>
  );
};

export default GoogleSignInButton;
