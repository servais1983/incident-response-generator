import { useEffect } from 'react';

/**
 * Hook pour gérer les raccourcis clavier
 * @param {Object} shortcuts - Objet avec les touches comme clés et les fonctions à exécuter comme valeurs
 * @param {Object} options - Options pour personnaliser le comportement des raccourcis
 */
const useKeyboardShortcuts = (shortcuts, options = {}) => {
  const {
    enabled = true,                // Activer/désactiver tous les raccourcis
    ignoreInputs = true,           // Ignorer les raccourcis dans les champs de formulaire
    ignoreModifierState = false,   // Ne pas vérifier l'état des touches modificatrices (Ctrl, Alt, etc.)
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Ignorer si on est dans un champ de formulaire et que ignoreInputs est activé
      if (ignoreInputs && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
        return;
      }

      // Convertir l'événement clavier en une chaîne de caractères représentant la combinaison de touches
      const keyPressed = event.key.toLowerCase();
      
      // Créer une clé pour représenter la combinaison de touches
      let shortcutKey = keyPressed;
      
      // Ajouter les modificateurs si ignoreModifierState est false
      if (!ignoreModifierState) {
        if (event.ctrlKey) shortcutKey = `ctrl+${shortcutKey}`;
        if (event.altKey) shortcutKey = `alt+${shortcutKey}`;
        if (event.shiftKey) shortcutKey = `shift+${shortcutKey}`;
        if (event.metaKey) shortcutKey = `meta+${shortcutKey}`; // Touche Windows/Command
      }

      // Vérifier si un raccourci correspond
      if (shortcuts[shortcutKey]) {
        event.preventDefault(); // Empêcher le comportement par défaut
        shortcuts[shortcutKey](event); // Exécuter la fonction associée
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('keydown', handleKeyDown);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled, ignoreInputs, ignoreModifierState]);
};

export default useKeyboardShortcuts;
