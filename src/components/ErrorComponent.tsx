'use client';

import Link from 'next/link';

interface ErrorComponentProps {
  errorMessage: string;
}

export default function ErrorComponent({ errorMessage }: ErrorComponentProps) {
  return (
    <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
      <h2>{errorMessage}</h2>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
