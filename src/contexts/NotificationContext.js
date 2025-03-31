import React, { createContext, useContext, useState } from 'react';

// Types de notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Ajouter une nouvelle notification
  const addNotification = (message, type = NOTIFICATION_TYPES.INFO, timeout = 5000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    const newNotification = {
      id,
      message,
      type,
      timestamp: Date.now(),
    };

    setNotifications(prev => [...prev, newNotification]);

    // Supprimer la notification après le délai spécifié
    if (timeout) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }

    return id;
  };

  // Supprimer une notification par son ID
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Raccourcis pour chaque type de notification
  const success = (message, timeout) => addNotification(message, NOTIFICATION_TYPES.SUCCESS, timeout);
  const error = (message, timeout) => addNotification(message, NOTIFICATION_TYPES.ERROR, timeout);
  const warning = (message, timeout) => addNotification(message, NOTIFICATION_TYPES.WARNING, timeout);
  const info = (message, timeout) => addNotification(message, NOTIFICATION_TYPES.INFO, timeout);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personnalisé pour utiliser les notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
};
