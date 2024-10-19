import Link from 'next/link';
import { Button } from './ui/button';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-background py-6 text-muted-foreground'>
      <div className='container mx-auto flex flex-col items-center justify-between px-6 md:space-x-6'>
        <div className='flex w-full flex-col items-center justify-between md:flex-row'>
          <div className='flex flex-col flex-wrap items-center justify-center md:flex-row md:justify-start md:space-x-4'>
            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                FAQ
              </Link>
            </Button>
            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                About Us
              </Link>
            </Button>

            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                Support
              </Link>
            </Button>
            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                Privacy Policy
              </Link>
            </Button>
            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                Terms of Service
              </Link>
            </Button>
            <Button variant='ghost' className='rounded-full' asChild>
              <Link href='#' className='px-4'>
                Disclaimer
              </Link>
            </Button>
          </div>

          <div className='mt-4 flex space-x-4 md:mt-0'>
            <Link href='https://facebook.com' className='hover:text-gray-600'>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.98h-2.54v-2.9h2.54v-2.2c0-2.5 1.49-3.88 3.76-3.88 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.55v1.89h2.78l-.44 2.9h-2.34v6.98C18.34 21.12 22 16.99 22 12z' />
              </svg>
            </Link>
            <Link href='https://twitter.com' className='hover:text-gray-600'>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M22.46 6.03c-.77.34-1.6.56-2.46.66.89-.53 1.56-1.37 1.88-2.37-.83.49-1.74.84-2.71 1.03a4.48 4.48 0 00-7.63 4.08A12.71 12.71 0 011.64 4.16a4.48 4.48 0 001.39 5.98c-.7-.02-1.35-.21-1.92-.52v.05c0 2.1 1.49 3.84 3.47 4.24-.36.1-.74.15-1.13.15-.28 0-.54-.03-.8-.08a4.49 4.49 0 004.19 3.11A9.01 9.01 0 010 19.54a12.72 12.72 0 006.88 2.02c8.26 0 12.77-6.84 12.77-12.77 0-.2-.01-.41-.02-.61.88-.64 1.63-1.44 2.23-2.35z' />
              </svg>
            </Link>
            <Link href='https://linkedin.com' className='hover:text-gray-600'>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M19.75 3H4.25C3.01 3 2 4.01 2 5.25v13.5C2 19.99 3.01 21 4.25 21h15.5c1.24 0 2.25-1.01 2.25-2.25V5.25C22 4.01 20.99 3 19.75 3zM8.33 18.33H5.75v-7h2.58v7zm-1.29-8.17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.96 8.17h-2.58v-3.42c0-.85-.02-1.94-1.18-1.94-1.18 0-1.36.92-1.36 1.88v3.48H9.25v-7h2.48v.95h.03c.35-.66 1.2-1.36 2.48-1.36 2.65 0 3.14 1.75 3.14 4.02v3.39z' />
              </svg>
            </Link>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <p className='text-center text-sm text-gray-600'>
            &copy; {new Date().getFullYear()} In'egrity Funds. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
