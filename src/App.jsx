import React, { useState, useEffect } from 'react';
import { LANGS, SELF_HELP_MODULES, PEER_COUNSELLORS, SUPPORT_DIRECTORY } from './constants';
import { sanitizeText } from './security';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

const COUNTRY_CONFIG = { KE: { name: '🇰🇪 Kenya', defaultLang: 'SW' } };
const LANGUAGE_LABELS = { EN: '🇬🇧 English', SW: '🇰🇪 Kiswahili', SG: '🇰🇪 Sheng' };
const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '🏠' }, { key: 'chat', label: 'Chat', icon: '💬' },
  { key: 'peer', label: 'Peers', icon: '👥' }, { key: 'selfhelp', label: 'Help', icon: '📚' },
  { key: 'resources', label: 'Directory', icon: '🗺️' }, { key: 'settings', label: 'Settings', icon: '⚙️' }
];

export default function App() {
  const [country] = useState('KE');
  const [lang, setLang] = useState('EN');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('mhfa_auth') === 'true');
  const [userAlias, setUserAlias] = useState(() => sessionStorage.getItem('mhfa_alias') || '');
  const [screen, setScreen] = useState('home');
  const [pinModal, setPinModal] = useState(false);
  const [pinEntry, setPinEntry] = useState('');
  const [activePeer, setActivePeer] = useState(null);

  const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null });
  const [savedPin, setSavedPin] = useState(() => localStorage.getItem('mhfa_pin') || '');
  const [pinVerified, setPinVerified] = useState(() =>!localStorage.getItem('mhfa_pin'));
  const currentLangData = LANGS[lang] || LANGS['EN'];

  const [messages, setMessages] = useState([{ role: 'bot', text: currentLangData.greeting, time: 'Now · anonymous' }]);

  useEffect(() => { const saved = localStorage.getItem('mhfa_messages'); if(saved) setMessages(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('mhfa_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { setMessages((prev) => prev.length <= 1? [{ role: 'bot', text: currentLangData.greeting, time: 'Now · anonymous' }] : prev); }, [lang]);

  const showPopup = (title, message, type = 'alert', onConfirm = null) => setPopup({ show: true, title, message, type, onConfirm });
  const closePopup = () => setPopup({...popup, show: false });

  const handleLoginSuccess = (alias) => {
    setUserAlias(alias); setIsAuthenticated(true);
    sessionStorage.setItem('mhfa_auth', 'true'); sessionStorage.setItem('mhfa_alias', alias);
    const pin = localStorage.getItem('mhfa_pin'); setSavedPin(pin || ''); setPinVerified(!pin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); setUserAlias(''); sessionStorage.clear();
    setMessages([{ role: 'bot', text: currentLangData.greeting, time: 'Now · anonymous' }]);
    setScreen('home'); setActivePeer(null); setPinVerified(!localStorage.getItem('mhfa_pin'));
  };

  const downloadModule = (mod) => {
    const safeContent = sanitizeText(mod.content);
    const blob = new Blob([safeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = `${mod.title.replace(/\s+/g, '_')}_${lang}.txt`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return <Login currentLangData={currentLangData} lang={lang} setLang={setLang} onLoginSuccess={handleLoginSuccess} />;
  }

  if (!pinVerified) {
    const handleForgotPin = () => {
      showPopup('Reset App', '⚠️ Warning: This will delete your PIN and ALL chat history. This cannot be undone.', 'confirm', () => {
        // DO RESET FIRST, THEN LOGOUT
        localStorage.removeItem('mhfa_pin');
        localStorage.removeItem('mhfa_messages');
        sessionStorage.clear();
        setSavedPin('');
        setPinEntry('');
        setMessages([{ role: 'bot', text: currentLangData.greeting, time: 'Now · anonymous' }]);
        setPinVerified(true); // This will skip lock next login
        closePopup(); // Close confirm first
        setTimeout(() => {
          handleLogout(); // Then logout
          setTimeout(() => showPopup('Success', 'PIN and chat history cleared. You can now set a new PIN.'), 100);
        }, 50);
      });
    };

    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding:'20px' }}>
        <h2>🔒 {currentLangData.pinModalTitle || 'Enter PIN'}</h2>
        <p>{currentLangData.pinModalSub || 'Unlock to continue'}</p>
        <div className="pin-dots" style={{margin:'20px 0'}}>
          {[0, 1, 2, 3].map((i) => <div key={i} className={`pin-dot ${i < pinEntry.length? 'filled' : ''}`}></div>)}
        </div>
        <div className="pin-keypad">
          {['1','2','3','4','5','6','7','8','9'].map((n) => <button key={n} type="button" className="pin-key" onClick={() => pinEntry.length < 4 && setPinEntry(pinEntry + n)}>{n}</button>)}
          <button type="button" className="pin-key" onClick={() => setPinEntry(pinEntry.slice(0, -1))}>⌫</button>
          <button type="button" className="pin-key" onClick={() => pinEntry.length < 4 && setPinEntry(pinEntry + '0')}>0</button>
          <button type="button" className="pin-key" onClick={() => setPinEntry('')}>✕</button>
        </div>
        <button type="button" className="download-btn" style={{marginTop:'20px', padding:'10px 30px'}} onClick={() => {
            if(pinEntry.length!== 4) {
              showPopup('Error', 'Please enter 4 digits');
              return;
            }
            if(pinEntry === savedPin){
              setPinVerified(true);
              setPinEntry('');
            } else {
              setPinEntry('');
              setTimeout(() => showPopup('Error', 'Wrong PIN. Try again.'), 50);
            }
          }}>Unlock</button>
        <button type="button" style={{marginTop:'16px', background:'none', border:'none', color:'#ef4444', textDecoration:'underline', cursor:'pointer', fontSize:'14px'}} onClick={handleForgotPin}>
          Forgot PIN? Reset App
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="top-bar">
        <button type="button" className="logo-btn" onClick={() => setScreen('home')}><div className="logo">MHFA<span>Connect</span></div></button>
        <div className="top-select-wrapper"><span className="top-dropdown" style={{display:'inline-block', padding:'8px 12px', background:'#fff', color:'#000', borderRadius:'8px', fontWeight:'bold'}}>🇰🇪 Kenya</span></div>
        <div className="top-select-wrapper">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="top-dropdown">
            <option value="EN">🇬🇧 English</option><option value="SW">🇰🇪 Kiswahili</option><option value="SG">🇰🇪 Sheng</option>
          </select>
        </div>
        <button type="button" className="user-badge" onClick={handleLogout}>👤 {userAlias} <span className="logout-icon">🚪</span></button>
      </header>

      {screen === 'home' && (
        <main className="screen">
          <div className="hero-band">
            <div className="privacy-banner"><span>🔒</span><span>{currentLangData.privacy}</span></div>
            <h1>{currentLangData.h1}</h1><p>{currentLangData.p}</p>
          </div>
          <nav className="quick-actions" aria-label="Quick Navigation">
            <button type="button" className="qa-card" onClick={() => { setActivePeer(null); setScreen('chat'); }}><div className="qa-icon">💬</div><div className="qa-label">{currentLangData.qa1}</div><div className="qa-sub">{currentLangData.qa1s}</div></button>
            <button type="button" className="qa-card" onClick={() => setScreen('selfhelp')}><div className="qa-icon">📚</div><div className="qa-label">{currentLangData.qa2}</div><div className="qa-sub">{currentLangData.qa2s}</div></button>
            <button type="button" className="qa-card" onClick={() => setScreen('peer')}><div className="qa-icon">👥</div><div className="qa-label">{currentLangData.qa4}</div><div className="qa-sub">{currentLangData.qa4s}</div></button>
            <button type="button" className="qa-card" onClick={() => setScreen('resources')}><div className="qa-icon">🗺️</div><div className="qa-label">{currentLangData.qa3}</div><div className="qa-sub">{currentLangData.qa3s}</div></button>
          </nav>
        </main>
      )}

      {screen === 'chat' && (
        <Chat userAlias={userAlias} messages={messages} setMessages={setMessages} activePeer={activePeer} setActivePeer={setActivePeer} currentLangData={currentLangData} lang={lang} onOpenPinModal={() => setPinModal(true)} onExit={() => { setActivePeer(null); setScreen('home'); }} />
      )}

      {screen === 'peer' && (
        <main className="screen">
          <h2 className="screen-title">{currentLangData.peerTitle}</h2><p className="screen-subtitle">{currentLangData.peerSub}</p>
          <div className="module-list">
            {PEER_COUNSELLORS.map((p) => {
              const langPeer = currentLangData.peers?.[p.id]; const displaySpecialty = langPeer?.specialty || p.specialty;
              return (
                <article key={p.id} className="module-card">
                  <div className="mod-info"><h3 className="mod-title">{p.alias}</h3><p className="mod-desc">{displaySpecialty}</p><div className="mod-meta"><span>{p.status}</span> • <span>{p.rating}</span></div></div>
                  <button type="button" className="download-btn" disabled={p.status.includes('Busy')} onClick={() => { setActivePeer(p); setScreen('chat'); }}>{p.status.includes('Busy')? 'Busy' : currentLangData.startPeerChat}</button>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {screen === 'selfhelp' && (
        <main className="screen">
          <h2 className="screen-title">{currentLangData.selfHelpTitle}</h2><p className="screen-subtitle">{currentLangData.selfHelpSub}</p>
          <div className="module-list">
            {SELF_HELP_MODULES.map((mod) => {
              const langMod = currentLangData.modules?.[mod.id]; const displayTitle = langMod?.title || mod.title; const displayDesc = langMod?.desc || mod.desc; const baseContent = langMod?.content || mod.content;
              return (
                <article key={mod.id} className="module-card">
                  <div className="mod-info"><h3 className="mod-title">{displayTitle}</h3><p className="mod-desc">{displayDesc}</p><div className="mod-meta"><span>{mod.type}</span> • <span>{mod.size}</span></div></div>
                  <button type="button" className="download-btn" onClick={() => downloadModule({...mod, title: displayTitle, content: baseContent })}>{currentLangData.downloadBtn}</button>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {screen === 'resources' && (
        <main className="screen">
          <h2 className="screen-title">{currentLangData.findSupportTitle}</h2><p className="screen-subtitle">{currentLangData.findSupportSub}</p>
          <div className="dir-list">
            {SUPPORT_DIRECTORY.map((item) => {
              const langDir = currentLangData.directory?.[item.id]; const displayTitle = langDir?.title || item.title; const displayDesc = langDir?.desc || item.desc;
              return (
                <article key={item.id} className="dir-card">
                  <div className="dir-top"><h3 className="dir-title">{displayTitle}</h3><span className={`dir-badge ${item.badgeClass}`}>{item.badge}</span></div>
                  <p className="dir-desc">{displayDesc}</p><div className="dir-info-block"><div>{item.contact}</div><div>{item.hours}</div></div>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {screen === 'settings' && (
        <main className="screen">
          <h2 className="screen-title">{currentLangData.settingsTitle}</h2>
          <div className="settings-body">
            <section className="setting-group">
              <h3 className="setting-group-title">{currentLangData.privacySec}</h3>
              <button type="button" className="setting-row" onClick={() => setPinModal(true)}>
                <div className="setting-left"><h4>{currentLangData.pinLock}</h4><p>{currentLangData.pinSub}</p></div>
                <span className="setting-value">{savedPin? 'Change PIN' : currentLangData.setPinBtn}</span>
              </button>
            </section>
            <section className="danger-zone"><p>{currentLangData.dangerZone}</p><button type="button" className="logout-session-btn" onClick={handleLogout}>{currentLangData.logoutBtn}</button></section>
          </div>
        </main>
      )}

      {pinModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>{currentLangData.pinModalTitle}</h3><p>{currentLangData.pinModalSub}</p>
            <div className="pin-dots">{[0, 1, 2, 3].map((i) => <div key={i} className={`pin-dot ${i < pinEntry.length? 'filled' : ''}`}></div>)}</div>
            <div className="pin-keypad">
              {['1','2','3','4','5','6','7','8','9'].map((n) => <button key={n} type="button" className="pin-key" onClick={() => pinEntry.length < 4 && setPinEntry(pinEntry + n)}>{n}</button>)}
              <button type="button" className="pin-key" onClick={() => setPinEntry(pinEntry.slice(0, -1))}>⌫</button>
              <button type="button" className="pin-key" onClick={() => pinEntry.length < 4 && setPinEntry(pinEntry + '0')}>0</button>
              <button type="button" className="pin-key" onClick={() => setPinModal(false)}>✕</button>
            </div>
            <div className="modal-btns">
              <button type="button" className="modal-btn ghost" onClick={() => {setPinModal(false); setPinEntry('');}}>{currentLangData.cancel}</button>
              <button type="button" className="modal-btn primary" onClick={() => {
                localStorage.setItem('mhfa_pin', pinEntry); setSavedPin(pinEntry); setPinVerified(true); setPinModal(false); setPinEntry('');
                setTimeout(() => showPopup('Success', 'PIN Set Successfully!'), 100);
              }}>{currentLangData.savePin}</button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div className="app-popup-overlay" onClick={closePopup}>
          <div className="app-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{popup.title}</h3><p>{popup.message}</p>
            <div className="app-popup-btns">
              {popup.type === 'confirm' && <button className="app-popup-btn ghost" onClick={closePopup}>Cancel</button>}
              <button className={`app-popup-btn ${popup.type === 'confirm'? 'danger' : 'primary'}`} onClick={() => { if(popup.onConfirm) popup.onConfirm(); closePopup(); }}>
                {popup.type === 'confirm'? 'Reset' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => (
          <button key={item.key} type="button" className={`nav-item ${screen === item.key? 'active' : ''}`} onClick={() => { if (item.key === 'chat') setActivePeer(null); setScreen(item.key); }}>
            <span className="nav-icon">{item.icon}</span><span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}