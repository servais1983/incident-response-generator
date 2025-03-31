import React, { useState } from 'react';

const KeyboardShortcutsHelp = ({ shortcuts }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Formatage des raccourcis pour l'affichage
  const formatShortcut = (shortcut) => {
    return shortcut
      .split('+')
      .map(key => {
        // Mise en forme des touches spéciales
        switch (key.toLowerCase()) {
          case 'ctrl':
            return 'Ctrl';
          case 'alt':
            return 'Alt';
          case 'shift':
            return 'Maj';
          case 'meta':
            return navigator.platform.includes('Mac') ? '⌘' : 'Win';
          case 'escape':
            return 'Esc';
          case 'arrowup':
            return '↑';
          case 'arrowdown':
            return '↓';
          case 'arrowleft':
            return '←';
          case 'arrowright':
            return '→';
          default:
            // Mettre en majuscule la première lettre
            return key.length === 1 ? key.toUpperCase() : key;
        }
      })
      .map(key => (
        <span key={key} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">
          {key}
        </span>
      ));
  };

  // Grouper les raccourcis par catégorie
  const groupedShortcuts = shortcuts.reduce((groups, { key, description, category = 'Général' }) => {
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push({ key, description });
    return groups;
  }, {});

  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton pour ouvrir/fermer l'aide */}
      <button
        onClick={toggleHelp}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
        aria-label="Aide raccourcis clavier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      </button>

      {/* Modal d'aide */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
              aria-hidden="true"
              onClick={toggleHelp}
            ></div>

            {/* Modal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 z-10 transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white" id="modal-title">
                  Raccourcis clavier
                </h2>
                <button 
                  onClick={toggleHelp}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{category}</h3>
                    <ul className="space-y-2">
                      {shortcuts.map(({ key, description }) => (
                        <li key={key} className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{description}</span>
                          <div className="flex items-center space-x-1">
                            {formatShortcut(key)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcutsHelp;
