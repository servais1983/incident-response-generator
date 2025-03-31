import React from 'react';
import IncidentResponseGenerator from './components/IncidentResponseGenerator';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/ui/NotificationContainer';
import KeyboardShortcutsHelp from './components/ui/KeyboardShortcutsHelp';

// Liste des raccourcis clavier disponibles
const keyboardShortcuts = [
  { key: 'ctrl+n', description: 'Nouveau rapport', category: 'Général' },
  { key: 'ctrl+s', description: 'Sauvegarder', category: 'Général' },
  { key: 'ctrl+p', description: 'Imprimer rapport', category: 'Général' },
  { key: 'ctrl+h', description: 'Afficher/masquer l\'aide', category: 'Général' },
  { key: 'ctrl+d', description: 'Changer de thème', category: 'Apparence' },
  { key: 'escape', description: 'Fermer les fenêtres modales', category: 'Navigation' },
  { key: 'ctrl+1', description: 'Aller à Informations Générales', category: 'Navigation' },
  { key: 'ctrl+2', description: 'Aller à Détails de l\'Incident', category: 'Navigation' },
  { key: 'ctrl+3', description: 'Aller à Actions de Réponse', category: 'Navigation' },
  { key: 'ctrl+4', description: 'Aller à Retour d\'Expérience', category: 'Navigation' },
];

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary transition-theme duration-200">
          <IncidentResponseGenerator />
          <NotificationContainer />
          <KeyboardShortcutsHelp shortcuts={keyboardShortcuts} />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
