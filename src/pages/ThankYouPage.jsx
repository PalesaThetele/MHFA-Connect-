
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const TEXT = {
  EN: {
    almostThere: "You're almost there!",
    welcome: 'Welcome to MHFA Connect!',
    thankYou: 'Thank you for joining us',
    registrationReceived:
      'Your registration has been received. Please check your email for a confirmation link to activate your account.',
    accountCreated:
      'Your account has been created successfully. You can now continue to the login page.',
    registrationEmail: 'Registration email',
    nextHeading: 'What happens next?',
    nextInstructions:
      'Open the inbox for the email address above and follow the confirmation instructions from Supabase. If you cannot find the message, check your spam or junk folder.',
    login: 'Go to Login',
    home: 'Back to Home',
    wellbeing: "Your wellbeing matters. We're glad you're here.",
  },
  ST: {
    almostThere: 'U se u le haufi le ho qeta!',
    welcome: 'Rea u amohela ho MHFA Connect!',
    thankYou: 'Rea leboha ka ho ikopanya le rona',
    registrationReceived:
      'Re amohetse ngoliso ea hau. Ka kopo, hlahloba lengolo-tsoibila la hau bakeng sa sehokelo sa netefatso se tla bula ak’haonte ea hau.',
    accountCreated:
      'Ak’haonte ea hau e entsoe ka katleho. Joale u ka tsoela pele ho ea leqepheng la ho kena.',
    registrationEmail: 'Lengolo-tsoibila la ngoliso',
    nextHeading: 'Ho latela eng?',
    nextInstructions:
      'Bula inbox ea aterese ea lengolo-tsoibila e kaholimo ’me u latele litaelo tsa netefatso tse tsoang ho Supabase. Haeba u sa fumane molaetsa, hlahloba foldara ea spam kapa junk.',
    login: 'Eya ho Kena',
    home: 'Khutlela Lehae',
    wellbeing:
      'Bophelo ba hau bo botle bo bohlokoa. Re thabetse hore ebe u mona.',
  },
};

export default function ThankYouPage() {
  const location = useLocation();
  const registration = location.state;
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.EN;

  // Prevent access unless the user arrives after completing registration.
  if (!registration?.registrationComplete) {
    return <Navigate to="/join" replace />;
  }

  const {
    fullName,
    email,
    requiresEmailConfirmation,
  } = registration;

  return (
    <main className="min-h-screen bg-mhfa-background px-4 py-12 text-mhfa-text sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
        <section
          className="w-full rounded-2xl border border-mhfa-border bg-mhfa-surface p-6 text-center shadow-mhfa sm:p-10"
          aria-labelledby="thank-you-heading"
        >
          {/* Success icon */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-mhfa-light"
            aria-hidden="true"
          >
            <svg
              className="h-10 w-10 text-mhfa-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-mhfa-primary">
            MHFA Connect
          </p>

          <h1
            id="thank-you-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {requiresEmailConfirmation
              ? t.almostThere
              : t.welcome}
          </h1>

          <p className="mb-6 text-base leading-7 text-mhfa-muted">
            {fullName
              ? `${t.thankYou}, ${fullName}.`
              : `${t.thankYou}.`}{' '}
            {requiresEmailConfirmation
              ? t.registrationReceived
              : t.accountCreated}
          </p>

          {email && (
            <div className="mb-6 rounded-xl border border-mhfa-border bg-mhfa-surfaceSoft p-4">
              <p className="mb-1 text-sm text-mhfa-muted">
                {t.registrationEmail}
              </p>
              <p className="break-words font-semibold text-mhfa-text">
                {email}
              </p>
            </div>
          )}

          {requiresEmailConfirmation && (
            <div
              className="mb-6 rounded-xl border border-mhfa-border bg-mhfa-light p-4 text-left"
              role="status"
            >
              <p className="font-semibold text-mhfa-primary">
                {t.nextHeading}
              </p>
              <p className="mt-2 text-sm leading-6 text-mhfa-text">
                {t.nextInstructions}
              </p>
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-mhfa-primary px-6 py-3 font-semibold text-white transition hover:bg-mhfa-dark focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2"
            >
              {t.login}
            </Link>

            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-mhfa-border bg-mhfa-surface px-6 py-3 font-semibold text-mhfa-text transition hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2"
            >
              {t.home}
            </Link>
          </div>

          <p className="mt-8 text-sm text-mhfa-muted">
            {t.wellbeing}
          </p>
        </section>
      </div>
    </main>
  );
}
