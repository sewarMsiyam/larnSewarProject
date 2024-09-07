"use client"; // هذا المكون يجب أن يكون عميلًا

import { useEffect } from 'react';
import AOS from 'aos';

const AOSWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <>{children}</>;
};

export default AOSWrapper;
