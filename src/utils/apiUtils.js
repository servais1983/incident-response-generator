import { cachedFetch, globalCache } from './cacheUtils';
import { createApiError, createNetworkError, createTimeoutError } from './errorHandling';

/**
 * Configuration de base pour les requêtes API
 */
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '/api',
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 secondes
};

/**
 * Classe pour gérer les requêtes API avec des fonctionnalités avancées
 */
class ApiService {
  constructor(config = {}) {
    this.config = { ...API_CONFIG, ...config };
    this.pendingRequests = new Map();
    this.abortControllers = new Map();
  }

  /**
   * Génère une clé unique pour une requête
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} params - Paramètres de la requête
   * @returns {string} - Clé unique
   */
  createRequestKey(endpoint, params = {}) {
    return `${endpoint}:${JSON.stringify(params)}`;
  }

  /**
   * Effectue une requête API avec gestion de cache et retries
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} options - Options de la requête
   * @returns {Promise<any>} - Résultats de la requête
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      params = {},
      data = null,
      headers = {},
      cache = true,
      cacheDuration,
      retries = 2,
      retryDelay = 1000,
      deduplicate = true,
      timeout = this.config.timeout,
      signal = null,
    } = options;

    const url = `${this.config.baseUrl}${endpoint}`;
    const requestKey = this.createRequestKey(endpoint, { method, params, data });

    // Gestion des requêtes en double (déduplication)
    if (deduplicate && method === 'GET' && this.pendingRequests.has(requestKey)) {
      console.log(`Request deduplicated: ${requestKey}`);
      return this.pendingRequests.get(requestKey);
    }

    // Créer un AbortController pour pouvoir annuler la requête
    const abortController = new AbortController();
    const abortSignal = signal || abortController.signal;

    // Enregistrer l'AbortController pour pouvoir annuler plus tard
    this.abortControllers.set(requestKey, abortController);

    // Configuration de fetch
    const fetchOptions = {
      method,
      headers: { ...this.config.defaultHeaders, ...headers },
      signal: abortSignal,
    };

    // Ajout du corps de la requête pour les méthodes non-GET
    if (method !== 'GET' && data) {
      fetchOptions.body = JSON.stringify(data);
    }

    // Définir un timeout
    const timeoutId = setTimeout(() => {
      abortController.abort('timeout');
    }, timeout);

    // Fonction qui effectue la requête
    const doFetch = async () => {
      // Construire l'URL avec les paramètres de requête
      const queryParams = new URLSearchParams(params).toString();
      const fullUrl = queryParams ? `${url}?${queryParams}` : url;

      let attempt = 0;
      let lastError;

      while (attempt <= retries) {
        try {
          const response = await fetch(fullUrl, fetchOptions);

          // Supprimer la requête pendante et l'AbortController
          if (deduplicate) {
            this.pendingRequests.delete(requestKey);
            this.abortControllers.delete(requestKey);
          }

          // Annuler le timeout
          clearTimeout(timeoutId);

          // Vérifier si la réponse est réussie
          if (!response.ok) {
            throw createApiError(
              `Erreur API: ${response.status} ${response.statusText}`,
              response.status,
              await response.json().catch(() => ({}))
            );
          }

          return await response.json();
        } catch (error) {
          lastError = error;
          
          // Si c'est la dernière tentative, propager l'erreur
          if (attempt === retries) {
            this.pendingRequests.delete(requestKey);
            this.abortControllers.delete(requestKey);
            clearTimeout(timeoutId);
            
            // Déterminer le type d'erreur
            if (error.name === 'AbortError') {
              if (error.message === 'timeout') {
                throw createTimeoutError(`La requête ${endpoint} a expiré`);
              }
              throw error; // Autres AbortError (annulation manuelle)
            }
            if (error.name === 'TypeError' && error.message.includes('Network')) {
              throw createNetworkError(`Erreur réseau pour ${endpoint}`);
            }
            throw error;
          }
          
          // Sinon, attendre et réessayer
          const delay = retryDelay * Math.pow(2, attempt);
          console.log(`Retry ${attempt + 1}/${retries} for ${requestKey} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          attempt++;
        }
      }

      throw lastError;
    };

    // Utiliser le cache pour les requêtes GET si demandé
    if (method === 'GET' && cache) {
      // Enregistrer la promesse pour la déduplication
      const fetchPromise = cachedFetch(
        doFetch,
        requestKey,
        { cacheDuration }
      );

      if (deduplicate) {
        this.pendingRequests.set(requestKey, fetchPromise);
      }

      return fetchPromise;
    } else {
      const fetchPromise = doFetch();
      
      if (deduplicate) {
        this.pendingRequests.set(requestKey, fetchPromise);
      }
      
      return fetchPromise;
    }
  }

  // Méthodes pratiques pour les différents types de requêtes
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', data, cache: false });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', data, cache: false });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', data, cache: false });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE', cache: false });
  }

  /**
   * Invalide une entrée spécifique du cache
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} params - Paramètres de la requête
   */
  invalidateCache(endpoint, params = {}) {
    const requestKey = this.createRequestKey(endpoint, { method: 'GET', params });
    globalCache.delete(requestKey);
  }

  /**
   * Précharge des données dans le cache
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} options - Options de la requête
   */
  preload(endpoint, options = {}) {
    return this.get(endpoint, { ...options, cache: true });
  }

  /**
   * Annule une requête spécifique
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} params - Paramètres de la requête
   */
  cancelRequest(endpoint, params = {}) {
    const requestKey = this.createRequestKey(endpoint, params);
    const controller = this.abortControllers.get(requestKey);
    
    if (controller) {
      controller.abort();
      this.abortControllers.delete(requestKey);
      this.pendingRequests.delete(requestKey);
      return true;
    }
    
    return false;
  }

  /**
   * Annule toutes les requêtes en cours
   */
  cancelAllRequests() {
    // Annuler toutes les requêtes en attente
    this.abortControllers.forEach(controller => {
      controller.abort();
    });
    
    this.abortControllers.clear();
    this.pendingRequests.clear();
  }
}

// Instance par défaut du service API
export const api = new ApiService();

export default ApiService;
