'use client'
import { useState, useEffect } from 'react';

type ColorMode = 'light' | 'dark';

export const useColorMode = () => {
  const [currentMode, setCurrentMode] = useState<ColorMode>('light');

  useEffect(() => {
    const updateMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setCurrentMode(isDarkMode ? "dark" : "light");
    };
    updateMode();

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener('change', updateMode);

    return () => {
      darkModeMediaQuery.removeEventListener('change', updateMode);
    };
  }, []);

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle("dark");

    if (isDarkMode === isSystemDarkMode) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }

    setCurrentMode(isDarkMode ? "dark" : "light");
  }

  return { toggleMode, currentMode };
};
