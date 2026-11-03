
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const TEXT = {
  EN: {
    brand: 'MHFA Connect · Lesotho',
    heading: "We couldn't find that page",
    message:
      'The page may have moved, or the address may be incorrect. You can return home and continue exploring MHFA Connect.',
    home: 'Return home',
  },
  ST: {
    brand: 'MHFA Connect · Lesotho',
    heading: 'Leqephe lena ha lea fumaneha',
    message:
      'Mohlomong leqephe lena le fallisitsoe, kapa aterese ha ea nepahala. U ka khutlela leqepheng la lehae ’me ua tsoela pele ho hlahloba MHFA Connect.',
    home: 'Khutlela leqepheng la lehae',
  },
};

export default function NotFoundPage() {
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.EN;

  return (
    <main className="flex min-h-screen items-center justify-center bg-mhfa-background px-5 text-mhfa-text">
      <section className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-mhfa-primary">
          {t.brand}
        </p>

        <h1 className="mt-4 text-6xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-bold">
          {t.heading}
        </h2>

        <p className="mt-3 leading-7 text-mhfa-muted">
          {t.message}
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-xl bg-mhfa-primary px-6 py-3 font-semibold text-white hover:bg-mhfa-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {t.home}
        </Link>
      </section>
    </main>
  );
}
