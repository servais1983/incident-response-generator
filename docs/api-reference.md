# Documentation de l'API - Générateur de Rapport d'Incident

Cette documentation décrit les composants et APIs internes disponibles dans l'application Générateur de Rapport d'Incident, ainsi que les structures de données utilisées.

## Table des matières

1. [Architecture générale](#architecture-générale)
2. [Composants principaux](#composants-principaux)
3. [Structures de données](#structures-de-données)
4. [Utilitaires](#utilitaires)
5. [Intégrations](#intégrations)
6. [Guide de développement](#guide-de-développement)

## Architecture générale

L'application est structurée selon une architecture basée sur des composants React, avec une organisation modulaire pour faciliter la maintenance et l'extension.

### Arborescence des fichiers

```
src/
├── components/           # Composants React de l'interface utilisateur
│   ├── analytics/        # Composants d'analyse et métriques
│   ├── dashboard/        # Composants de tableau de bord
│   ├── reports/          # Composants de génération de rapports
│   └── ...               # Autres composants de l'UI
├── utils/                # Fonctions utilitaires
├── App.js                # Point d'entrée de l'application
└── index.js              # Point d'entrée React
```

### Flux de données

Le flux de données dans l'application suit un modèle unidirectionnel :
1. L'utilisateur interagit avec un composant
2. Le composant déclenche des actions (ex: chargement de données, soumission de formulaire)
3. Les données sont mises à jour dans l'état local ou global
4. L'interface utilisateur se met à jour en fonction du nouvel état

## Composants principaux

### Écran de détail d'incident

Le composant `IncidentDetailScreen` est responsable de l'affichage des détails d'un incident et fournit des fonctionnalités pour interagir avec ces données.

#### Propriétés

```javascript
IncidentDetailScreen.propTypes = {
  incident: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func
};
```

#### Méthodes

```javascript
// Changer le statut d'un incident
onStatusChange(incidentId, newStatus, statusNote)

// Supprimer un incident
onDelete(incidentId)

// Partager/exporter un incident
onShare(incident, format)
```

### Formulaire de création de tâches

Le composant `TaskCreateScreen` permet de créer de nouvelles tâches associées à un incident.

#### Propriétés

```javascript
TaskCreateScreen.propTypes = {
  incidentId: PropTypes.string.isRequired,
  onCreateSuccess: PropTypes.func,
  onCancel: PropTypes.func
};
```

#### Méthodes

```javascript
// Soumettre le formulaire pour créer une tâche
handleSubmit(event)
```

### Formulaire d'ajout de preuves

Le composant `EvidenceCreateScreen` permet d'ajouter des preuves avec gestion des pièces jointes.

#### Propriétés

```javascript
EvidenceCreateScreen.propTypes = {
  incidentId: PropTypes.string.isRequired,
  onCreateSuccess: PropTypes.func,
  onCancel: PropTypes.func
};
```

#### Méthodes

```javascript
// Gérer les fichiers attachés
handleFileChange(event)

// Supprimer un fichier
handleRemoveFile(index)

// Soumettre le formulaire
handleSubmit(event)
```

### Formulaire d'ajout d'événements chronologiques

Le composant `TimelineCreateScreen` permet d'enregistrer des événements dans la chronologie d'un incident.

#### Propriétés

```javascript
TimelineCreateScreen.propTypes = {
  incidentId: PropTypes.string.isRequired,
  onCreateSuccess: PropTypes.func,
  onCancel: PropTypes.func
};
```

#### Méthodes

```javascript
// Soumettre le formulaire
handleSubmit(event)
```

### Formulaire d'édition d'incident

Le composant `IncidentEditScreen` permet de modifier les incidents existants.

#### Propriétés

```javascript
IncidentEditScreen.propTypes = {
  incident: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};
```

#### Méthodes

```javascript
// Soumettre le formulaire
handleSubmit(event)
```

### Générateur de rapports

Le composant `ReportGenerator` permet de générer différents types de rapports à partir des données d'incident.

#### Propriétés

```javascript
ReportGenerator.propTypes = {
  incident: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
```

#### Méthodes

```javascript
// Générer une prévisualisation du rapport
generatePreview()

// Générer le rapport final
generateReport()
```

### Tableau de bord

Le composant `IncidentDashboard` affiche des graphiques et des statistiques sur les incidents.

#### Propriétés

```javascript
// Ce composant n'a pas de propriétés requises
```

#### Méthodes

```javascript
// Gérer les changements de filtre
handleFilterChange(event)

// Gérer les filtres à choix multiples
handleMultiFilterChange(name, value)

// Calculer les métriques clés
calculateMetrics(incidents)
```

### Métriques de performance

Le composant `PerformanceMetrics` affiche des indicateurs clés de performance (KPI) pour l'équipe.

#### Propriétés

```javascript
// Ce composant n'a pas de propriétés requises
```

#### Méthodes

```javascript
// Gérer les changements de filtre
handleFilterChange(event)

// Formatage du temps (minutes vers heures/jours)
formatTime(minutes)

// Calcul du score de santé global
calculateHealthScore(metrics)
```

## Structures de données

### Objet Incident

```javascript
/**
 * Structure d'un objet Incident
 */
const IncidentSchema = {
  // Identifiants
  incidentId: String,         // Identifiant unique (ex: IR-2025-042)
  incidentTitle: String,      // Titre descriptif
  
  // Dates
  detectionDate: String,      // Date de détection (YYYY-MM-DD)
  detectionTime: String,      // Heure de détection (HH:MM)
  resolutionDate: String,     // Date de résolution (YYYY-MM-DD)
  resolutionTime: String,     // Heure de résolution (HH:MM)
  
  // Catégorisation
  incidentType: String,       // Type d'incident (ex: Ransomware)
  severity: String,           // Sévérité (Critique, Élevé, Moyen, Faible)
  status: String,             // Statut (Nouveau, En cours, En attente, Résolu, Fermé)
  
  // Détails
  detectionMethod: String,    // Méthode de détection
  affectedSystems: String,    // Systèmes affectés
  initialVector: String,      // Vecteur initial
  attackerActions: String,    // Actions de l'attaquant
  impactDescription: String,  // Description de l'impact
  
  // Actions de réponse
  containmentActions: String, // Actions de confinement
  eradicationActions: String, // Actions d'éradication
  recoveryActions: String,    // Actions de récupération
  
  // Retour d'expérience
  lessonsLearned: String,     // Leçons apprises
  recommendedActions: String, // Actions recommandées
  
  // Sections d'impact supplémentaires
  dataImpactClassification: String, // Classification de l'impact sur les données
  dataImpactVolume: String,         // Volume des données affectées
  dataImpactType: String,           // Type d'impact sur les données
  reputationImpactVisibility: String, // Visibilité externe
  reputationImpactStakeholders: String, // Parties prenantes affectées
  reputationImpactMediaPotential: String, // Impact médiatique potentiel
  financialImpactEstimate: String,  // Estimation de l'impact financier
  financialImpactType: String       // Type d'impact financier
};
```

### Objet Tâche

```javascript
/**
 * Structure d'un objet Task
 */
const TaskSchema = {
  taskId: String,          // Identifiant unique de la tâche
  incidentId: String,      // Identifiant de l'incident associé
  title: String,           // Titre de la tâche
  description: String,     // Description
  assignee: String,        // Personne assignée
  dueDate: String,         // Date d'échéance
  priority: String,        // Priorité (Haute, Moyenne, Basse)
  status: String,          // Statut (À faire, En cours, En attente, Terminée)
  category: String,        // Catégorie (Analyse, Confinement, Éradication, etc.)
  createdAt: String,       // Date de création
  updatedAt: String        // Date de dernière mise à jour
};
```

### Objet Preuve

```javascript
/**
 * Structure d'un objet Evidence
 */
const EvidenceSchema = {
  evidenceId: String,      // Identifiant unique de la preuve
  incidentId: String,      // Identifiant de l'incident associé
  title: String,           // Titre de la preuve
  description: String,     // Description
  source: String,          // Source de la preuve
  collectionDate: String,  // Date de collecte
  collectionTime: String,  // Heure de collecte
  evidenceType: String,    // Type de preuve (Log, Capture réseau, etc.)
  classification: String,  // Classification (Normal, Confidentiel, etc.)
  location: String,        // Localisation (chemin, URL, etc.)
  md5Hash: String,         // Hash MD5 (si applicable)
  notes: String,           // Notes supplémentaires
  attachments: Array,      // Liste des pièces jointes
  createdAt: String        // Date de création
};
```

### Objet Événement de chronologie

```javascript
/**
 * Structure d'un objet Timeline Event
 */
const TimelineEventSchema = {
  eventId: String,         // Identifiant unique de l'événement
  incidentId: String,      // Identifiant de l'incident associé
  title: String,           // Titre de l'événement
  description: String,     // Description
  eventDate: String,       // Date de l'événement
  eventTime: String,       // Heure de l'événement
  eventType: String,       // Type d'événement
  source: String,          // Source de l'information
  actor: String,           // Acteur impliqué
  impact: String,          // Niveau d'impact
  isKeyEvent: Boolean,     // Événement clé
  timestamp: String,       // Horodatage combiné
  createdAt: String        // Date de création
};
```

## Utilitaires

L'application fournit plusieurs fonctions utilitaires pour faciliter certaines tâches courantes.

### Utilitaires d'exportation

Le module `exportUtils.js` contient des fonctions pour exporter et partager les données d'incident.

```javascript
/**
 * Exporte les détails d'un incident au format texte
 * @param {Object} incident - L'objet incident à exporter
 * @return {String} Texte formaté de l'incident
 */
export const exportIncidentToText = (incident) => {
  // ...
};

/**
 * Télécharge un fichier texte contenant les détails de l'incident
 * @param {Object} incident - L'objet incident à exporter
 */
export const downloadIncidentAsText = (incident) => {
  // ...
};

/**
 * Structure les données d'incident pour l'exportation au format PDF
 * @param {Object} incident - L'objet incident à structurer
 * @return {Object} Données structurées pour un document PDF
 */
export const prepareIncidentForPDF = (incident) => {
  // ...
};

/**
 * Partage l'incident par email
 * @param {Object} incident - L'objet incident à partager
 * @param {String} recipients - Destinataires séparés par des virgules
 * @param {String} additionalMessage - Message supplémentaire à inclure
 */
export const shareIncidentByEmail = (incident, recipients, additionalMessage = '') => {
  // ...
};
```

## Intégrations

### PDF Generation

L'application utilise le composant `IncidentPDFTemplate` pour générer des PDF à partir des données d'incident.

```javascript
/**
 * Génère un PDF à partir d'un objet incident
 * @param {Object} incident - L'objet incident à convertir en PDF
 */
const generatePDF = (incident) => {
  const pdfData = prepareIncidentForPDF(incident);
  // Logique de génération du PDF...
};
```

## Guide de développement

### Ajouter un nouveau type d'incident

Pour ajouter un nouveau type d'incident à l'application :

1. Localisez le tableau `incidentTypes` dans le composant `IncidentResponseGenerator.js`
2. Ajoutez le nouveau type à ce tableau :

```javascript
const incidentTypes = [
  'Malware', 
  'Phishing', 
  'DDoS', 
  'Intrusion', 
  'Fuite de données', 
  'Accès non autorisé',
  'Ransomware',
  'Compromission de compte',
  'Votre nouveau type',  // Ajoutez-le ici
  'Autre'
];
```

### Ajouter un nouveau niveau de sévérité

Pour ajouter un nouveau niveau de sévérité :

1. Localisez le tableau `severityLevels` dans le composant `IncidentResponseGenerator.js`
2. Ajoutez le nouveau niveau à ce tableau :

```javascript
const severityLevels = [
  'Critique', 
  'Élevé', 
  'Moyen', 
  'Votre nouveau niveau',  // Ajoutez-le ici
  'Faible'
];
```

3. N'oubliez pas de mettre à jour la fonction `getSeverityColor` dans le fichier `utils/styleUtils.js` pour prendre en compte cette nouvelle valeur.

### Créer un nouveau composant

Pour créer un nouveau composant qui s'intègre bien à l'application existante :

1. Créez un nouveau fichier dans le répertoire `src/components/` approprié
2. Utilisez le modèle suivant :

```javascript
import React, { useState } from 'react';

/**
 * [Description de votre composant]
 */
const VotreComposant = ({ prop1, prop2 }) => {
  // État local
  const [localState, setLocalState] = useState(initialValue);
  
  // Handlers
  const handleSomeEvent = () => {
    // Logique du handler
  };
  
  // Rendu du composant
  return (
    <div className="[classes Tailwind]">
      {/* Contenu du composant */}
    </div>
  );
};

export default VotreComposant;
```

### Tests unitaires

Pour ajouter des tests unitaires pour vos composants :

1. Créez un fichier avec le nom `NomDuComposant.test.js` dans le même répertoire que le composant
2. Utilisez le modèle suivant :

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VotreComposant from './VotreComposant';

describe('VotreComposant', () => {
  test('doit s\'afficher correctement', () => {
    render(<VotreComposant prop1="valeur1" prop2="valeur2" />);
    expect(screen.getByText(/texte attendu/i)).toBeInTheDocument();
  });
  
  test('doit réagir aux événements', () => {
    const mockFunction = jest.fn();
    render(<VotreComposant prop1="valeur1" prop2="valeur2" onSomeEvent={mockFunction} />);
    fireEvent.click(screen.getByText(/bouton/i));
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

### Bonnes pratiques

1. **Composants réutilisables** : Créez des composants modulaires et réutilisables
2. **Props validation** : Validez toujours les props avec PropTypes
3. **Documentation** : Ajoutez des commentaires en JSDoc pour documenter vos composants et fonctions
4. **Nommage cohérent** : Suivez les conventions de nommage (PascalCase pour les composants, camelCase pour les variables et fonctions)
5. **Tests** : Écrivez des tests pour tous les nouveaux composants et fonctionnalités
