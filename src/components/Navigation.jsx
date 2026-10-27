import React from 'react';

export default function Navigation({ activeTab, setActiveTab, labels = {} }) {
  const navItems = [
    { id: 'home', icon: '🏠', label: labels.home || labels.h1 || 'Home' },
    { id: 'chat', icon: '💬', label: labels.chat || labels.qa1 || 'Chat' },
    { id: 'peers', icon: '👥', label: labels.peers || labels.qa4 || 'Peers' },
    { id: 'resources', icon: '📚', label: labels.resources || labels.qa2 || 'Help' },
    { id: 'directory', icon: '🗺️', label: labels.directory || labels.qa3 || 'Directory' },
    { id: 'settings', icon: '⚙️', label: labels.settings || labels.settingsTitle || 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 py-1.5 px-2">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold scale-105 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 font-medium'
              }`}
              style={{ minWidth: '56px' }}
            >
              <span className="text-xl leading-none mb-1" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}