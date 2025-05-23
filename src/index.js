import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { setupGlobalErrorHandling } from './utils/errorHandling';
import './index.css';

// Configuration du gestionnaire d'erreurs global
setupGlobalErrorHandling();

// Détection des fonctionnalités du navigateur
const checkBrowserFeatures = () => {
  const features = {
    localStorage: !!window.localStorage,
    serviceWorker: 'serviceWorker' in navigator,
    webpSupport: false,
  };

  // Vérifier le support des images webp
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    features.webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  return features;
};

// Ajouter la classe de détection de fonctionnalités au body
document.body.className += Object.entries(checkBrowserFeatures())
  .map(([feature, supported]) => (supported ? `has-${feature}` : `no-${feature}`))
  .join(' ');

// Détection du mode de couleur préféré
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Chargement de l'application avec les optimisations de performance
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Pré-connecter aux origines externes (si applicable)
const preconnectLink = document.createElement('link');
preconnectLink.rel = 'preconnect';
preconnectLink.href = process.env.REACT_APP_API_URL || '/api';
document.head.appendChild(preconnectLink);

// Rendu avec gestion des erreurs
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Enregistrement du Service Worker (si disponible)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}
