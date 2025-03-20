'use client';

import React from 'react';

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <div className="mb-4 flex gap-2 justify-end">
      <button
        onClick={() => onThemeChange('juejin')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentTheme === 'juejin' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        掘金主题
      </button>
      <button
        onClick={() => onThemeChange('notion')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentTheme === 'notion' 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        Notion主题
      </button>
    </div>
  );
}; 