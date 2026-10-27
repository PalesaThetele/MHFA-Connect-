import React, { useState } from 'react';

export default function PinLock({ onUnlock, lang = 'EN' }) {
  const [pinEntry, setPinEntry] = useState('');
  const [error, setError] = useState('');

  const TEXT = {
    EN: {
      title: 'Enter PIN',
      sub: 'App is locked',
      wrong: 'Wrong PIN. Try again',
      forgot: 'Forgot PIN?',
      forgotConfirm: 'This will remove the PIN and all saved chat data. Continue?',
      reset: 'PIN Removed. Refreshing...'
    },
    SW: {
      title: 'Weka PIN',
      sub: 'Programu imefungwa',
      wrong: 'PIN si sahihi. Jaribu tena',
      forgot: 'Umesahau PIN?',
      forgotConfirm: 'Hii itafuta PIN na data zote za chat. Endelea?',
      reset: 'PIN Imefutwa. Tunafresh...'
    },
    SG: {
      title: 'Weka PIN',
      sub: 'App imefungwa',
      wrong: 'PIN si sawa. Jaribu tena',
      forgot: 'Umesahau PIN?',
      forgotConfirm: 'Hii itafuta PIN na chats zako. Tuko sawa?',
      reset: 'PIN Imetobolewa. Tuna-refresh...'
    }
  };
  const t = TEXT[lang] || TEXT.EN;

  const handleUnlock = () => {
    const savedPin = localStorage.getItem('mhfa_pin');

    // EMERGENCY: If no PIN is saved but we're on this screen, just let them in
    if(!savedPin){
      onUnlock();
      return;
    }

    if (pinEntry === savedPin) {
      setError('');
      onUnlock();
    } else {
      setError(t.wrong);
      setPinEntry('');
    }
  };

  const handleForgotPin = () => {
    if(window.confirm(t.forgotConfirm)){
      localStorage.removeItem('mhfa_pin');
      localStorage.removeItem('mhfa_messages'); // also clear saved chats
      sessionStorage.clear();
      alert(t.reset);
      window.location.reload(); // refresh app
    }
  };

  const handleKeyPress = (n) => {
    if(pinEntry.length < 4){
      setPinEntry(pinEntry + n);
      setError('');
    }
  };

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
      <div className="modal" style={{maxWidth:'400px', textAlign:'center', padding:'24px', borderRadius:'16px', background:'#fff'}}>
        <h3 style={{marginBottom:'8px'}}>{t.title}</h3>
        <p style={{color:'#64748b', marginBottom:'16px'}}>{t.sub}</p>

        <div className="pin-dots" style={{justifyContent:'center', margin:'16px 0', display:'flex', gap:'12px'}}>
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className={`pin-dot ${i < pinEntry.length? 'filled' : ''}`}
              style={{
                width:'16px',
                height:'16px',
                borderRadius:'50%',
                border:'2px solid #cbd5e1',
                background: i < pinEntry.length? '#0f172a' : '#fff'
              }}
            ></div>
          ))}
        </div>

        <div className="pin-keypad" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'16px'}}>
          {['1','2','3','4','5','6','7','8','9'].map(n => (
            <button
              key={n}
              type="button"
              className="pin-key"
              onClick={() => handleKeyPress(n)}
              style={{padding:'16px', fontSize:'18px', borderRadius:'12px', border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer'}}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="pin-key"
            onClick={() => setPinEntry(pinEntry.slice(0,-1))}
            style={{padding:'16px', fontSize:'18px', borderRadius:'12px', border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer'}}
          >
            ⌫
          </button>
          <button
            type="button"
            className="pin-key"
            onClick={() => handleKeyPress('0')}
            style={{padding:'16px', fontSize:'18px', borderRadius:'12px', border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer'}}
          >
            0
          </button>
          <button
            type="button"
            className="pin-key"
            onClick={handleUnlock}
            disabled={pinEntry.length!==4}
            style={{padding:'16px', fontSize:'18px', borderRadius:'12px', border:'none', background: pinEntry.length===4? '#0f172a' : '#cbd5e1', color:'#fff', cursor: pinEntry.length===4? 'pointer' : 'not-allowed'}}
          >
            ✓
          </button>
        </div>

        {error && <p style={{color:'red', marginBottom:'8px'}}>{error}</p>}

        <button
          type="button"
          onClick={handleForgotPin}
          style={{marginTop:'8px', background:'none', border:'none', color:'#ef4444', textDecoration:'underline', cursor:'pointer', fontSize:'14px'}}
        >
          {t.forgot}
        </button>
      </div>
    </div>
  );
}