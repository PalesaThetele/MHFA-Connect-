import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

export default function Chat({
  userAlias = 'User',
  activePeer = null,
  onExit,
  lang = 'EN',
  currentLangData,
  messages: externalMessages,
  setMessages: setExternalMessages,
}) {
  const { currentLangData: contextLangData } = useLanguage();

  const languageData = currentLangData || contextLangData;
  const labels = languageData.chat || {};

  const [internalMessages, setInternalMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  const messagesEndRef = useRef(null);

  const recipient = activePeer?.alias || 'AI Support Bot';

  const greeting =
    languageData.greeting ||
    "Hi there! I'm here to listen. What's on your mind today?";

  const messages = externalMessages ?? internalMessages;
  const setMessages = setExternalMessages ?? setInternalMessages;

  const text = {
    EN: {
      send: 'Send',
      clear: 'Clear',
      placeholder: `Message ${recipient}...`,
      typingBot: 'AI Support Bot is typing...',
      typingPeer: (name) => `${name} is typing...`,
      disclaimerTitle: 'Disclaimer:',
      disclaimer:
        'MHFA Connect provides peer support and information only. It is not a substitute for professional counselling, therapy, or medical advice.',
      crisis:
        'If you or someone else is in immediate danger, contact local emergency services or go to the nearest emergency department. You do not have to face this alone.',
      connectionError:
        'Unable to connect to the chat service. Please check that the backend is running and try again.',
      messageLabel: 'Type your message',
      messagesLabel: 'Chat messages',
      now: 'Now',
    },
    ST: {
      send: 'Romela',
      clear: 'Hlakola',
      placeholder: `Ngolla ${recipient}...`,
      typingBot: 'Mothusi oa AI oa ngola...',
      typingPeer: (name) => `${name} oa ngola...`,
      disclaimerTitle: 'Tsebiso:',
      disclaimer:
        'MHFA Connect e fana ka tšehetso ea lithaka le tlhahisoleseling feela. Ha e nke sebaka sa tlhabollo ea litsebi, phekolo kapa keletso ea bongaka.',
      crisis:
        'Haeba uena kapa motho e mong le le kotsing hang-hang, ikopanye le litšebeletso tsa tšohanyetso tsa sebakeng sa heno kapa u ee sepetleleng se haufi. Ha ua tlameha ho tobana le sena u le mong.',
      connectionError:
        'Ha ho khonehe ho hokela tšebeletsong ea puisano. Ka kopo netefatsa hore backend e ntse e sebetsa, ebe u leka hape.',
      messageLabel: 'Ngola molaetsa oa hau',
      messagesLabel: 'Melaetsa ea puisano',
      now: 'Hona joale',
    },
  };

  const words = text[lang] || text.EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages([
      {
        role: 'bot',
        text: greeting,
        time: words.now,
      },
    ]);

    setErrorMessage(null);
    setShowCrisisAlert(false);

    // Start a fresh conversation when the language or peer changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, activePeer]);

  const handleClearChat = () => {
    setMessages([
      {
        role: 'bot',
        text: greeting,
        time: words.now,
      },
    ]);

    setErrorMessage(null);
    setShowCrisisAlert(false);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const userText = input.trim();

    if (!userText || isTyping) {
      return;
    }

    setInput('');
    setErrorMessage(null);

    setMessages((previous) => [
      ...previous,
      {
        role: 'user',
        text: userText,
        time: words.now,
      },
    ]);

    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat server returned ${response.status}`);
      }

      const data = await response.json();

      if (data.priority === 'crisis') {
        setShowCrisisAlert(true);
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'bot',
          text: data.reply || 'Sorry, I could not generate a response.',
          time: words.now,
          priority: data.priority,
        },
      ]);
    } catch (error) {
      console.error('Chat request failed:', error);
      setErrorMessage(words.connectionError);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="mx-auto my-4 flex h-[80vh] min-h-[420px] w-full max-w-3xl flex-col overflow-hidden rounded-mhfa bg-white shadow-mhfa">
      {activePeer && (
        <div
          className="border-b border-mhfa-border bg-mhfa-light px-4 py-3 text-sm text-mhfa-dark"
          role="status"
        >
          💬 {labels.directSession || (lang === 'ST' ? 'Puisano e tobileng le' : 'Direct session with')}{' '}
          <strong>{activePeer.alias}</strong>
          {activePeer.specialty && ` — ${activePeer.specialty}`}
        </div>
      )}

      {showCrisisAlert && (
        <div
          className="border-b border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-800"
          role="alert"
        >
          ⚠️ {words.crisis}
        </div>
      )}

      <div
        className="flex flex-1 flex-col gap-3 overflow-y-auto bg-mhfa-background p-4"
        aria-label={words.messagesLabel}
        aria-live="polite"
      >
        {messages.map((message, index) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={`${index}-${message.role}`}
              className={`flex w-full ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="max-w-[85%] sm:max-w-[75%]">
                <div
                  className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'rounded-br-md bg-mhfa-primary text-white'
                      : 'rounded-bl-md bg-slate-200 text-slate-800'
                  }`}
                >
                  {message.text}
                </div>

                <p
                  className={`mt-1 text-xs text-slate-500 ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.time || words.now}
                </p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div
            className="self-start rounded-xl bg-slate-200 px-3 py-2 text-sm italic text-slate-600"
            role="status"
          >
            {activePeer
              ? words.typingPeer(activePeer.alias)
              : words.typingBot}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {errorMessage && (
        <div
          className="bg-red-50 px-4 py-3 text-center text-sm text-red-800"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="flex flex-wrap items-center gap-2 border-t border-mhfa-border bg-white p-3 sm:flex-nowrap sm:p-4"
      >
        <label htmlFor="chat-message" className="sr-only">
          {words.messageLabel}
        </label>

        <input
          id="chat-message"
          type="text"
          placeholder={words.placeholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isTyping}
          className="min-w-0 flex-1 rounded-full border border-mhfa-border px-4 py-3 text-sm text-mhfa-text outline-none transition focus:border-mhfa-primary focus:ring-2 focus:ring-mhfa-light disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        <button
          type="button"
          onClick={handleClearChat}
          disabled={isTyping}
          className="rounded-full bg-slate-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {words.clear}
        </button>

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="rounded-full bg-mhfa-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-mhfa-dark focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isTyping ? '…' : words.send}
        </button>
      </form>

      <footer className="border-t border-mhfa-border bg-mhfa-surfaceSoft px-4 py-3 text-center text-xs leading-relaxed text-mhfa-muted">
        <strong>{words.disclaimerTitle}</strong>{' '}
        {words.disclaimer}
      </footer>
    </section>
  );
}