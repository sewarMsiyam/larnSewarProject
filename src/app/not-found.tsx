'use client';

import Link from 'next/link';

export default function notFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
