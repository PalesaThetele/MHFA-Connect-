import React, { useState, useEffect } from 'react';
import { SELF_HELP_MODULES, LANGS } from '../constants';
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default function SelfHelp({ selectedLanguage = 'GB English', onDownload }) {
  const [loadingId, setLoadingId] = useState(null);
  const [translatedCards, setTranslatedCards] = useState({});
  const [isTranslatingUI, setIsTranslatingUI] = useState(false);

  // 1. Precise Language Matcher
  const getLangData = (langStr) => {
    if (!langStr) return LANGS.EN;
    if (LANGS[langStr]) return LANGS[langStr];

    const str = String(langStr).toLowerCase();
    if (str.includes('sesotho') || str.includes('sotho') || str.includes('ls')) return LANGS.SH;
    if (str.includes('swahili') || str.includes('kiswahili') || str.includes('sw')) return LANGS.SW;
    if (str.includes('sheng') || str.includes('ke_sh')) return LANGS.KE_SH;

    return LANGS.EN;
  };

  const currentLangData = getLangData(selectedLanguage);
  const isEnglish = selectedLanguage === 'GB English' || selectedLanguage.toLowerCase().includes('en');

  // 2. Dynamic AI fallback for missing translations
  useEffect(() => {
    async function translateAllUI() {
      if (isEnglish) {
        setTranslatedCards({});
        return;
      }

      const hasFullStatic = SELF_HELP_MODULES.every(
        (m) => currentLangData?.modules?.[m.id]?.title && currentLangData?.modules?.[m.id]?.desc
      );

      if (hasFullStatic) {
        setTranslatedCards({});
        return;
      }

      if (!ai) return;

      setIsTranslatingUI(true);
      try {
        const payload = SELF_HELP_MODULES.map((m) => ({
          id: m.id,
          title: m.title,
          desc: m.desc
        }));

        const prompt = `Translate the following list of mental health resource titles and descriptions into ${selectedLanguage}. 
Return ONLY a valid JSON array matching this format: [{"id": "m1", "title": "...", "desc": "..."}]`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${prompt}\n\n${JSON.stringify(payload)}`
        });

        if (response.text) {
          const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          const mapped = {};
          parsed.forEach((item) => {
            mapped[item.id] = item;
          });
          setTranslatedCards(mapped);
        }
      } catch (err) {
        console.error('Failed to translate UI dynamically:', err);
      } finally {
        setIsTranslatingUI(false);
      }
    }

    translateAllUI();
  }, [selectedLanguage, currentLangData, isEnglish]);

  const downloadTextFile = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = async (mod, displayTitle, baseContent) => {
    setLoadingId(mod.id);
    const cleanFileName = `${displayTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}_${selectedLanguage}.txt`;

    try {
      let finalContent = baseContent;

      if (!isEnglish && ai) {
        let prompt = `Translate this mental health guide into ${selectedLanguage}. Keep key formatting intact.`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${prompt}\n\n${baseContent}`
        });

        if (response.text) finalContent = response.text;
      }

      if (onDownload) {
        onDownload({
          ...mod,
          title: displayTitle,
          content: finalContent,
          fileName: cleanFileName
        });
      } else {
        downloadTextFile(cleanFileName, finalContent);
      }
    } catch (err) {
      console.error('Translation error during download:', err);
      if (onDownload) {
        onDownload({ ...mod, title: displayTitle, content: baseContent });
      } else {
        downloadTextFile(`${displayTitle}.txt`, baseContent);
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="screen p-4 max-w-2xl mx-auto">
      <h2 className="screen-title text-2xl font-bold mb-1 text-gray-900">
        {currentLangData?.selfHelpTitle || 'Self-Help Resources'}
      </h2>
      <p className="screen-subtitle text-gray-600 mb-6">
        {currentLangData?.selfHelpSub || 'Offline-accessible guides for stress and mental well-being.'}
      </p>

      <div className="module-list space-y-4">
        {SELF_HELP_MODULES.map((mod) => {
          // DIRECT LOOKUP FIX: Force reading from currentLangData first
          const langModule = currentLangData?.modules?.[mod.id];
          const dynamicModule = translatedCards[mod.id];

          const displayTitle = langModule?.title || dynamicModule?.title || mod.title;
          const displayDesc = langModule?.desc || dynamicModule?.desc || mod.desc;
          const baseContent = langModule?.content || mod.content;

          return (
            <article key={mod.id} className="module-card border rounded-xl p-4 flex items-center justify-between shadow-sm bg-white">
              <div className="mod-info pr-4">
                <h3 className="mod-title font-semibold text-lg text-gray-900">
                  {isTranslatingUI ? '...' : displayTitle}
                </h3>
                <p className="mod-desc text-sm text-gray-600 mt-1">
                  {isTranslatingUI ? '...' : displayDesc}
                </p>
                <div className="mod-meta text-xs text-gray-400 mt-2">
                  <span>{mod.type}</span> • <span>{mod.size}</span>
                </div>
              </div>

              <button
                type="button"
                className="download-btn bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
                disabled={loadingId === mod.id}
                onClick={() => handleDownloadClick(mod, displayTitle, baseContent)}
              >
                {loadingId === mod.id ? 'Translating...' : (currentLangData?.downloadBtn || 'Download TXT')}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}