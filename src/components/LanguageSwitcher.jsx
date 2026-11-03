
import { useLanguage } from '../LanguageContext';

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();

  const label = lang === 'ST' ? 'Puo' : 'Language / Puo';

  return (
    <div className="inline-flex items-center gap-2">
      <label
        htmlFor="language-switcher"
        className="hidden text-sm font-medium text-mhfa-text sm:inline"
      >
        {label}
      </label>

      <select
        id="language-switcher"
        value={lang}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label={lang === 'ST' ? 'Khetha puo' : 'Choose language'}
        className="max-w-full rounded-lg border border-mhfa-border bg-white px-3 py-2 text-sm text-mhfa-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mhfa-primary"
      >
        <option value="EN">🇬🇧 English</option>
        <option value="ST">🇱🇸 Sesotho</option>
      </select>
    </div>
  );
}
