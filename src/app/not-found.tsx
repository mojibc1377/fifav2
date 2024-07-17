// src/app/not-found.tsx
import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="flex m-4 text-center mt-20 flex-col items-center justify-start min-h-screen text-white">
<div
                    className={`flex items-center gap-3 rounded-lg  text-muted-foreground mt-0 mb-5 transition-all hover:text-primary`}>
                    <img src="/ea-logo.png" className="w-9" />
                  <span className="text-white">ChampsPlus+</span>
                </div>
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Sorry, the page you are looking for does not exist right now</p>
      <Link href="/" className='text-blue-500 italic underline'>
      Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
