
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../LanguageContext';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  university: '',
  studentStatus: '',
  supportOption: '',
  consent: false,
};

const TEXT = {
  EN: {
    backHome: '← Back to home',
    heading: 'Join our community',
    intro:
      'Create your profile to explore mental health information, self-help resources, and supportive community options designed with students and graduates in mind.',
    ready: 'Ready to get started?',
    readyDescription:
      'Complete the form below. Required fields will be checked before your registration is submitted.',
    fullName: 'Full name',
    email: 'Email address',
    password: 'Create password',
    confirmPassword: 'Confirm password',
    university: 'University or institution',
    studentQuestion: 'Which best describes you?',
    current: 'Current student',
    graduate: 'Graduate',
    prospective: 'Prospective student',
    other: 'Other',
    supportQuestion: 'What would you like to explore?',
    chooseOption: 'Choose an option',
    selfHelp: 'Self-help resources',
    peerSupport: 'Peer support',
    mentalHealth: 'Mental health information',
    allResources: 'Explore all available resources',
    consent:
      'I consent to the use of the information I submit for registration. I understand that MHFA Connect provides mental health information and resource navigation, not professional diagnosis or emergency care.',
    clearForm: 'Clear Form',
    createAccount: 'Create my account',
    creatingAccount: 'Creating your account...',
    tryAgain: 'Try registration again',
    show: 'Show',
    hide: 'Hide',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    showConfirm: 'Show confirmation password',
    hideConfirm: 'Hide confirmation password',
    passwordHint: 'Use at least 8 characters.',
    alreadyAccount: 'Already have an account?',
    login: 'Log in',
    disclaimer:
      'MHFA Connect provides information and resource navigation. It is not a substitute for professional mental health care or emergency support.',
    registrationReceived: 'Registration received!',
    accountCreated: 'Account created successfully!',
    confirmEmail:
      'Please continue to the next page for instructions on confirming your email address.',
    registrationSuccess:
      'Your registration was successful. Continue to see your next steps.',
    continue: 'Continue',
    registrationFailed: 'Registration unsuccessful',
    accountExists:
      'An account may already exist with this email address. Try logging in instead.',
    passwordRequirements:
      'Your password does not meet the authentication requirements. Please review it and try again.',
    networkError:
      'We could not connect to the server. Check your internet connection and try again.',
    generalError:
      'We could not complete your registration. Please try again.',
    fullNameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    passwordRequired: 'Please create a password.',
    passwordShort: 'Your password must contain at least 8 characters.',
    confirmRequired: 'Please confirm your password.',
    passwordMismatch: 'Your passwords do not match.',
    universityRequired: 'Please enter your university or institution.',
    studentRequired: 'Please select an option.',
    supportRequired: 'Please choose what you would like to explore.',
    consentRequired: 'Please confirm your consent to continue.',
    accountMayExist:
      'An account may already exist with this email address. Try logging in instead.',
    clearConfirm: 'Clear all form fields and reset the form?',
  },

  ST: {
    backHome: '← Khutlela leqepheng la lehae',
    heading: 'Eba karolo ea sechaba sa rona',
    intro:
      'Theha profaele ea hau ho fumana leseli ka bophelo ba kelello, lisebelisoa tsa ho ithusa le tšehetso e loketseng baithuti le ba seng ba qetile lithuto.',
    ready: 'U se u loketse ho qala?',
    readyDescription:
      'Tlatsa foromo e ka tlase. Likarolo tse hlokahalang li tla hlahlojoa pele o ingolisa.',
    fullName: 'Mabitso a felletseng',
    email: 'Aterese ea lengolo-tsoibila',
    password: 'Etsa phasewete',
    confirmPassword: 'Netefatsa phasewete',
    university: 'Univesithi kapa setsi sa thuto',
    studentQuestion: 'Ke efe e u hlalosang hantle?',
    current: 'Moithuti oa hona joale',
    graduate: 'Motho ea qetileng lithuto',
    prospective: 'Motho ea rerang ho ithuta',
    other: 'Tse ling',
    supportQuestion: 'U ka rata ho ithuta ka eng?',
    chooseOption: 'Khetha khetho',
    selfHelp: 'Lisebelisoa tsa ho ithusa',
    peerSupport: 'Tšehetso ea lithaka',
    mentalHealth: 'Leseli ka bophelo ba kelello',
    allResources: 'Sheba lisebelisoa tsohle tse fumanehang',
    consent:
      'Ke lumela hore lintlha tseo ke fanang ka tsona li sebelisoe bakeng sa ngoliso. Kea utloisisa hore MHFA Connect e fana ka leseli ka bophelo ba kelello le tataiso ea ho fumana lisebelisoa, empa ha e fane ka tlhahlobo ea bongaka kapa thuso ea tšohanyetso.',
    clearForm: 'Hlakola Foromo',
    createAccount: 'Theha akhaonto ea ka',
    creatingAccount: 'Akhaonto ea hau e ntse e etsoa...',
    tryAgain: 'Leka ho ingolisa hape',
    show: 'Bontša',
    hide: 'Pata',
    showPassword: 'Bontša phasewete',
    hidePassword: 'Pata phasewete',
    showConfirm: 'Bontša phasewete ea netefatso',
    hideConfirm: 'Pata phasewete ea netefatso',
    passwordHint: 'Sebelisa bonyane litlhaku tse 8.',
    alreadyAccount: 'U se u ntse u na le akhaonto?',
    login: 'Kena',
    disclaimer:
      'MHFA Connect e fana ka leseli le tataiso ea ho fumana lisebelisoa. Ha e nke sebaka sa tlhokomelo ea litsebi tsa bophelo ba kelello kapa thuso ea tšohanyetso.',
    registrationReceived: 'Ngoliso e amohetsoe!',
    accountCreated: 'Akhaonto e entsoe ka katleho!',
    confirmEmail:
      'Tsoela pele leqepheng le latelang ho fumana litaelo tsa ho netefatsa aterese ea hau ea lengolo-tsoibila.',
    registrationSuccess:
      'U ngolisitse ka katleho. Tsoela pele ho bona mehato e latelang.',
    continue: 'Tsoela pele',
    registrationFailed: 'Ngoliso ha ea atleha',
    accountExists:
      'Ho ka etsahala hore akhaonto e se e ntse e le teng ka aterese ena ea lengolo-tsoibila. Leka ho kena.',
    passwordRequirements:
  'Phasewete ea hau ha e fihlelle litlhoko tsa ts\'ireletso. E hlahlobe ebe u leka hape.',

    networkError:
      'Ha rea khona ho hokela seva. Hlahloba khokahano ea inthanete ebe u leka hape.',
    generalError:
      'Ha rea khona ho phethela ngoliso ea hau. Ka kopo, leka hape.',
    fullNameRequired: 'Ka kopo, kenya mabitso a hau a felletseng.',
    emailRequired: 'Ka kopo, kenya aterese ea lengolo-tsoibila.',
    emailInvalid: 'Ka kopo, kenya aterese e nepahetseng ea lengolo-tsoibila.',
    passwordRequired: 'Ka kopo, etsa phaseoete.',
    passwordShort: 'phaseoete e lokela ho ba le bonyane litlhaku tse 8.',
    confirmRequired: 'Ka kopo, netefatsa phaseoete ea hau.',
    passwordMismatch: 'Liphasewete ha li tšoane.',
    universityRequired: 'Ka kopo, kenya lebitso la univesithi kapa setsi sa thuto.',
    studentRequired: 'Ka kopo, khetha khetho.',
    supportRequired: 'Ka kopo, khetha seo u batlang ho ithuta ka sona.',
    consentRequired: 'Ka kopo, netefatsa tumello ea hau hore u tsoele pele.',
    accountMayExist:
      'Ho ka etsahala hore akhaonto e se e ntse e le teng ka aterese ena ea lengolo-tsoibila. Leka ho kena.',
    clearConfirm: 'Hlakola likarolo tsohle tsa foromo le ho e qala bocha?',
  },
};

export default function JoinPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.EN;

  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [registrationDetails, setRegistrationDetails] = useState(null);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setSubmitError('');

    if (status !== 'idle') {
      setStatus('idle');
      setRegistrationDetails(null);
    }
  }

  function clearForm() {
    if (status === 'submitting') return;

    setFormData({ ...INITIAL_FORM });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setStatus('idle');
    setSubmitError('');
    setRegistrationDetails(null);
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.fullNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.passwordShort;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.confirmRequired;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    if (!formData.university.trim()) {
      newErrors.university = t.universityRequired;
    }

    if (!formData.studentStatus) {
      newErrors.studentStatus = t.studentRequired;
    }

    if (!formData.supportOption) {
      newErrors.supportOption = t.supportRequired;
    }

    if (!formData.consent) {
      newErrors.consent = t.consentRequired;
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === 'submitting' || status === 'success') return;

    setSubmitError('');

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/thank-you`,
          data: {
            full_name: formData.fullName.trim(),
            university: formData.university.trim(),
            student_status: formData.studentStatus,
          },
        },
      });

      if (error) throw error;

      setRegistrationDetails({
        registrationComplete: true,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        requiresEmailConfirmation: !data.session,
      });

      setStatus('success');
    } catch (error) {
      console.error('Registration failed:', error);
      setStatus('error');

      const message = error.message?.toLowerCase() || '';

      if (
        message.includes('already registered') ||
        message.includes('already exists')
      ) {
        setSubmitError(t.accountExists);
      } else if (message.includes('password')) {
        setSubmitError(t.passwordRequirements);
      } else if (
        message.includes('fetch') ||
        message.includes('network')
      ) {
        setSubmitError(t.networkError);
      } else {
        setSubmitError(t.generalError);
      }
    }
  }

  function continueToThankYou() {
    if (!registrationDetails) return;

    navigate('/thank-you', {
      state: registrationDetails,
    });
  }

  const inputClasses =
    'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-mhfa-primary focus:outline-none focus:ring-2 focus:ring-mhfa-primary';

  const errorClasses = 'mt-1 text-sm text-red-700';

  const studentOptions = [
    { value: 'current', label: t.current },
    { value: 'graduate', label: t.graduate },
    { value: 'prospective', label: t.prospective },
    { value: 'other', label: t.other },
  ];

  return (
    <main className="min-h-screen bg-mhfa-background px-4 py-10 font-sans text-mhfa-text sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-block rounded text-sm font-semibold text-mhfa-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
        >
          {t.backHome}
        </Link>

        <section className="mt-6 rounded-2xl bg-mhfa-surface p-6 shadow-mhfa sm:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-mhfa-primary">
            MHFA Connect · Lesotho
          </p>

          <h1 className="mt-3 text-3xl font-bold text-mhfa-text sm:text-4xl">
            {t.heading}
          </h1>

          <p className="mt-4 leading-7 text-mhfa-muted">{t.intro}</p>

          {status === 'idle' && (
            <div
              role="status"
              className="mt-6 rounded-lg border border-mhfa-border bg-mhfa-surfaceSoft p-4 text-sm leading-6 text-mhfa-muted"
            >
              <strong className="text-mhfa-dark">{t.ready}</strong>
              <p className="mt-1">{t.readyDescription}</p>
            </div>
          )}

          {status === 'success' && registrationDetails && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5"
            >
              <h2 className="text-lg font-bold text-green-900">
                {registrationDetails.requiresEmailConfirmation
                  ? t.registrationReceived
                  : t.accountCreated}
              </h2>

              <p className="mt-2 text-sm leading-6 text-green-900">
                {registrationDetails.requiresEmailConfirmation
                  ? t.confirmEmail
                  : t.registrationSuccess}
              </p>

              <button
                type="button"
                onClick={continueToThankYou}
                className="mt-4 w-full rounded-lg bg-mhfa-primary px-5 py-3 font-semibold text-white transition hover:bg-mhfa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2 sm:w-auto"
              >
                {t.continue}
              </button>
            </div>
          )}

          {status !== 'success' && (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-6"
            >
              <div>
                <label htmlFor="fullName" className="font-medium text-mhfa-text">
                  {t.fullName}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={inputClasses}
                />
                {errors.fullName && (
                  <p id="fullName-error" role="alert" className={errorClasses}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="font-medium text-mhfa-text">
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClasses}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className={errorClasses}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="font-medium text-mhfa-text">
                  {t.password}
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? 'password-hint password-error'
                        : 'password-hint'
                    }
                    className={`${inputClasses} pr-20`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                    aria-controls="password"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold text-mhfa-primary hover:bg-mhfa-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary"
                  >
                    {showPassword ? t.hide : t.show}
                  </button>
                </div>

                <p id="password-hint" className="mt-1 text-sm text-mhfa-muted">
                  {t.passwordHint}
                </p>

                {errors.password && (
                  <p id="password-error" role="alert" className={errorClasses}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="font-medium text-mhfa-text"
                >
                  {t.confirmPassword}
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                      errors.confirmPassword
                        ? 'confirmPassword-error'
                        : undefined
                    }
                    className={`${inputClasses} pr-20`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    aria-label={
                      showConfirmPassword ? t.hideConfirm : t.showConfirm
                    }
                    aria-controls="confirmPassword"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold text-mhfa-primary hover:bg-mhfa-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary"
                  >
                    {showConfirmPassword ? t.hide : t.show}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    role="alert"
                    className={errorClasses}
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="university"
                  className="font-medium text-mhfa-text"
                >
                  {t.university}
                </label>
                <input
                  id="university"
                  name="university"
                  type="text"
                  autoComplete="organization"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.university)}
                  aria-describedby={
                    errors.university ? 'university-error' : undefined
                  }
                  className={inputClasses}
                />
                {errors.university && (
                  <p id="university-error" role="alert" className={errorClasses}>
                    {errors.university}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="font-medium text-mhfa-text">
                  {t.studentQuestion}
                </legend>

                <div className="mt-3 space-y-2">
                  {studentOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-mhfa-surfaceSoft"
                    >
                      <input
                        type="radio"
                        name="studentStatus"
                        value={option.value}
                        checked={formData.studentStatus === option.value}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(errors.studentStatus)}
                        className="h-4 w-4 accent-mhfa-primary"
                      />
                      <span className="text-mhfa-text">{option.label}</span>
                    </label>
                  ))}
                </div>

                {errors.studentStatus && (
                  <p role="alert" className={errorClasses}>
                    {errors.studentStatus}
                  </p>
                )}
              </fieldset>

              <div>
                <label
                  htmlFor="supportOption"
                  className="font-medium text-mhfa-text"
                >
                  {t.supportQuestion}
                </label>

                <select
                  id="supportOption"
                  name="supportOption"
                  value={formData.supportOption}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.supportOption)}
                  aria-describedby={
                    errors.supportOption ? 'supportOption-error' : undefined
                  }
                  className={inputClasses}
                >
                  <option value="">{t.chooseOption}</option>
                  <option value="self-help">{t.selfHelp}</option>
                  <option value="peer-support">{t.peerSupport}</option>
                  <option value="mental-health-information">{t.mentalHealth}</option>
                  <option value="all">{t.allResources}</option>
                </select>

                {errors.supportOption && (
                  <p
                    id="supportOption-error"
                    role="alert"
                    className={errorClasses}
                  >
                    {errors.supportOption}
                  </p>
                )}
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-mhfa-text">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className="mt-1 h-4 w-4 shrink-0 accent-mhfa-primary"
                  />
                  <span>{t.consent}</span>
                </label>

                {errors.consent && (
                  <p id="consent-error" role="alert" className={errorClasses}>
                    {errors.consent}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                >
                  <strong className="block">{t.registrationFailed}</strong>
                  <p className="mt-1">{submitError}</p>

                  {submitError === t.accountExists && (
                    <Link
                      to="/login"
                      className="mt-2 inline-block font-semibold underline"
                    >
                      {t.login}
                    </Link>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-mhfa-primary px-5 py-3 font-semibold text-white transition hover:bg-mhfa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    {t.creatingAccount}
                  </>
                ) : status === 'error' ? (
                  t.tryAgain
                ) : (
                  t.createAccount
                )}
              </button>

              <button
                type="button"
                onClick={clearForm}
                disabled={status === 'submitting'}
                className="w-full rounded-lg border border-mhfa-border bg-white px-5 py-3 font-semibold text-mhfa-text transition hover:bg-mhfa-surfaceSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t.clearForm}
              </button>

              <p className="text-center text-sm text-mhfa-muted">
                {t.alreadyAccount}{' '}
                <Link
                  to="/login"
                  className="rounded font-semibold text-mhfa-primary underline hover:text-mhfa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary"
                >
                  {t.login}
                </Link>
              </p>

              <p className="text-sm leading-6 text-mhfa-muted">
                {t.disclaimer}
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
