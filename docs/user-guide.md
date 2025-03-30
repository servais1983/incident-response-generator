# Guide utilisateur - Générateur de Rapport d'Incident de Sécurité

## Table des matières

1. [Introduction](#introduction)
2. [Installation et démarrage](#installation-et-démarrage)
3. [Création d'un rapport d'incident](#création-dun-rapport-dincident)
4. [Consultation et modification des incidents](#consultation-et-modification-des-incidents)
5. [Gestion des tâches](#gestion-des-tâches)
6. [Ajout de preuves](#ajout-de-preuves)
7. [Chronologie des événements](#chronologie-des-événements)
8. [Génération de rapports](#génération-de-rapports)
9. [Tableau de bord et analyses](#tableau-de-bord-et-analyses)
10. [Métriques de performance](#métriques-de-performance)
11. [Dépannage](#dépannage)
12. [Glossaire](#glossaire)

## Introduction

Le Générateur de Rapport d'Incident de Sécurité est une application web conçue pour faciliter la documentation, le suivi et l'analyse des incidents de sécurité informatique. Cette application permet aux équipes de réponse aux incidents de créer des rapports détaillés, de suivre les tâches associées, d'enregistrer des preuves et de générer des visualisations pour analyser les tendances.

### Fonctionnalités principales

- Création et gestion des rapports d'incidents
- Suivi des tâches liées aux incidents
- Enregistrement des preuves avec gestion des pièces jointes
- Chronologie des événements
- Génération de rapports standardisés
- Tableau de bord et visualisations
- Métriques de performance de l'équipe

### Public cible

Cet outil est destiné aux professionnels de la cybersécurité, notamment :

- Équipes SOC (Security Operations Center)
- Équipes de réponse aux incidents (CSIRT/CERT)
- Analystes de sécurité
- Responsables de la sécurité informatique

## Installation et démarrage

### Prérequis

- Node.js (v16 ou supérieur)
- npm (v8 ou supérieur, inclus avec Node.js)
- Navigateur web moderne (Chrome, Firefox, Edge, Safari)

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/servais1983/incident-response-generator.git
   ```

2. Naviguez dans le répertoire du projet :
   ```bash
   cd incident-response-generator
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

### Démarrage

1. Lancez l'application en mode développement :
   ```bash
   npm start
   ```

2. Ouvrez votre navigateur et accédez à l'adresse :
   ```
   http://localhost:3000
   ```

### Méthodes alternatives de démarrage

**Pour Linux/Mac :**
```bash
chmod +x start.sh
./start.sh
```

**Pour Windows :**
```
start.bat
```
ou
```
demarrer.bat
```

## Création d'un rapport d'incident

### Accès au formulaire

Depuis la page d'accueil, cliquez sur le bouton "Nouveau rapport d'incident".

### Remplir le formulaire

Le formulaire de création d'incident est divisé en plusieurs sections :

#### 1. Informations générales

- **Titre de l'incident** : nom court et descriptif de l'incident
- **ID** : identifiant unique (format suggéré: IR-ANNÉE-NUMÉRO)
- **Dates et heures** : quand l'incident a été détecté et résolu
- **Méthode de détection** : comment l'incident a été découvert
- **Systèmes affectés** : quels systèmes ou applications ont été touchés
- **Type d'incident** : catégorie principale (malware, phishing, etc.)
- **Sévérité** : niveau d'impact (critique, élevé, moyen, faible)

#### 2. Détails de l'incident

- **Vecteur initial** : comment l'attaque a commencé
- **Actions de l'attaquant** : ce que l'attaquant a fait dans le système
- **Impact** : conséquences sur l'organisation (données, opérations, etc.)

#### 3. Actions de réponse

- **Confinement** : actions prises pour limiter la propagation
- **Éradication** : comment la menace a été supprimée
- **Récupération** : comment les systèmes ont été restaurés

#### 4. Retour d'expérience

- **Leçons apprises** : ce qui a bien fonctionné et ce qui pourrait être amélioré
- **Actions recommandées** : mesures à prendre pour éviter des incidents similaires

### Utiliser l'exemple préconfiguré

Pour voir rapidement comment fonctionne l'application, cliquez sur le bouton "Remplir avec exemple" en haut du formulaire.

### Soumettre le rapport

Une fois tous les champs nécessaires remplis, cliquez sur "Générer le Rapport" pour créer l'incident.

## Consultation et modification des incidents

### Liste des incidents

La page d'accueil affiche une liste de tous les incidents enregistrés. Vous pouvez :

- Filtrer les incidents par statut, type ou sévérité
- Trier les incidents par date, sévérité ou statut
- Rechercher un incident par mot-clé

### Détails d'un incident

Cliquez sur un incident dans la liste pour accéder à sa page de détails. Cette page est organisée en onglets :

1. **Informations générales** : Vue d'ensemble de l'incident
2. **Évaluation d'impact** : Détails sur l'impact de l'incident
3. **Actions de réponse** : Mesures prises pour résoudre l'incident
4. **Retour d'expérience** : Leçons apprises et recommandations

### Modification d'un incident

Pour modifier un incident existant :

1. Accédez à la page de détails de l'incident
2. Cliquez sur le bouton "Modifier" dans la barre d'actions
3. Effectuez vos modifications dans le formulaire
4. Cliquez sur "Enregistrer"

### Changement de statut

Pour changer le statut d'un incident :

1. Cliquez sur le bouton "Changer le statut" dans la barre d'actions
2. Sélectionnez le nouveau statut dans la liste déroulante
3. Ajoutez une note explicative (optionnel)
4. Cliquez sur "Confirmer"

### Suppression d'un incident

Pour supprimer un incident :

1. Cliquez sur le bouton "Supprimer" dans la barre d'actions
2. Confirmez la suppression dans la boîte de dialogue

## Gestion des tâches

### Création d'une tâche

Pour créer une nouvelle tâche liée à un incident :

1. Accédez à la page de détails de l'incident
2. Cliquez sur l'onglet "Tâches" (ou sur le bouton "Ajouter une tâche")
3. Remplissez le formulaire avec les informations suivantes :
   - Titre de la tâche
   - Description
   - Assignée à
   - Date d'échéance
   - Priorité
   - Statut
   - Catégorie
4. Cliquez sur "Créer la tâche"

### Suivi des tâches

La liste des tâches affiche :

- Le statut actuel (à faire, en cours, terminée)
- La priorité (haute, moyenne, basse)
- L'assignation
- La date d'échéance

Vous pouvez filtrer cette liste par statut, priorité ou assignation.

### Mise à jour des tâches

Pour mettre à jour une tâche :

1. Cliquez sur la tâche dans la liste
2. Modifiez les champs nécessaires
3. Cliquez sur "Enregistrer"

## Ajout de preuves

### Types de preuves supportés

L'application prend en charge différents types de preuves :

- Logs
- Captures réseau
- Images
- Documents
- Autres fichiers

### Ajouter une preuve

Pour ajouter une preuve à un incident :

1. Accédez à la page de détails de l'incident
2. Cliquez sur l'onglet "Preuves" (ou sur le bouton "Ajouter une preuve")
3. Remplissez le formulaire avec :
   - Titre de la preuve
   - Description
   - Source
   - Date et heure de collecte
   - Type de preuve
   - Classification
4. Téléchargez les fichiers associés (facultatif)
5. Cliquez sur "Ajouter la preuve"

### Gestion des pièces jointes

- Taille maximale par fichier : 25 Mo
- Formats acceptés : tous types de fichiers
- Une prévisualisation est disponible pour les images

## Chronologie des événements

### Ajouter un événement

Pour enregistrer un événement dans la chronologie :

1. Accédez à la page de détails de l'incident
2. Cliquez sur l'onglet "Chronologie" (ou sur le bouton "Ajouter un événement")
3. Remplissez le formulaire avec :
   - Titre de l'événement
   - Description
   - Date et heure de l'événement
   - Type d'événement
   - Source de l'information
   - Niveau d'impact
4. Cochez "Marquer comme événement clé" si applicable
5. Cliquez sur "Ajouter l'événement"

### Visualisation de la chronologie

La chronologie affiche tous les événements liés à l'incident dans l'ordre chronologique. Les événements clés sont mis en évidence.

## Génération de rapports

### Types de rapports disponibles

L'application propose plusieurs types de rapports standardisés :

- **Rapport complet** : Inclut toutes les informations sur l'incident
- **Rapport exécutif** : Résumé concis pour les dirigeants
- **Rapport technique** : Détails techniques approfondis
- **Rapport réglementaire** : Formaté pour les exigences de conformité

### Créer un rapport

Pour générer un rapport :

1. Accédez à la page de détails de l'incident
2. Cliquez sur "Exporter PDF" ou "Exporter"
3. Sélectionnez le type de rapport souhaité
4. Configurez les sections à inclure
5. Choisissez le format de sortie (PDF, texte, email)
6. Cliquez sur "Générer le rapport"

### Formats d'exportation

- **PDF** : Format document portable, idéal pour le partage et l'archivage
- **Texte** : Format texte brut (.txt)
- **Email** : Envoie le rapport directement par email

## Tableau de bord et analyses

### Accès au tableau de bord

Pour accéder au tableau de bord, cliquez sur "Tableau de bord" dans le menu principal.

### Filtres disponibles

Vous pouvez filtrer les données du tableau de bord par :

- Période (7 derniers jours, 30 derniers jours, 3 derniers mois, 12 derniers mois)
- Type d'incident
- Niveau de sévérité

### Visualisations

Le tableau de bord comprend plusieurs visualisations :

- Nombre total d'incidents
- Incidents par statut
- Incidents par type
- Incidents par sévérité
- Tendance des incidents sur la période

### Interprétation des données

- **Tendances** : Analysez l'évolution du nombre d'incidents au fil du temps
- **Distribution** : Identifiez les types d'incidents les plus fréquents
- **Sévérité** : Évaluez l'impact global sur l'organisation

## Métriques de performance

### Accès aux métriques

Pour accéder aux métriques de performance, cliquez sur "Métriques" dans le menu principal.

### Filtres disponibles

Vous pouvez filtrer les métriques par :

- Période (semaine, mois, trimestre, année)
- Équipe (toutes les équipes, SOC, équipe de réponse, équipe forensique)

### Indicateurs clés de performance (KPI)

Les métriques sont organisées en catégories :

1. **Temps de réponse**
   - Temps moyen de détection
   - Temps moyen de réponse
   - Temps moyen de résolution

2. **Efficacité**
   - Taux de résolution
   - Taux de faux positifs
   - Taux de réouverture

3. **Conformité**
   - Respect des SLA
   - Complétude de la documentation
   - Respect des délais de reporting

4. **Volume d'activité**
   - Incidents traités
   - Tâches complétées
   - Investigations effectuées

5. **Impact**
   - Fuites de données
   - Temps d'indisponibilité
   - Incidents prévenus

### Score de santé global

Le score de santé est une mesure combinée de toutes les métriques, pondérée selon leur importance relative. Il est représenté par :

- Une valeur numérique (0-100)
- Une jauge visuelle
- Un code couleur (vert/jaune/rouge)

## Dépannage

### Problèmes courants

#### L'application ne démarre pas

1. Vérifiez que Node.js est correctement installé : `node -v`
2. Vérifiez que npm est correctement installé : `npm -v`
3. Assurez-vous que toutes les dépendances sont installées : `npm install`
4. Vérifiez que le port 3000 n'est pas déjà utilisé

#### Les formulaires ne se soumettent pas

1. Vérifiez que tous les champs obligatoires sont remplis
2. Vérifiez les restrictions de taille pour les pièces jointes
3. Consultez la console du navigateur pour les erreurs JavaScript

#### Les rapports ne s'exportent pas

1. Vérifiez que votre navigateur autorise les téléchargements
2. Pour les emails, assurez-vous que votre client de messagerie est configuré

### Support

Pour obtenir de l'aide supplémentaire, veuillez :

1. Consulter les [problèmes connus](https://github.com/servais1983/incident-response-generator/issues)
2. Ouvrir un nouveau ticket si nécessaire
3. Contacter l'équipe de support à support@example.com

## Glossaire

- **Incident de sécurité** : Événement qui compromet la confidentialité, l'intégrité ou la disponibilité d'un système d'information
- **SOC** : Security Operations Center, équipe chargée de surveiller et d'analyser la sécurité d'une organisation
- **CSIRT/CERT** : Computer Security Incident Response Team/Computer Emergency Response Team, équipe spécialisée dans la réponse aux incidents
- **SLA** : Service Level Agreement, accord définissant le niveau de service attendu
- **TTD** : Time To Detect, temps écoulé entre le début d'un incident et sa détection
- **TTR** : Time To Respond, temps écoulé entre la détection et le début de la réponse
- **MTTR** : Mean Time To Resolve, temps moyen nécessaire pour résoudre un incident
