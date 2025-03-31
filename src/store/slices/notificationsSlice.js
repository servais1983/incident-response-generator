import { createSlice } from '@reduxjs/toolkit';

// Types de notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// État initial
const initialState = {
  notifications: [], // Liste des notifications actives
  history: [], // Historique des notifications récentes (pour la section notifications)
  unreadCount: 0, // Nombre de notifications non lues
};

// Helper pour générer un ID unique
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Fonction d'aide pour obtenir un titre par défaut en fonction du type
const getTitleFromType = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return 'Succès';
    case NOTIFICATION_TYPES.ERROR:
      return 'Erreur';
    case NOTIFICATION_TYPES.WARNING:
      return 'Avertissement';
    case NOTIFICATION_TYPES.INFO:
    default:
      return 'Information';
  }
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Ajouter une notification
    addNotification: (state, action) => {
      const { message, type = NOTIFICATION_TYPES.INFO, timeout = 5000, persist = false, title } = action.payload;
      
      const notification = {
        id: generateId(),
        message,
        type,
        title: title || getTitleFromType(type),
        timestamp: Date.now(),
        read: false,
        persist, // Si true, la notification ne sera pas supprimée automatiquement
      };
      
      // Ajouter à la liste active et à l'historique
      state.notifications.push(notification);
      state.history.unshift({ ...notification, active: true });
      
      // Limiter l'historique à 50 éléments
      if (state.history.length > 50) {
        state.history.pop();
      }
      
      // Incrémenter le compteur de non lus
      state.unreadCount += 1;
      
      // Stocker l'ID pour les notifications temporaires
      if (!persist) {
        notification.timeoutId = `timeout-${notification.id}`;
      }
    },
    
    // Supprimer une notification
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      
      // Mettre à jour l'état "active" dans l'historique
      const historyIndex = state.history.findIndex(n => n.id === notificationId);
      if (historyIndex !== -1 && state.history[historyIndex].active) {
        state.history[historyIndex].active = false;
      }
      
      // Supprimer de la liste active
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },
    
    // Marquer une notification comme lue
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      
      // Mettre à jour dans les notifications actives
      const activeIndex = state.notifications.findIndex(n => n.id === notificationId);
      if (activeIndex !== -1 && !state.notifications[activeIndex].read) {
        state.notifications[activeIndex].read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      
      // Mettre à jour dans l'historique
      const historyIndex = state.history.findIndex(n => n.id === notificationId);
      if (historyIndex !== -1 && !state.history[historyIndex].read) {
        state.history[historyIndex].read = true;
      }
    },
    
    // Marquer toutes les notifications comme lues
    markAllAsRead: (state) => {
      // Mettre à jour toutes les notifications actives
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      
      // Mettre à jour toutes les notifications dans l'historique
      state.history.forEach(notification => {
        notification.read = true;
      });
      
      // Réinitialiser le compteur
      state.unreadCount = 0;
    },
    
    // Supprimer toutes les notifications
    clearAllNotifications: (state) => {
      state.notifications = [];
      
      // Marquer toutes les notifications de l'historique comme inactives
      state.history.forEach(notification => {
        notification.active = false;
      });
    },
    
    // Effacer l'historique des notifications
    clearHistory: (state) => {
      state.history = state.notifications.map(n => ({ ...n, active: true }));
    },
  },
});

// Fonctions de création d'actions pour les types de notification courants
export const showSuccessNotification = (message, options = {}) => {
  return addNotification({
    message,
    type: NOTIFICATION_TYPES.SUCCESS,
    ...options,
  });
};

export const showErrorNotification = (message, options = {}) => {
  return addNotification({
    message,
    type: NOTIFICATION_TYPES.ERROR,
    ...options,
  });
};

export const showWarningNotification = (message, options = {}) => {
  return addNotification({
    message,
    type: NOTIFICATION_TYPES.WARNING,
    ...options,
  });
};

export const showInfoNotification = (message, options = {}) => {
  return addNotification({
    message,
    type: NOTIFICATION_TYPES.INFO,
    ...options,
  });
};

// Export des actions
export const {
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  clearHistory,
} = notificationsSlice.actions;

// Export du reducer
export default notificationsSlice.reducer;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationHistory = (state) => state.notifications.history;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
