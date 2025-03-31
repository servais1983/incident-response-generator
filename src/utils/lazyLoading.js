import React, { lazy, Suspense } from 'react';

/**
 * Options pour le chargement paresseux (lazy loading)
 */
const defaultOptions = {
  fallback: <div className="flex items-center justify-center py-10">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  </div>,
  errorComponent: ({ error, retry }) => (
    <div className="p-6 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
      <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur de chargement</h3>
      <p className="text-red-700 dark:text-red-200 mb-4">{error?.message || 'Une erreur est survenue lors du chargement du composant.'}</p>
      {retry && <button
        onClick={retry}
        className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
      >
        Réessayer
      </button>}
    </div>
  ),
  onError: (error) => console.error('Lazy loading error:', error),
  minDelay: 300, // Délai minimum pour éviter les flashs de chargement
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
    errorComponent: ErrorComponent,
    onError,
    minDelay
  } = { ...defaultOptions, ...options };

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

  // Composant wrapper avec gestion d'erreur
  const WithErrorHandling = (props) => {
    const [error, setError] = React.useState(null);

    // Fonction pour réessayer de charger le composant
    const retryLoading = () => {
      setError(null);
    };

    // Si une erreur s'est produite, afficher le composant d'erreur
    if (error) {
      return <ErrorComponent error={error} retry={retryLoading} />;
    }

    return (
      <Suspense fallback={fallback}>
        <ErrorBoundary onError={setError}>
          <LazyComponent {...props} />
        </ErrorBoundary>
      </Suspense>
    );
  };

  return WithErrorHandling;
};

/**
 * Composant ErrorBoundary pour capturer les erreurs de rendu
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error);
    }
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Si l'erreur a déjà été passée au composant parent via onError,
      // nous n'avons pas besoin d'afficher quoi que ce soit ici
      return null;
    }

    return this.props.children;
  }
}

// Précharger un composant (utile pour les composants fréquemment utilisés)
export const preloadComponent = (importFunction) => {
  importFunction();
};

// Exportation de composants communs avec chargement paresseux
export const LazyIncidentDetailScreen = lazyLoad(() => 
  import('../components/IncidentDetailScreen')
);

export const LazyIncidentEditScreen = lazyLoad(() =>
  import('../components/IncidentEditScreen')
);

export const LazyEvidenceCreateScreen = lazyLoad(() =>
  import('../components/EvidenceCreateScreen')
);

export const LazyTaskCreateScreen = lazyLoad(() =>
  import('../components/TaskCreateScreen')
);

export const LazyTimelineCreateScreen = lazyLoad(() =>
  import('../components/TimelineCreateScreen')
);
