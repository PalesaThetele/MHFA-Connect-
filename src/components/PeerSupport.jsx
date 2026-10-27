import React from 'react';
import { PEER_COUNSELLORS } from '../constants';

export default function PeerSupport({ currentLangData, onSelectPeer, setScreen }) {
  const handleStartChat = (peer) => {
    onSelectPeer(peer);
    if (setScreen) setScreen('chat'); // Switch screen to chat
  };

  return (
    <main className="screen">
      <h2 className="screen-title">{currentLangData.peerTitle}</h2>
      <p className="screen-subtitle">{currentLangData.peerSub}</p>
      <div className="module-list">
        {PEER_COUNSELLORS.map((p) => {
          const langPeer = currentLangData.peers?.[p.id];
          const displaySpecialty = langPeer?.specialty || p.specialty;

          return (
            <article key={p.id} className="module-card">
              <div className="mod-info">
                <h3 className="mod-title">{p.alias}</h3>
                <p className="mod-desc">{displaySpecialty}</p>
                <div className="mod-meta">
                  <span>{p.status}</span> • <span>{p.rating}</span>
                </div>
              </div>
              <button
                type="button"
                className="download-btn"
                disabled={p.status.includes('Busy')}
                onClick={() => handleStartChat(p)}
              >
                {p.status.includes('Busy') ? 'Busy' : currentLangData.startPeerChat}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}