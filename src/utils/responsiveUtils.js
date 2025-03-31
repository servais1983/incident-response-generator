/**
 * Utilitaires pour le design responsive
 */

// Taille des écrans (en px) - correspond aux breakpoints de Tailwind CSS
export const screenSizes = {
  sm: 640,  // Small (téléphones en mode paysage)
  md: 768,  // Medium (tablettes)
  lg: 1024, // Large (petits laptops)
  xl: 1280, // Extra Large (laptops et desktops)
  '2xl': 1536, // 2X Large (grands écrans)
};

/**
 * Détecte la taille d'écran actuelle
 * @returns {Object} Objet contenant des booléens pour chaque breakpoint
 */
export const useScreenSize = () => {
  if (typeof window === 'undefined') {
    // Valeur par défaut pour le SSR
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
    };
  }

  const width = window.innerWidth;
  
  return {
    isMobile: width < screenSizes.md,          // < 768px
    isTablet: width >= screenSizes.md && width < screenSizes.lg, // 768px - 1023px
    isDesktop: width >= screenSizes.lg && width < screenSizes.xl, // 1024px - 1279px
    isLargeDesktop: width >= screenSizes.xl,    // >= 1280px
  };
};

/**
 * Détecte l'orientation de l'écran
 * @returns {string} 'portrait' ou 'landscape'
 */
export const getOrientation = () => {
  if (typeof window === 'undefined') {
    return 'landscape'; // Valeur par défaut pour le SSR
  }
  
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Génère des classes CSS adaptatives basées sur les breakpoints courants
 * @param {Object} classesConfig - Configuration des classes par breakpoint
 * @returns {string} Chaîne de classes CSS
 * 
 * Exemple d'utilisation:
 * const classes = getResponsiveClasses({
 *   base: 'p-2 text-sm',
 *   sm: 'p-3 text-base',
 *   md: 'p-4',
 *   lg: 'p-6 text-lg',
 * });
 */
export const getResponsiveClasses = (classesConfig) => {
  const { base, sm, md, lg, xl } = classesConfig;
  
  let classes = base || '';
  
  if (sm) classes += ` sm:${sm}`;
  if (md) classes += ` md:${md}`;
  if (lg) classes += ` lg:${lg}`;
  if (xl) classes += ` xl:${xl}`;
  
  return classes;
};
