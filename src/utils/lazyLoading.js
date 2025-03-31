import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from './errorHandling';

/**
 * Options par défaut pour le chargement paresseux (lazy loading)
 */
const defaultOptions = {
  fallback: <div className="flex items-center justify-center py-10">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  </div>,
  minDelay: 300, // Délai minimum pour éviter les flashs de chargement
  retry: true, // Permettre de réessayer le chargement en cas d'erreur
};

/**
 * Crée un composant avec chargement paresseux et gestion d'erreur
 * @param {Function} importFunction - Fonction d'import dynamique
 * @param {Object} options - Options de configuration
 * @returns {React.Component} Composant avec chargement paresseux
 */
export const lazyLoad = (importFunction, options = {}) => {
  const {
    fallback,
    minDelay,
    retry,
    onError,
  } = { ...defaultOptions, ...options };

  // Composant avec chargement paresseux
  const LazyComponent = lazy(() => {
    // Ajouter un délai minimum pour éviter les flashs
    const startTime = Date.now();
    
    return Promise.all([
      importFunction(),
      // Promesse qui se résout après le délai minimum
      new Promise(resolve => {
        const timeElapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, minDelay - timeElapsed);
        setTimeout(resolve, remainingDelay);
      })
    ])
    .then(([moduleExports]) => moduleExports)
    .catch(error => {
      if (onError) onError(error);
      // Propager l'erreur pour qu'elle soit capturée par le ErrorBoundary
      throw error;
    });
  });

  // Composant d'erreur personnalisé
  const ErrorFallback = ({ error, resetError }) => (
    <div className="p-6 text-center bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
        Erreur de chargement du composant
      </h3>
      <p className="text-red-700 dark:text-red-200 mb-4">
        Un problème est survenu lors du chargement de cette partie de l'application.
      </p>
      {retry && (
        <button
          onClick={resetError}
          className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );

  // Composant wrapper avec gestion d'erreur
  return (props) => (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Exportation de composants communs avec chargement paresseux
export const LazyIncidentDetailScreen = lazyLoad(() => 
  import('../components/IncidentDetailScreen')
);

export const LazyIncidentEditScreen = lazyLoad(() =>
  import('../components/IncidentEditScreen')
);

export const LazyTaskCreateScreen = lazyLoad(() =>
  import('../components/TaskCreateScreen')
);

export const LazyEvidenceCreateScreen = lazyLoad(() =>
  import('../components/EvidenceCreateScreen')
);

export const LazyTimelineCreateScreen = lazyLoad(() =>
  import('../components/TimelineCreateScreen')
);

// Précharger un composant pour les sections fréquemment visitées
export const preloadComponent = (importFunction) => {
  importFunction();
};

// Fonction utilitaire pour précharger un groupe de composants
export const preloadComponents = (components) => {
  components.forEach(component => component.preload && component.preload());
};
