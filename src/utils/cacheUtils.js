import React, { useEffect } from 'react';

/**
 * Utilitaires pour la mise en cache des données et l'optimisation des requêtes
 */

// Configuration par défaut du cache
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes en millisecondes

// Structure de données pour le cache
class CacheStore {
  constructor() {
    this.cache = {};
    this.metaData = {};
  }

  /**
   * Ajoute ou met à jour une entrée dans le cache
   * @param {string} key - Clé unique pour l'entrée
   * @param {any} data - Données à mettre en cache
   * @param {number} expiresIn - Temps de validité en millisecondes
   */
  set(key, data, expiresIn = DEFAULT_CACHE_TIME) {
    const timestamp = Date.now();
    const expiry = timestamp + expiresIn;

    this.cache[key] = data;
    this.metaData[key] = {
      timestamp,
      expiry,
      expiresIn
    };

    return true;
  }

  /**
   * Récupère une entrée du cache si elle est valide
   * @param {string} key - Clé de l'entrée à récupérer
   * @returns {any|null} - Données ou null si invalide/inexistante
   */
  get(key) {
    const data = this.cache[key];
    const meta = this.metaData[key];

    // Vérifier si l'entrée existe et est encore valide
    if (!data || !meta) {
      return null;
    }

    if (Date.now() > meta.expiry) {
      // Entrée expirée, on la supprime
      this.delete(key);
      return null;
    }

    return data;
  }

  /**
   * Supprime une entrée du cache
   * @param {string} key - Clé de l'entrée à supprimer
   * @returns {boolean} - true si supprimée, false sinon
   */
  delete(key) {
    if (this.cache[key] !== undefined) {
      delete this.cache[key];
      delete this.metaData[key];
      return true;
    }
    return false;
  }

  /**
   * Vérifie si une entrée existe et est valide
   * @param {string} key - Clé à vérifier
   * @returns {boolean} - true si l'entrée existe et est valide
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Vide tout le cache
   */
  clear() {
    this.cache = {};
    this.metaData = {};
  }

  /**
   * Supprime toutes les entrées expirées
   * @returns {number} - Nombre d'entrées supprimées
   */
  purgeExpired() {
    const now = Date.now();
    const keys = Object.keys(this.metaData);
    let purgedCount = 0;

    keys.forEach(key => {
      if (this.metaData[key].expiry < now) {
        this.delete(key);
        purgedCount++;
      }
    });

    return purgedCount;
  }

  /**
   * Récupère les méta-données pour une entrée
   * @param {string} key - Clé de l'entrée
   * @returns {Object|null} - Méta-données ou null
   */
  getMeta(key) {
    return this.metaData[key] || null;
  }
  
  /**
   * Récupère les statistiques du cache
   * @returns {Object} - Statistiques du cache
   */
  getStats() {
    const totalEntries = Object.keys(this.cache).length;
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;
    
    Object.keys(this.metaData).forEach(key => {
      if (this.metaData[key].expiry > now) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    });
    
    return {
      totalEntries,
      validEntries,
      expiredEntries,
      cacheSize: JSON.stringify(this.cache).length,
    };
  }
}

// Instance unique du cache 
export const globalCache = new CacheStore();

/**
 * Fonction pour exécuter une requête avec mise en cache des résultats
 * @param {Function} fetchFunction - Fonction asynchrone qui effectue la requête
 * @param {string} cacheKey - Clé unique pour stocker le résultat dans le cache
 * @param {Object} options - Options de mise en cache
 * @returns {Promise<any>} - Résultat de la requête
 */
export const cachedFetch = async (fetchFunction, cacheKey, options = {}) => {
  const {
    cacheDuration = DEFAULT_CACHE_TIME,
    forceRefresh = false,
    onCacheHit = null,
    onCacheMiss = null,
  } = options;

  // Vérifier si les données sont dans le cache et toujours valides
  if (!forceRefresh) {
    const cachedData = globalCache.get(cacheKey);
    if (cachedData) {
      if (onCacheHit) onCacheHit(cachedData);
      return cachedData;
    }
  }

  if (onCacheMiss) onCacheMiss();

  try {
    // Exécuter la requête
    const freshData = await fetchFunction();
    
    // Mettre en cache les nouvelles données
    globalCache.set(cacheKey, freshData, cacheDuration);
    
    return freshData;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${cacheKey}:`, error);
    throw error; // Propager l'erreur
  }
};

/**
 * Hook pour gérer la purge automatique du cache
 * À utiliser dans un composant de niveau supérieur
 */
export const useCacheCleanup = () => {
  useEffect(() => {
    // Purger le cache des entrées expirées toutes les 5 minutes
    const cleanupInterval = setInterval(() => {
      const purgedCount = globalCache.purgeExpired();
      if (purgedCount > 0) {
        console.log(`Nettoyage du cache: ${purgedCount} entrées expirées supprimées`);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  // Nettoyage initial
  useEffect(() => {
    globalCache.purgeExpired();
  }, []);
};

/**
 * Hook pour précharger des données dans le cache
 * @param {Function} fetchFunction - Fonction de fetch à exécuter
 * @param {string} cacheKey - Clé pour stocker les données
 * @param {Object} options - Options supplémentaires
 */
export const usePreloadData = (fetchFunction, cacheKey, options = {}) => {
  const { enabled = true, dependencies = [] } = options;

  useEffect(() => {
    if (enabled && !globalCache.has(cacheKey)) {
      cachedFetch(fetchFunction, cacheKey, options)
        .catch(error => console.error(`Erreur lors du préchargement pour ${cacheKey}:`, error));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

// Exportation du cache par défaut
export default globalCache;
