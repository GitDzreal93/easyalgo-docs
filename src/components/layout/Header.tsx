'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import UserMenu from '../auth/UserMenu';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={clsx(
      'bg-white sticky top-0 z-50 transition-all duration-200 border-b border-[#8ECAE6]/10',
      scrolled ? 'shadow-md' : ''
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/app_logo.png"
                alt="Easy Algo Logo"
                width={28}
                height={28}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-[#023047] ml-2">Easy Algo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className={clsx(
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                  pathname === '/' 
                    ? 'border-[#FFB703] text-[#023047] font-semibold'
                    : 'border-transparent text-[#023047]/70 hover:border-[#8ECAE6] hover:text-[#023047]'
                )}
              >
                首页
              </Link>
              <Link 
                href="/docs" 
                className={clsx(
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                  pathname.startsWith('/docs')
                    ? 'border-[#FFB703] text-[#023047] font-semibold'
                    : 'border-transparent text-[#023047]/70 hover:border-[#8ECAE6] hover:text-[#023047]'
                )}
              >
                课程
              </Link>
              <Link 
                href="/pricing" 
                className={clsx(
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                  pathname === '/pricing'
                    ? 'border-[#FFB703] text-[#023047] font-semibold'
                    : 'border-transparent text-[#023047]/70 hover:border-[#8ECAE6] hover:text-[#023047]'
                )}
              >
                会员
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link href="/auth/login" className="text-[#023047]/70 hover:text-[#023047] px-3 py-2 text-sm font-medium transition-colors duration-200">
                  登录
                </Link>
                <Link href="/auth/register" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[#023047] bg-[#FFB703] hover:bg-[#FFB703]/90 transition-colors duration-200">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
