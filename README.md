# Générateur de Rapport d'Incident de Sécurité

Une application React permettant de générer facilement des rapports détaillés d'incidents de sécurité informatique en français.

![Aperçu de l'application](https://via.placeholder.com/800x400?text=G%C3%A9n%C3%A9rateur+de+Rapport+d%27Incident)

## Fonctionnalités

- Interface conviviale pour saisir les informations d'incident
- Plusieurs catégories d'incidents prédéfinies (Malware, Phishing, DDoS, etc.)
- Niveaux de sévérité personnalisables
- Génération de rapports formatés
- Possibilité d'exporter les rapports au format texte
- Option de remplissage automatique pour voir un exemple

## Mode d'emploi

### Installation

Pour utiliser ce générateur de rapport d'incident, suivez ces étapes:

1. **Prérequis:**
   - Node.js (v16 ou supérieur)
   - npm (v8 ou supérieur)

2. **Installation:**
   ```bash
   # Cloner le dépôt
   git clone https://github.com/servais1983/incident-response-generator.git

   # Naviguer dans le répertoire
   cd incident-response-generator

   # Installer les dépendances
   npm install

   # Démarrer l'application
   npm start
   ```

3. **Accès à l'application:**
   - L'application sera accessible à l'adresse http://localhost:3000 dans votre navigateur

### Utilisation

#### Création d'un nouveau rapport

1. **Remplir le formulaire:**
   - Complétez les champs dans les sections "Informations Générales", "Détails de l'Incident" et "Actions de Réponse"
   - Les champs marqués d'un astérisque (*) sont obligatoires

2. **Utiliser l'exemple:**
   - Pour voir comment fonctionne l'application ou avoir un modèle, cliquez sur le bouton "Remplir avec exemple"

3. **Générer le rapport:**
   - Une fois tous les champs remplis, cliquez sur "Générer le Rapport"
   - Le rapport formaté s'affichera à l'écran

4. **Exporter le rapport:**
   - Pour sauvegarder le rapport, cliquez sur "Télécharger (.txt)"
   - Le rapport sera téléchargé au format texte avec un nom basé sur l'ID de l'incident

5. **Créer un nouveau rapport:**
   - Pour créer un autre rapport, cliquez sur "Nouveau Rapport"
   - Vous reviendrez au formulaire vierge

#### Description des sections

1. **Informations Générales:**
   - Titre de l'incident: nom court et descriptif de l'incident
   - ID: identifiant unique pour référencer l'incident (format suggéré: IR-ANNÉE-NUMÉRO)
   - Dates et heures: quand l'incident a été détecté et résolu
   - Méthode de détection: comment l'incident a été découvert
   - Systèmes affectés: quels systèmes ou applications ont été touchés
   - Type d'incident: catégorie principale (malware, phishing, etc.)
   - Sévérité: niveau d'impact (critique, élevé, moyen, faible)

2. **Détails de l'Incident:**
   - Vecteur initial: comment l'attaque a commencé
   - Actions de l'attaquant: ce que l'attaquant a fait dans le système
   - Impact: conséquences sur l'organisation (données, opérations, etc.)

3. **Actions de Réponse:**
   - Confinement: actions prises pour limiter la propagation
   - Éradication: comment la menace a été supprimée
   - Récupération: comment les systèmes ont été restaurés

4. **Retour d'Expérience:**
   - Leçons apprises: ce qui a bien fonctionné et ce qui pourrait être amélioré
   - Actions recommandées: mesures à prendre pour éviter des incidents similaires

## Déploiement

Pour déployer cette application en production:

1. **Créer une version optimisée:**
   ```bash
   npm run build
   ```

2. **Déployer le contenu du dossier `build`:**
   - Le dossier `build` contient les fichiers statiques prêts à être déployés
   - Ces fichiers peuvent être hébergés sur n'importe quel service d'hébergement de sites statiques:
     - GitHub Pages
     - Netlify
     - Vercel
     - Firebase Hosting
     - Ou tout autre serveur web standard

## Personnalisation

Pour personnaliser l'application selon vos besoins:

1. **Modifier les types d'incidents:**
   - Ouvrez `src/components/IncidentResponseGenerator.js`
   - Modifiez le tableau `incidentTypes` pour ajouter ou supprimer des catégories

2. **Modifier les niveaux de sévérité:**
   - Dans le même fichier, modifiez le tableau `severityLevels`

3. **Changer le style:**
   - L'application utilise Tailwind CSS
   - Vous pouvez modifier les classes CSS directement dans les composants
   - Pour des changements plus importants, modifiez `tailwind.config.js`

## Technologies utilisées

- React.js
- Tailwind CSS
- JavaScript ES6+

## Licence

MIT
