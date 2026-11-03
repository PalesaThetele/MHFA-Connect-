
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LANGS } from './constants';

const LanguageContext = createContext(null);

const LANGUAGE_STORAGE_KEY = 'mhfa_language';

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (savedLanguage && LANGS[savedLanguage]) {
      return savedLanguage;
    }
  } catch {
    // Use English if browser storage is unavailable.
  }

  return 'EN';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Language selection still works for the current session.
    }
  }, [lang]);

  const currentLangData = LANGS[lang] || LANGS.EN;

  function changeLanguage(nextLanguage) {
    if (LANGS[nextLanguage]) {
      setLang(nextLanguage);
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        changeLanguage,
        currentLangData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider.'
    );
  }

  return context;
}
