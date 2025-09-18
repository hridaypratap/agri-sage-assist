import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { translations } from './translations';

type Lang = 'en' | 'ml';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null;
    return stored === 'ml' ? 'ml' : 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  };

  useEffect(() => {
    // Ensure document lang attribute follows selected language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[lang] ?? translations.en;
      return dict[key] ?? key;
    };
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export { I18nContext };
