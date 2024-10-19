'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, error, isLoading } = useUser(); // Use Auth0's useUser hook

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 w-full transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-36'>
        {!menuOpen && (
          <div className='flex w-full items-center justify-between lg:w-auto'>
            <Link
              href='/'
              className={`font-bold transition-all duration-300 ${
                scrolled || menuOpen
                  ? 'scale-90 text-2xl text-black lg:text-3xl'
                  : 'scale-100 text-2xl text-white lg:text-3xl'
              }`}
            >
              Inegrity
            </Link>

            <div className='lg:hidden'>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`transition-all duration-300 focus:outline-none ${
                  scrolled || menuOpen ? 'text-black' : 'text-white'
                }`}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } w-full flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between`}
          ref={menuRef}
        >
          <nav className='flex w-full flex-col lg:flex-row lg:items-center lg:space-x-6'>
            <div className='flex w-full flex-col lg:flex-grow lg:flex-row lg:items-center lg:justify-center lg:space-x-0'>
              {['/why-inegrity', '/our-difference', '/faqs'].map(
                (link, index) => (
                  <Button
                    variant='ghost'
                    className='w-full rounded-full py-2 text-center lg:w-auto'
                    asChild
                    key={index}
                  >
                    <Link
                      href={link}
                      className={`w-full px-4 transition-all duration-300 ${
                        scrolled || menuOpen
                          ? 'text-sm text-black'
                          : 'text-base text-white'
                      }`}
                      onClick={handleMenuClose}
                    >
                      {link
                        .replace(/\//g, '')
                        .replace(/-/g, ' ') // Replaces all dashes with spaces
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Link>
                  </Button>
                )
              )}
            </div>
            <div className='flex w-full flex-col space-y-2 lg:w-auto lg:flex-row lg:items-center lg:space-x-2 lg:space-y-0'>
              {!isLoading && !error && !user && (
                <Button
                  className={`w-full rounded-full py-2 text-center transition-all duration-300 lg:w-auto ${
                    scrolled || menuOpen
                      ? 'bg-primary text-sm text-white'
                      : 'bg-primary text-base text-white'
                  }`}
                  asChild
                >
                  <Link
                    href='/api/auth/login'
                    className='px-3'
                    onClick={handleMenuClose}
                  >
                    Login
                  </Link>
                </Button>
              )}
              {!isLoading && !error && user && (
                <Link href='/profile' className='rounded-full overflow-hidden'>
                  <img
                    src={user.picture || ''}
                    alt={user.name || 'User'}
                    className='h-8 w-8 rounded-full'
                  />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
