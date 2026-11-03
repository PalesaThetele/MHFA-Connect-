import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ProtectedRoute from './components/ProtectedRoute';
import MHFAConnectLogo from './components/MHFAConnectLogo';
import { LanguageProvider, useLanguage } from './LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import {
  SELF_HELP_MODULES,
  PEER_COUNSELLORS,
  SUPPORT_DIRECTORY,
} from './constants';
import { sanitizeText } from './security';
import Chat from './components/Chat';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProgrammePage from './pages/ProgrammePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';

/*
 * Additional translations for interface text that was previously
 * hardcoded in App.jsx.
 *
 * Existing translations in constants.js are still used for the
 * dashboard, chat, peers, self-help resources, and directory.
 */
const APP_TEXT = {
  EN: {
    country: 'LS · Lesotho',
    account: 'Account',
    yourAccount: 'Your account',
    myAccount: 'My account',
    accountInformation: 'Account information',
    notProvided: 'Not provided',
    notAvailable: 'Not available',
    settingsPrivacy: 'Settings & Privacy',
    logout: 'Log out',
    logoutFailed: 'Logout failed',
    logoutError: 'We could not log you out. Please try again.',
    closeAccountMenu: 'Close account menu',

    howCanWeHelp: 'How can we help?',
    chooseSupport: 'Choose the support that feels right for you.',
    explore: 'Explore →',
    quickNavigation: 'Quick Navigation',

    safeChatSpace: 'A supportive space to talk things through.',
    back: 'Back',
    backHome: 'Back to home',
    backSettings: 'Back to settings',

    accountSection: 'Account',
    editProfile: 'Edit Profile',
    editProfileDescription: 'Update your profile information.',
    changePassword: 'Change Password',
    changePasswordDescription: 'Manage your account password.',

    privacyData: 'Privacy & Data',
    privacyDescription:
      'Your privacy matters. Please review how your account information and mental-health data are handled by MHFA Connect. Avoid sharing information that could identify you or another person unless it is necessary.',

    editProfileTitle: 'Edit Profile',
    changePasswordTitle: 'Change Password',
    futureFeature:
      'This section is not available yet. You can return to settings and continue using the rest of MHFA Connect.',

    pageNotFound: 'Page not found',
    returnHome: 'Return home',

    cancel: 'Cancel',
    reset: 'Reset',
    ok: 'OK',

    accountNameLabel: 'Name',
    accountEmailLabel: 'Email',

    mainNavigation: 'Main Navigation',
    closeMenu: 'Close account menu',

    emailConfirmation:
      'Please check your email for a confirmation link if you have not confirmed your account yet.',
  },

  ST: {
    country: 'LS · Lesotho',
    account: 'Ak’haonte',
    yourAccount: 'Ak’haonte ea hau',
    myAccount: 'Ak’haonte ea ka',
    accountInformation: 'Lintlha tsa ak’haonte',
    notProvided: 'Ha ea fanoa',
    notAvailable: 'Ha e fumanehe',
    settingsPrivacy: 'Litlhophiso le Lekunutu',
    logout: 'Tsoa',
    logoutFailed: 'Ho tsoa ho hlolehile',
    logoutError: 'Ha rea khona ho u ntša. Ka kopo, leka hape.',
    closeAccountMenu: 'Koala lenane la ak’haonte',

    howCanWeHelp: 'Re ka u thusa joang?',
    chooseSupport: 'Khetha tšehetso e u loketseng.',
    explore: 'Bula →',
    quickNavigation: 'Mekhoa ea ho fumana litšebeletso',

    safeChatSpace: 'Sebaka se sireletsehileng sa ho bua ka se u tšoenyang.',
    back: 'Khutlela',
    backHome: 'Khutlela hae',
    backSettings: 'Khutlela litlhophisong',

    accountSection: 'Ak’haonte',
    editProfile: 'Fetola lintlha tsa hau',
    editProfileDescription: 'Ntlafatsa lintlha tsa profil ea hau.',
    changePassword: 'Fetola phaseoete',
    changePasswordDescription: 'Laola phaseoete ea ak’haonte ea hau.',

    privacyData: 'Lekunutu le Lintlha',
    privacyDescription:
      'Lekunutu la hau le bohlokoa. Ka kopo, hlahloba hore na lintlha tsa ak’haonte ea hau le tsa bophelo ba kelello li bolokoa le ho sebelisoa joang ke MHFA Connect. Qoba ho arolelana lintlha tse ka khethollang uena kapa motho e mong ntle le haeba ho hlokahala.',

    editProfileTitle: 'Fetola lintlha tsa profil',
    changePasswordTitle: 'Fetola phaseoete',
    futureFeature:
      'Karolo ena ha e so fumanehe. U ka khutlela litlhophisong ’me ua tsoela pele ho sebelisa likarolo tse ling tsa MHFA Connect.',

    pageNotFound: 'Leqephe ha le fumanehe',
    returnHome: 'Khutlela hae',

    cancel: 'Hlakola',
    reset: 'Seta bocha',
    ok: 'Ho lokile',

    accountNameLabel: 'Lebitso',
    accountEmailLabel: 'Imeile',

    mainNavigation: 'Mokhoa oa ho tsamaea',
    closeMenu: 'Koala lenane la ak’haonte',

    emailConfirmation:
      'Ka kopo, hlahloba imeile ea hau bakeng sa sehokelo sa netefatso haeba u e-s’o netefatse ak’haonte ea hau.',
  },
};

const NAV_ITEMS = [
  { key: 'home', labelKey: 'navHome', icon: '🏠' },
  { key: 'chat', labelKey: 'navChat', icon: '💬' },
  { key: 'peer', labelKey: 'navPeers', icon: '👥' },
  { key: 'selfhelp', labelKey: 'navHelp', icon: '📚' },
  { key: 'resources', labelKey: 'navDirectory', icon: '🗺️' },
];

function ExistingApp() {
  const { lang, currentLangData } = useLanguage();

  const ui = APP_TEXT[lang] || APP_TEXT.EN;

  const isSesotho = lang === 'ST';

  const [userAlias, setUserAlias] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [screen, setScreen] = useState('home');
  const [activePeer, setActivePeer] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    title: '',
    message: '',
    type: 'alert',
    onConfirm: null,
  });

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: currentLangData.greeting,
      time: 'Now · anonymous',
    },
  ]);

  // Load the authenticated Supabase user and listen for auth changes.
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        console.error('Unable to load user:', error);
        return;
      }

      setCurrentUser(data.user);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setCurrentUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Restore locally saved chat messages.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mhfa_messages');

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (error) {
      console.error('Unable to restore saved messages:', error);
    }
  }, []);

  // Save messages locally.
  useEffect(() => {
    try {
      localStorage.setItem('mhfa_messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Unable to save chat messages:', error);
    }
  }, [messages]);

  // Update the initial greeting when the language changes.
  useEffect(() => {
    setMessages((previous) =>
      previous.length <= 1
        ? [
            {
              role: 'bot',
              text: currentLangData.greeting,
              time: 'Now · anonymous',
            },
          ]
        : previous
    );
  }, [lang, currentLangData.greeting]);

  const showPopup = (
    title,
    message,
    type = 'alert',
    onConfirm = null
  ) => {
    setPopup({
      show: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  const closePopup = () => {
    setPopup((previous) => ({ ...previous, show: false }));
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout failed:', error);

      showPopup(
        ui.logoutFailed,
        ui.logoutError
      );

      return;
    }

    setCurrentUser(null);
    setUserAlias('');
    setProfileMenuOpen(false);
    setActivePeer(null);

    setMessages([
      {
        role: 'bot',
        text: currentLangData.greeting,
        time: 'Now · anonymous',
      },
    ]);

    setScreen('home');
  };

  const downloadModule = (mod) => {
    const safeContent = sanitizeText(mod.content);

    const blob = new Blob([safeContent], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${mod.title.replace(/\s+/g, '_')}_${lang}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const goToScreen = (nextScreen) => {
    if (nextScreen === 'chat') {
      setActivePeer(null);
    }

    setProfileMenuOpen(false);
    setScreen(nextScreen);
  };

  const accountName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.email ||
    userAlias ||
    ui.account;

  return (
    <div className="min-h-screen bg-mhfa-background pb-24 font-sans text-mhfa-text">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-mhfa-border bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-dashboard flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => goToScreen('home')}
            aria-label={ui.backHome}
            className="rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
          >
            <MHFAConnectLogo />
          </button>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <span className="rounded-lg border border-mhfa-border bg-mhfa-surfaceSoft px-3 py-2 text-xs font-bold text-mhfa-dark sm:text-sm">
              {ui.country}
            </span>

            <LanguageSwitcher />

            {/* Account menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-expanded={profileMenuOpen}
                aria-haspopup="true"
                className="flex max-w-48 items-center gap-2 rounded-xl border border-mhfa-border bg-white px-3 py-2 text-sm font-semibold text-mhfa-text transition hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
              >
                <span aria-hidden="true">👤</span>

                <span className="truncate">{accountName}</span>

                <span aria-hidden="true">
                  {profileMenuOpen ? '▴' : '▾'}
                </span>
              </button>

              {profileMenuOpen && (
                <>
                  <button
                    type="button"
                    aria-label={ui.closeAccountMenu}
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileMenuOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-mhfa-border bg-white shadow-xl">
                    <div className="border-b border-mhfa-border bg-mhfa-surfaceSoft px-4 py-4">
                      <strong className="block truncate text-sm text-mhfa-dark">
                        {currentUser?.user_metadata?.full_name ||
                          ui.yourAccount}
                      </strong>

                      <span className="mt-1 block break-words text-xs text-mhfa-muted">
                        {currentUser?.email || ''}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-mhfa-surfaceSoft focus:bg-mhfa-surfaceSoft focus:outline-none"
                      onClick={() => {
                        setProfileMenuOpen(false);

                        showPopup(
                          ui.accountInformation,
                          `${ui.accountNameLabel}: ${
                            currentUser?.user_metadata?.full_name ||
                            ui.notProvided
                          }\n${ui.accountEmailLabel}: ${
                            currentUser?.email || ui.notAvailable
                          }`
                        );
                      }}
                    >
                      👤 {ui.myAccount}
                    </button>

                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-mhfa-surfaceSoft focus:bg-mhfa-surfaceSoft focus:outline-none"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setScreen('settings');
                      }}
                    >
                      ⚙️ {ui.settingsPrivacy}
                    </button>

                    <button
                      type="button"
                      className="w-full border-t border-mhfa-border px-4 py-3 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      🚪 {ui.logout}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Home dashboard */}
      {screen === 'home' && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-6 sm:px-6 sm:py-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-mhfa-dark to-mhfa-primary px-5 py-8 text-white shadow-mhfa sm:px-8 sm:py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium sm:text-sm">
              <span aria-hidden="true">🔒</span>
              <span>{currentLangData.privacy}</span>
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {currentLangData.h1}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              {currentLangData.p}
            </p>
          </section>

          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-mhfa-dark sm:text-2xl">
                {isSesotho
                  ? 'U ka qala hokae?'
                  : ui.howCanWeHelp}
              </h2>

              <p className="mt-2 text-sm leading-6 text-mhfa-muted">
                {isSesotho
                  ? 'Khetha tšebeletso e u loketseng.'
                  : ui.chooseSupport}
              </p>
            </div>

            <nav
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              aria-label={ui.quickNavigation}
            >
              {[
                {
                  key: 'chat',
                  icon: '💬',
                  title: currentLangData.qa1,
                  description: currentLangData.qa1s,
                },
                {
                  key: 'selfhelp',
                  icon: '📚',
                  title: currentLangData.qa2,
                  description: currentLangData.qa2s,
                },
                {
                  key: 'peer',
                  icon: '👥',
                  title: currentLangData.qa4,
                  description: currentLangData.qa4s,
                },
                {
                  key: 'resources',
                  icon: '🗺️',
                  title: currentLangData.qa3,
                  description: currentLangData.qa3s,
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => goToScreen(item.key)}
                  className="group rounded-2xl border border-mhfa-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-mhfa-primary hover:shadow-mhfa focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mhfa-light text-2xl transition group-hover:bg-mhfa-primary group-hover:text-white">
                    {item.icon}
                  </span>

                  <span className="mt-4 block text-base font-bold text-mhfa-dark">
                    {item.title}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-mhfa-muted">
                    {item.description}
                  </span>

                  <span className="mt-4 block text-sm font-semibold text-mhfa-primary">
                    {isSesotho ? 'Bula →' : ui.explore}
                  </span>
                </button>
              ))}
            </nav>
          </section>
        </main>
      )}

      {/* Chat */}
      {screen === 'chat' && (
        <main className="mx-auto w-full max-w-dashboard px-3 py-4 sm:px-6 sm:py-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-mhfa-dark sm:text-2xl">
                {currentLangData.navChat}
              </h1>

              <p className="mt-1 text-sm text-mhfa-muted">
                {activePeer
                  ? activePeer.alias
                  : isSesotho
                    ? 'Sebaka se sireletsehileng sa ho bua'
                    : ui.safeChatSpace}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActivePeer(null);
                setScreen('home');
              }}
              className="shrink-0 rounded-xl border border-mhfa-border bg-white px-3 py-2 text-sm font-semibold text-mhfa-dark hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
            >
              ← {ui.back}
            </button>
          </div>

          <Chat
            userAlias={userAlias}
            messages={messages}
            setMessages={setMessages}
            activePeer={activePeer}
            setActivePeer={setActivePeer}
            currentLangData={currentLangData}
            lang={lang}
            onExit={() => {
              setActivePeer(null);
              setScreen('home');
            }}
          />
        </main>
      )}

      {/* Peer support */}
      {screen === 'peer' && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-6 sm:px-6 sm:py-8">
          <section>
            <h1 className="text-2xl font-extrabold text-mhfa-dark sm:text-3xl">
              {currentLangData.peerTitle}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mhfa-muted sm:text-base">
              {currentLangData.peerSub}
            </p>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PEER_COUNSELLORS.map((peer) => {
              const langPeer = currentLangData.peers?.[peer.id];

              const displayAlias = langPeer?.alias || peer.alias;

              const displaySpecialty =
                langPeer?.specialty || peer.specialty;

              const isBusy = peer.status?.includes('Busy');

              return (
                <article
                  key={peer.id}
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-mhfa-border bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-mhfa-dark">
                      {displayAlias}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-mhfa-muted">
                      {displaySpecialty}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mhfa-muted">
                      <span
                        className={`rounded-full px-2.5 py-1 font-semibold ${
                          isBusy
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-mhfa-light text-mhfa-dark'
                        }`}
                      >
                        {isBusy
                          ? currentLangData.busy
                          : peer.status?.includes('Online')
                            ? currentLangData.online
                            : peer.status}
                      </span>

                      <span aria-hidden="true">•</span>

                      <span>{peer.rating}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      setActivePeer(peer);
                      setScreen('chat');
                    }}
                    className="shrink-0 rounded-xl bg-mhfa-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-mhfa-dark focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {isBusy
                      ? currentLangData.busy
                      : currentLangData.startPeerChat}
                  </button>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {/* Self-help resources */}
      {screen === 'selfhelp' && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-6 sm:px-6 sm:py-8">
          <section>
            <h1 className="text-2xl font-extrabold text-mhfa-dark sm:text-3xl">
              {currentLangData.selfHelpTitle}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mhfa-muted sm:text-base">
              {currentLangData.selfHelpSub}
            </p>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {SELF_HELP_MODULES.map((mod) => {
              const langMod = currentLangData.modules?.[mod.id];

              const displayTitle = langMod?.title || mod.title;
              const displayDesc = langMod?.desc || mod.desc;
              const displayContent = langMod?.content || mod.content;

              return (
                <article
                  key={mod.id}
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-mhfa-border bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-mhfa-dark">
                      {displayTitle}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-mhfa-muted">
                      {displayDesc}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mhfa-muted">
                      <span className="rounded-full bg-mhfa-surfaceSoft px-2.5 py-1">
                        {currentLangData.resourceType || mod.type}
                      </span>

                      <span>{mod.size}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      downloadModule({
                        ...mod,
                        title: displayTitle,
                        content: displayContent,
                      })
                    }
                    className="shrink-0 rounded-xl border border-mhfa-primary px-4 py-3 text-sm font-semibold text-mhfa-primary transition hover:bg-mhfa-light focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2"
                  >
                    {currentLangData.downloadBtn}
                  </button>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {/* Support directory */}
      {screen === 'resources' && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-6 sm:px-6 sm:py-8">
          <section>
            <h1 className="text-2xl font-extrabold text-mhfa-dark sm:text-3xl">
              {currentLangData.findSupportTitle}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mhfa-muted sm:text-base">
              {currentLangData.findSupportSub}
            </p>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {SUPPORT_DIRECTORY.map((item) => {
              const langDir = currentLangData.directory?.[item.id];

              const displayTitle = langDir?.title || item.title;
              const displayBadge = langDir?.badge || item.badge;

              const displayDesc =
                langDir?.desc || item.desc || '';

              const displayHours = langDir?.hours || item.hours;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-mhfa-border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-mhfa-dark">
                      {displayTitle}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.badgeClass?.includes('danger')
                          ? 'bg-red-50 text-red-700'
                          : item.badgeClass?.includes('success')
                            ? 'bg-green-50 text-green-700'
                            : 'bg-mhfa-light text-mhfa-dark'
                      }`}
                    >
                      {displayBadge}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-mhfa-muted">
                    {displayDesc}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-mhfa-border pt-4 text-sm text-mhfa-text">
                    {(langDir?.contact || item.contact) && (
                      <p className="break-words">
                        {langDir?.contact || item.contact}
                      </p>
                    )}

                    {displayHours && (
                      <p>{displayHours}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {/* Settings */}
      {screen === 'settings' && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setScreen('home')}
              className="mb-4 rounded-lg text-sm font-semibold text-mhfa-primary hover:underline focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
            >
              ← {ui.backHome}
            </button>

            <h1 className="text-2xl font-extrabold text-mhfa-dark sm:text-3xl">
              {currentLangData.settingsTitle}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-mhfa-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-mhfa-dark">
                {ui.accountSection}
              </h2>

              <div className="divide-y divide-mhfa-border">
                <button
                  type="button"
                  onClick={() => setScreen('edit-profile')}
                  className="w-full rounded-lg px-3 py-4 text-left text-sm font-medium transition hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
                >
                  👤 {ui.editProfile}

                  <span className="mt-1 block text-xs font-normal text-mhfa-muted">
                    {ui.editProfileDescription}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setScreen('change-password')}
                  className="w-full rounded-lg px-3 py-4 text-left text-sm font-medium transition hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
                >
                  🔒 {ui.changePassword}

                  <span className="mt-1 block text-xs font-normal text-mhfa-muted">
                    {ui.changePasswordDescription}
                  </span>
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-mhfa-border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-mhfa-dark">
                {ui.privacyData}
              </h2>

              <p className="mt-3 text-sm leading-7 text-mhfa-muted">
                {ui.privacyDescription}
              </p>
            </section>
          </div>
        </main>
      )}

      {/* Placeholder screens for future implementation */}
      {(screen === 'edit-profile' || screen === 'change-password') && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-mhfa-border bg-white p-6 shadow-sm sm:p-8">
            <button
              type="button"
              onClick={() => setScreen('settings')}
              className="mb-5 rounded-lg text-sm font-semibold text-mhfa-primary hover:underline focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
            >
              ← {ui.backSettings}
            </button>

            <h1 className="text-2xl font-bold text-mhfa-dark">
              {screen === 'edit-profile'
                ? ui.editProfileTitle
                : ui.changePasswordTitle}
            </h1>

            <p className="mt-3 text-sm leading-6 text-mhfa-muted">
              {ui.futureFeature}
            </p>
          </div>
        </main>
      )}

      {/* Not-yet-defined screen fallback */}
      {![
        'home',
        'chat',
        'peer',
        'selfhelp',
        'resources',
        'settings',
        'edit-profile',
        'change-password',
      ].includes(screen) && (
        <main className="mx-auto w-full max-w-dashboard px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-mhfa-border bg-white p-6">
            <h1 className="text-xl font-bold text-mhfa-dark">
              {ui.pageNotFound}
            </h1>

            <button
              type="button"
              onClick={() => setScreen('home')}
              className="mt-4 rounded-xl bg-mhfa-primary px-4 py-3 text-sm font-semibold text-white hover:bg-mhfa-dark"
            >
              {ui.returnHome}
            </button>
          </div>
        </main>
      )}

      {/* Popup */}
      {popup.show && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={closePopup}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="popup-title"
              className="text-xl font-bold text-mhfa-dark"
            >
              {popup.title}
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-mhfa-muted">
              {popup.message}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              {popup.type === 'confirm' && (
                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-xl border border-mhfa-border px-4 py-2.5 text-sm font-semibold text-mhfa-text hover:bg-mhfa-surfaceSoft focus:outline-none focus:ring-2 focus:ring-mhfa-primary"
                >
                  {ui.cancel}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (popup.onConfirm) popup.onConfirm();
                  closePopup();
                }}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  popup.type === 'confirm'
                    ? 'bg-red-700 hover:bg-red-800 focus:ring-red-600'
                    : 'bg-mhfa-primary hover:bg-mhfa-dark focus:ring-mhfa-primary'
                }`}
              >
                {popup.type === 'confirm' ? ui.reset : ui.ok}
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Fixed bottom navigation */}
      <nav
        aria-label={ui.mainNavigation}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-mhfa-border bg-white/95 shadow-[0_-4px_18px_rgba(16,76,64,0.08)] backdrop-blur"
      >
        <div className="mx-auto grid w-full max-w-dashboard grid-cols-5">
          {NAV_ITEMS.map((item) => {
            const isActive = screen === item.key;

            return (
              <button
                key={item.key}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => goToScreen(item.key)}
                className={`flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2.5 text-center transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mhfa-primary sm:py-3 ${
                  isActive
                    ? 'bg-mhfa-light text-mhfa-dark'
                    : 'text-mhfa-muted hover:bg-mhfa-surfaceSoft hover:text-mhfa-dark'
                }`}
              >
                <span
                  className="text-lg sm:text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span
                  className={`max-w-full truncate text-[10px] sm:text-xs ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {currentLangData[item.labelKey]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/programmes/:programmeId"
            element={<ProgrammePage />}
          />

          <Route path="/join" element={<JoinPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/thank-you" element={<ThankYouPage />} />

          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <ExistingApp />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}