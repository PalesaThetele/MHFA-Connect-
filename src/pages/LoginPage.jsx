
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../LanguageContext';

const TEXT = {
  EN: {
    backHome: '← Back to home',
    brand: 'MHFA Connect · Lesotho',
    heading: 'Welcome back',
    intro:
      'Log in to continue exploring mental health information, self-help resources, and supportive community options.',
    email: 'Email address',
    password: 'Password',
    show: 'Show',
    hide: 'Hide',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    passwordRequired: 'Please enter your password.',
    emailNotConfirmed:
      'Please confirm your email address using the link we sent you before logging in.',
    loginError:
      'We could not sign you in with those details. Check your email and password, then try again.',
    signingIn: 'Signing in...',
    login: 'Log in',
    noAccount: "Don't have an account?",
    createAccount: 'Create an account',
    disclaimer:
      'MHFA Connect provides information and resource navigation. It is not a substitute for professional mental health care or emergency support.',
  },
  ST: {
    backHome: '← Khutlela leqepheng la lehae',
    brand: 'MHFA Connect · Lesotho',
    heading: 'Rea u amohela hape',
    intro:
      'Kena ho tsoela pele ho fumana leseli ka bophelo ba kelello, lisebelisoa tsa ho ithusa, le mekhoa ea ho fumana tšehetso sechabeng.',
    email: 'Aterese ea lengolo-tsoibila',
    password: 'Phaseoete',
    show: 'Bontša',
    hide: 'Pata',
    showPassword: 'Bontša phaseoete',
    hidePassword: 'Pata phaseoete',
    emailRequired: 'Ka kopo, kenya aterese ea hau ea lengolo-tsoibila.',
    emailInvalid:
      'Ka kopo, kenya aterese e nepahetseng ea lengolo-tsoibila.',
    passwordRequired: 'Ka kopo, kenya phaseoete ea hau.',
    emailNotConfirmed:
      'Ka kopo, netefatsa aterese ea hau ea lengolo-tsoibila ka sehokelo seo re u rometseng sona pele u kena.',
    loginError:
      'Ha rea khona ho u kenya. Hlahloba aterese ea hau ea lengolo-tsoibila le phaseoete, ebe u leka hape.',
    signingIn: 'Ho kenoa...',
    login: 'Kena',
    noAccount: "Ha u na ak'haonte?",
    createAccount: 'Theha ak’haonte',
    disclaimer:
      'MHFA Connect e fana ka leseli le thuso ea ho fumana lisebelisoa tsa tšehetso. Ha e nke sebaka sa tlhokomelo ea bophelo ba kelello e fanoang ke litsebi kapa thuso ea tšohanyetso.',
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.EN;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setSubmitError('');
    setStatus('idle');
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === 'submitting') return;

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      setStatus('success');

      // Supabase manages the authentication session.
      // Never store the password yourself.
      navigate('/app', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);

      setStatus('error');

      const message = error.message?.toLowerCase() || '';

      if (
        message.includes('email not confirmed') ||
        message.includes('email_not_confirmed')
      ) {
        setSubmitError(t.emailNotConfirmed);
      } else {
        setSubmitError(t.loginError);
      }
    }
  }

  const inputClasses =
    'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700';

  const errorClasses = 'mt-1 text-sm text-red-700';

  return (
    <main className="min-h-screen bg-[#F7FAF8] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-lg">
        <Link
          to="/"
          className="inline-block rounded text-sm font-semibold text-green-800 hover:underline focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
        >
          {t.backHome}
        </Link>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-green-800">
            {t.brand}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.heading}
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            {t.intro}
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="font-medium text-gray-900"
              >
                {t.email}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'email-error' : undefined
                }
                className={inputClasses}
              />

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className={errorClasses}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-medium text-gray-900"
              >
                {t.password}
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  className={`${inputClasses} pr-20`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? t.hidePassword : t.showPassword
                  }
                  aria-controls="password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  {showPassword ? t.hide : t.show}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className={errorClasses}
                >
                  {errors.password}
                </p>
              )}
            </div>

            {status === 'error' && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-lg bg-[#176B57] px-5 py-3 font-semibold text-white transition hover:bg-[#104C40] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? t.signingIn : t.login}
            </button>

            <p className="text-center text-sm text-gray-600">
              {t.noAccount}{' '}
              <Link
                to="/join"
                className="rounded font-semibold text-green-800 underline hover:text-green-950 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                {t.createAccount}
              </Link>
            </p>
          </form>

          <p className="mt-6 text-sm leading-6 text-gray-500">
            {t.disclaimer}
          </p>
        </section>
      </div>
    </main>
  );
}
