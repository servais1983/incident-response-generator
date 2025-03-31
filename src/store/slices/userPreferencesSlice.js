import { createSlice } from '@reduxjs/toolkit';

// Constantes pour les thèmes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Fonction pour obtenir le thème initial
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme && Object.values(THEME_MODES).includes(savedTheme)) {
    return savedTheme;
  }
  
  return THEME_MODES.SYSTEM;
};

// Fonction pour déterminer si le mode sombre est actif
export const isDarkTheme = (themeMode) => {
  if (themeMode === THEME_MODES.DARK) {
    return true;
  }
  
  if (themeMode === THEME_MODES.SYSTEM) {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  return false;
};

// État initial
const initialState = {
  theme: getInitialTheme(),
  isDarkMode: isDarkTheme(getInitialTheme()),
  language: 'fr', // 'fr', 'en', etc.
  layout: {
    dashboardView: 'grid', // 'grid', 'list', 'kanban'
    itemsPerPage: 10, // Nombre d'éléments par page
    cardDensity: 'normal', // 'compact', 'normal', 'expanded'
    showFilters: true, // Afficher/masquer les filtres
    sidebar: {
      isExpanded: true,
      width: 250, // px
    },
  },
  defaultValues: {
    incidentType: null, // Type d'incident par défaut
    severity: null, // Sévérité par défaut
    includeTimelineTemplate: true, // Inclure un modèle de chronologie
    autoSaveDraft: true, // Sauvegarde automatique des brouillons
  },
  notifications: {
    showNotifications: true,
    notificationDuration: 5000, // ms
    notifyOnIncidentCreation: true,
    notifyOnStatusChange: true,
    notifyOnComments: true,
  },
  shortcuts: {
    enabled: true,
    shortcutsMap: {
      'new-incident': 'ctrl+n',
      'save': 'ctrl+s',
      'delete': 'ctrl+d',
      'search': 'ctrl+f',
      'close-modal': 'escape',
      'toggle-theme': 'ctrl+shift+t',
    },
  },
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    // Gestion du thème
    setTheme: (state, action) => {
      const theme = action.payload;
      if (Object.values(THEME_MODES).includes(theme)) {
        state.theme = theme;
        state.isDarkMode = isDarkTheme(theme);
        localStorage.setItem('theme', theme);
        
        // Mise à jour de la classe sur l'élément racine HTML
        const root = document.documentElement;
        if (state.isDarkMode) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    },
    toggleDarkMode: (state) => {
      const newTheme = state.theme === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK;
      state.theme = newTheme;
      state.isDarkMode = isDarkTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Mise à jour de la classe sur l'élément racine HTML
      const root = document.documentElement;
      if (state.isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    
    // Gestion de la langue
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    
    // Gestion de la mise en page
    setDashboardView: (state, action) => {
      state.layout.dashboardView = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.layout.itemsPerPage = action.payload;
    },
    setCardDensity: (state, action) => {
      state.layout.cardDensity = action.payload;
    },
    toggleFilters: (state) => {
      state.layout.showFilters = !state.layout.showFilters;
    },
    toggleSidebar: (state) => {
      state.layout.sidebar.isExpanded = !state.layout.sidebar.isExpanded;
    },
    setSidebarWidth: (state, action) => {
      state.layout.sidebar.width = action.payload;
    },
    
    // Gestion des valeurs par défaut
    setDefaultIncidentType: (state, action) => {
      state.defaultValues.incidentType = action.payload;
    },
    setDefaultSeverity: (state, action) => {
      state.defaultValues.severity = action.payload;
    },
    toggleTimelineTemplate: (state) => {
      state.defaultValues.includeTimelineTemplate = !state.defaultValues.includeTimelineTemplate;
    },
    toggleAutoSaveDraft: (state) => {
      state.defaultValues.autoSaveDraft = !state.defaultValues.autoSaveDraft;
    },
    
    // Gestion des notifications
    toggleNotifications: (state) => {
      state.notifications.showNotifications = !state.notifications.showNotifications;
    },
    setNotificationDuration: (state, action) => {
      state.notifications.notificationDuration = action.payload;
    },
    toggleNotifyOnIncidentCreation: (state) => {
      state.notifications.notifyOnIncidentCreation = !state.notifications.notifyOnIncidentCreation;
    },
    toggleNotifyOnStatusChange: (state) => {
      state.notifications.notifyOnStatusChange = !state.notifications.notifyOnStatusChange;
    },
    toggleNotifyOnComments: (state) => {
      state.notifications.notifyOnComments = !state.notifications.notifyOnComments;
    },
    
    // Gestion des raccourcis clavier
    toggleShortcuts: (state) => {
      state.shortcuts.enabled = !state.shortcuts.enabled;
    },
    updateShortcut: (state, action) => {
      const { action: shortcutAction, shortcut } = action.payload;
      if (state.shortcuts.shortcutsMap[shortcutAction]) {
        state.shortcuts.shortcutsMap[shortcutAction] = shortcut;
      }
    },
    resetShortcuts: (state) => {
      state.shortcuts.shortcutsMap = initialState.shortcuts.shortcutsMap;
    },
    
    // Réinitialisation de toutes les préférences
    resetAllPreferences: () => {
      // Supprimer les préférences stockées
      localStorage.removeItem('theme');
      localStorage.removeItem('language');
      
      // Retourner l'état initial
      return initialState;
    },
  },
});

// Export des actions
export const {
  setTheme,
  toggleDarkMode,
  setLanguage,
  setDashboardView,
  setItemsPerPage,
  setCardDensity,
  toggleFilters,
  toggleSidebar,
  setSidebarWidth,
  setDefaultIncidentType,
  setDefaultSeverity,
  toggleTimelineTemplate,
  toggleAutoSaveDraft,
  toggleNotifications,
  setNotificationDuration,
  toggleNotifyOnIncidentCreation,
  toggleNotifyOnStatusChange,
  toggleNotifyOnComments,
  toggleShortcuts,
  updateShortcut,
  resetShortcuts,
  resetAllPreferences,
} = userPreferencesSlice.actions;

// Export du reducer
export default userPreferencesSlice.reducer;

// Selectors
export const selectTheme = (state) => state.userPreferences.theme;
export const selectIsDarkMode = (state) => state.userPreferences.isDarkMode;
export const selectLanguage = (state) => state.userPreferences.language;
export const selectLayout = (state) => state.userPreferences.layout;
export const selectDefaultValues = (state) => state.userPreferences.defaultValues;
export const selectNotificationPreferences = (state) => state.userPreferences.notifications;
export const selectShortcutsPreferences = (state) => state.userPreferences.shortcuts;
