"use client";
import Logo from "@/components/home/layout/header/logo"
import Navbar from "@/components/home/layout/header/itemNav"
import EndNav from "@/components/home/layout/header/endnav"
import MobNav from "@/components/home/layout/header/resMobNav"
import React from 'react';
import { getCsrfToken, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="d-flex w-full py-4">
            <div className="container">
              <div className="flex justify-between items-center">
                <Logo />
                <div className="md:hidden">
                  <MobNav />
                </div>
                <div className="hidden md:flex justify-between items-center w-full ">
                  <div></div>
                  <Navbar />

                  {session?.user ? (
                      <div>
                        <p>Logged in as: {session.user.email}</p>
                        <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
                      </div>
                    ) : (
                      <div>
                        <p>Not logged in</p>
                        <a href="/login">Login</a>
                      </div>
                    )}

                  <EndNav />  
                </div>
              </div>
            </div>
          </header>
  );
};

export default Header;
