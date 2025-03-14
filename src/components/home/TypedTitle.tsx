'use client';

import { TypeAnimation } from 'react-type-animation';

export const TypedTitle = () => {
  return (
    <div className="h-16 sm:h-20 flex items-center whitespace-nowrap overflow-hidden max-w-[90vw] sm:max-w-[600px] md:max-w-[720px]">
      <div className="relative inline-block">
        <TypeAnimation
          sequence={[
            '算_',
            80,
            '算法_',
            80,
            '算法学_',
            80,
            '算法学习_',
            80,
            '算法学习，_',
            80,
            '算法学习，从_',
            80,
            '算法学习，从未_',
            80,
            '算法学习，从未如_',
            80,
            '算法学习，从未如此_',
            80,
            '算法学习，从未如此简_',
            80,
            '算法学习，从未如此简单！_',
            80,
            '算法学习，从未如此简单！',
            3000,
          ]}
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
