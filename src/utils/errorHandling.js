/**
 * Utilitaires pour la gestion des erreurs
 */

// Types d'erreurs pour catégorisation
export const ERROR_TYPES = {
  NETWORK: 'network',
  API: 'api',
  VALIDATION: 'validation',
  AUTH: 'auth',
  NOT_FOUND: 'not_found',
  TIMEOUT: 'timeout',
  UNEXPECTED: 'unexpected'
};

/**
 * Enrichit une erreur avec des métadonnées
 * @param {Error} error - L'erreur d'origine
 * @param {string} type - Type d'erreur (voir ERROR_TYPES)
 * @param {Object} metadata - Métadonnées supplémentaires
 * @returns {Error} L'erreur enrichie
 */
export const enhanceError = (error, type = ERROR_TYPES.UNEXPECTED, metadata = {}) => {
  error.type = type;
  error.metadata = metadata;
  error.timestamp = Date.now();
  error.id = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  return error;
};

/**
 * Crée une nouvelle erreur typée
 * @param {string} message - Message d'erreur
 * @param {string} type - Type d'erreur
 * @param {Object} metadata - Métadonnées supplémentaires
 * @returns {Error} Une erreur typée
 */
export const createError = (message, type = ERROR_TYPES.UNEXPECTED, metadata = {}) => {
  return enhanceError(new Error(message), type, metadata);
};

// Erreurs spécifiques courantes
export const createNetworkError = (message = 'Erreur de connexion réseau', metadata) => {
  return createError(message, ERROR_TYPES.NETWORK, metadata);
};

export const createApiError = (message, statusCode, response, metadata = {}) => {
  return createError(
    message || `Erreur API: ${statusCode}`,
    ERROR_TYPES.API,
    { ...metadata, statusCode, response }
  );
};

export const createTimeoutError = (message = 'La requête a expiré', metadata) => {
  return createError(message, ERROR_TYPES.TIMEOUT, metadata);
};

export const createAuthError = (message = 'Erreur d\'authentification', metadata) => {
  return createError(message, ERROR_TYPES.AUTH, metadata);
};

export const createValidationError = (message = 'Données invalides', fields = {}, metadata = {}) => {
  return createError(message, ERROR_TYPES.VALIDATION, { ...metadata, fields });
};

/**
 * Journalise une erreur avec un niveau de détail approprié
 * @param {Error} error - L'erreur à journaliser
 * @param {string} context - Contexte dans lequel l'erreur s'est produite
 */
export const logError = (error, context = '') => {
  const errorType = error.type || ERROR_TYPES.UNEXPECTED;
  const errorInfo = {
    message: error.message,
    type: errorType,
    context,
    timestamp: error.timestamp || Date.now(),
    metadata: error.metadata || {},
    stack: error.stack
  };
  
  // Journaliser l'erreur selon sa gravité
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
    case ERROR_TYPES.TIMEOUT:
      console.warn(`[${errorType}] ${context}: ${error.message}`, errorInfo);
      break;
    case ERROR_TYPES.VALIDATION:
      console.warn(`[Validation] ${context}: ${error.message}`, errorInfo);
      break;
    case ERROR_TYPES.AUTH:
    case ERROR_TYPES.API:
    case ERROR_TYPES.NOT_FOUND:
    case ERROR_TYPES.UNEXPECTED:
    default:
      console.error(`[${errorType}] ${context}: ${error.message}`, errorInfo);
  }
  
  // Ici, on pourrait ajouter l'envoi de l'erreur à un service externe
  // de journalisation (comme Sentry)
  // if (process.env.NODE_ENV === 'production') {
  //   captureException(error, { extra: errorInfo });
  // }
};

/**
 * Transforme une erreur en message utilisateur
 * @param {Error} error - L'erreur à transformer
 * @returns {string} Message utilisateur
 */
export const getUserFriendlyErrorMessage = (error) => {
  if (!error) return 'Une erreur inconnue est survenue';
  
  // Personnaliser le message selon le type d'erreur
  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      return 'Problème de connexion au serveur. Veuillez vérifier votre connexion internet.';
    case ERROR_TYPES.TIMEOUT:
      return 'La requête a pris trop de temps. Veuillez réessayer.';
    case ERROR_TYPES.AUTH:
      return 'Vous devez vous connecter pour accéder à cette fonctionnalité.';
    case ERROR_TYPES.API:
      // Personnaliser selon le code HTTP si disponible
      if (error.metadata?.statusCode === 404) {
        return 'La ressource demandée n\'existe pas.';
      }
      if (error.metadata?.statusCode === 403) {
        return 'Vous n\'avez pas les permissions nécessaires pour cette action.';
      }
      return 'Une erreur est survenue lors de la communication avec le serveur.';
    case ERROR_TYPES.VALIDATION:
      // On peut personnaliser selon les champs en erreur
      if (error.metadata?.fields && Object.keys(error.metadata.fields).length > 0) {
        return 'Certaines informations sont incorrectes ou manquantes. Veuillez vérifier votre saisie.';
      }
      return 'Les données saisies sont invalides. Veuillez vérifier votre saisie.';
    case ERROR_TYPES.NOT_FOUND:
      return 'L\'élément recherché n\'existe pas ou a été supprimé.';
    default:
      return error.message || 'Une erreur inattendue est survenue. Veuillez réessayer ou contacter le support.';
  }
};

/**
 * Composant d'erreur pour le rendu côté utilisateur
 * @param {Object} props - Propriétés du composant
 * @returns {React.Component} Composant d'affichage d'erreur
 */
export const ErrorDisplay = ({ error, onRetry, onDismiss }) => {
  const message = getUserFriendlyErrorMessage(error);
  const canRetry = [ERROR_TYPES.NETWORK, ERROR_TYPES.TIMEOUT, ERROR_TYPES.API].includes(error?.type);
  
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Erreur</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-200">
            <p>{message}</p>
          </div>
          {(onRetry || onDismiss) && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                {canRetry && onRetry && (
                  <button
                    onClick={onRetry}
                    className="mx-2 my-1.5 rounded-md bg-red-50 dark:bg-red-800/30 px-3 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Réessayer
                  </button>
                )}
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className="mx-2 my-1.5 rounded-md bg-red-50 dark:bg-red-800/30 px-3 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Fermer
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Gestionnaire global d'erreurs non capturées
 */
export const setupGlobalErrorHandling = () => {
  // Gestionnaire pour les erreurs React non capturées
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), 'Uncaught Error');
    // On peut afficher une notification globale ici
  });

  // Gestionnaire pour les rejets de promesses non traités
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    logError(error, 'Unhandled Promise Rejection');
  });
};
