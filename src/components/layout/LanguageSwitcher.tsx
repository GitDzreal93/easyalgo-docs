'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const languages = [
  { code: 'en', label: 'English' }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const pathname = usePathname();

  // 获取当前路径（不包含语言前缀）
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    segments.splice(1, 1);
    return segments.join('/') || '/';
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded',
          'text-[#023047]/70 hover:text-[#023047]',
          'border border-[#8ECAE6]/20 hover:border-[#8ECAE6]/40',
          'focus:outline-none focus:ring-2 focus:ring-[#8ECAE6]/20',
          isOpen && 'bg-[#8ECAE6]/5'
        )}
      >
        <FontAwesomeIcon icon={faLanguage} className="w-4 h-4 mr-2" />
        <span>{languages.find(lang => lang.code === locale)?.label}</span>
        <svg className={clsx(
          "ml-2 h-4 w-4 transition-transform duration-200",
          isOpen ? 'transform rotate-180' : ''
        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={`/${language.code}${getPathWithoutLocale()}`}
                className={clsx(
                  'block px-4 py-2 text-sm transition-colors duration-200',
                  locale === language.code
                    ? 'bg-[#8ECAE6]/10 text-[#023047] font-medium'
                    : 'text-[#023047]/70 hover:bg-[#8ECAE6]/5 hover:text-[#023047]'
                )}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {language.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 