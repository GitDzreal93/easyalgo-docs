'use client';

import { TypeAnimation } from 'react-type-animation';
import { useTranslations } from 'next-intl';

export const TypedTitle = () => {
  const t = useTranslations('home');

  const sequence = [
    t('hero.typedTitle.part1'),
    80,
    t('hero.typedTitle.part2'),
    80,
    t('hero.typedTitle.part3'),
    80,
    t('hero.typedTitle.part4'),
    80,
    t('hero.typedTitle.part5'),
    80,
    t('hero.typedTitle.part6'),
    80,
    t('hero.typedTitle.part7'),
    80,
    t('hero.typedTitle.part8'),
    80,
    t('hero.typedTitle.part9'),
    80,
    t('hero.typedTitle.part10'),
    80,
    t('hero.typedTitle.part11'),
    80,
    t('hero.typedTitle.complete'),
    3000,
  ];

  return (
    <div className="h-16 sm:h-20 flex items-center whitespace-nowrap overflow-hidden max-w-[90vw] sm:max-w-[600px] md:max-w-[720px]">
      <div className="relative inline-block">
        <TypeAnimation
          sequence={sequence}
          wrapper="span"
          speed={40}
          className="inline-block text-lg sm:text-2xl md:text-3xl text-[#8ECAE6] border-r-4 border-[#8ECAE6] pr-2 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#8ECAE6]/20"
          repeat={Infinity}
          cursor={false}
          deletionSpeed={80}
        />
        <span className="absolute -bottom-1 right-0 w-2 h-2 bg-[#8ECAE6] rounded-full animate-ping opacity-75"></span>
      </div>
    </div>
  );
};
