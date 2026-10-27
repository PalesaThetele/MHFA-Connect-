import React, { useState, useEffect, useRef } from 'react';

// GREETINGS FOR EACH LANGUAGE
const GREETINGS = {
  EN: "Hi there 👋 I'm here to listen. What's on your mind today?",
  SW: "Karibu. Niko hapa kusikiza. Nini kimekuwa mawazo yako leo?",
  SG: "Sasa bro/sis 👋 Niko hapa kuskiza. Ni nini imekushika leo?"
};

export default function Chat({ userAlias = 'User', activePeer = null, onExit, lang = 'EN' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef(null);

  const targetRecipient = activePeer? activePeer.alias : 'AI Support Bot';

  // PLACEHOLDERS FOR EACH LANGUAGE
  const PLACEHOLDERS = {
    EN: `Message ${activePeer? activePeer.alias : 'AI Support Bot'}...`,
    SW: `Andika kwa ${activePeer? activePeer.alias : 'AI Support Bot'}...`,
    SG: `Tuma kwa ${activePeer? activePeer.alias : 'AI Support Bot'}...`
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // SET FIRST MESSAGE WHEN LANG CHANGES OR CHAT OPENS
  useEffect(() => {
    setMessages([{
      role: 'bot',
      text: GREETINGS[lang] || GREETINGS['EN'],
      time: 'Now'
    }]);
    setShowCrisisAlert(false);
  }, [lang, activePeer]); // reset when language or peer changes

  const handleClearChat = async () => {
    setMessages([{
      role: 'bot',
      text: GREETINGS[lang] || GREETINGS['EN'],
      time: 'Now'
    }]);
    setErrorMessage(null);
    setShowCrisisAlert(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setErrorMessage(null);
    setMessages((prev) => [...prev, { role: 'user', text: userText, time: 'Now' }]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, lang: lang })
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.priority === 'crisis') {
        setShowCrisisAlert(true);
      }

      setMessages((prev) => [...prev, { role: 'bot', text: data.reply, time: 'Now', priority: data.priority }]);

    } catch (err) {
      setIsTyping(false);
      setErrorMessage("Server haipo. Angalia kama Python inarun.");
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '16px auto', display: 'flex', flexDirection: 'column', height: '80vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>

      {activePeer && (
        <div style={{ backgroundColor: '#eff6ff', borderBottom: '1px solid #dbeafe', padding: '10px 16px', fontSize: '0.85rem', color: '#1e40af', fontWeight: '500' }}>
          💬 Direct session with <strong>{activePeer.alias}</strong> - {activePeer.specialty}
        </div>
      )}

      {showCrisisAlert && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #fecaca' }}>
          ⚠️ CRISIS ALERT: If you are in danger, please call Kenya: 1196 or 0800 720 080 immediately. You are not alone.
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ alignSelf: msg.role === 'user'? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
            <div style={{
              backgroundColor: msg.role === 'user'? '#4f46e5' : '#e2e8f0',
              color: msg.role === 'user'? '#fff' : '#1e293b',
              padding: '10px 14px',
              borderRadius: '18px',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              {msg.text}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', textAlign: msg.role === 'user'? 'right' : 'left' }}>
              {msg.time}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#e2e8f0', color: '#475569', padding: '8px 12px', borderRadius: '12px', fontSize: '0.8rem', fontStyle: 'italic' }}>
            {activePeer? `${activePeer.alias} is typing...` : 'AI Bot is typing...'}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {errorMessage && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '8px', fontSize: '0.8rem', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSend} style={{ display: 'flex', padding: '12px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', gap: '8px' }}>
        <input
          type="text"
          placeholder={PLACEHOLDERS[lang] || PLACEHOLDERS['EN']}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
        />
        <button type="button" onClick={handleClearChat} style={{ backgroundColor: '#64748b', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
          {lang === 'SW'? 'Futa' : lang === 'SG'? 'Futa' : 'Clear'}
        </button>
        <button type="submit" disabled={!input.trim() || isTyping} style={{ backgroundColor: input.trim() &&!isTyping? '#4f46e5' : '#94a3b8', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: input.trim() &&!isTyping? 'pointer' : 'not-allowed' }}>
          {lang === 'SW'? 'Tuma' : lang === 'SG'? 'Tuma' : 'Send'}
        </button>
      </form>

      <div style={{
        padding: '10px 16px',
        backgroundColor: '#f1f5f9',
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.75rem',
        color: '#475569',
        textAlign: 'center',
        lineHeight: '1.4',
        borderRadius: '0 0 12px 12px'
      }}>
        <strong>Disclaimer:</strong> MHFAConnect is for peer support and information only.
        It is not a substitute for professional counseling, therapy, or medical advice.
        If you are in crisis, please call Kenya: <strong>1196</strong> or <strong>0800 720 080</strong>.
      </div>
    </div>
  );
}
