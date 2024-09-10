"use client";
import React from 'react';
import Logo from "@/components/home/layout/header/logo";
import Navbar from "@/components/home/layout/header/itemNav";
import EndNav from "@/components/home/layout/header/endnav";
import MobNav from "@/components/home/layout/header/resMobNav";
import { Session } from 'next-auth';

interface HeaderAuthProps {
  session: Session | null;
}
const HeaderAuth: React.FC<HeaderAuthProps> = ({ session }) => {

  return (
    <header className="d-flex w-full py-4">
      <div className="container">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="md:hidden">
            <MobNav session={session} />
          </div>
          <div className="hidden md:flex justify-between items-center w-full text-white">
            <div></div>
            <Navbar />
            <EndNav session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAuth;
