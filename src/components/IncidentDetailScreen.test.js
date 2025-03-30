import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IncidentDetailScreen from './IncidentDetailScreen';

// Mock des données d'incident pour les tests
const mockIncident = {
  incidentId: 'IR-2025-042',
  incidentTitle: 'Incident Ransomware sur serveur de fichiers',
  status: 'En cours',
  severity: 'Critique',
  detectionDate: '2025-03-25',
  detectionTime: '14:30',
  resolutionDate: '',
  resolutionTime: '',
  incidentType: 'Ransomware',
  detectionMethod: 'Alerte SIEM et signalement utilisateur',
  affectedSystems: 'Serveur de fichiers FS001, postes de travail (5)',
  initialVector: 'Email de phishing avec document Office malveillant',
  attackerActions: 'Exécution de macro, élévation de privilèges, déploiement de ransomware',
  impactDescription: 'Chiffrement de 250 Go de données, perturbation pendant 48h',
  containmentActions: 'Isolation réseau, blocage des IP malveillantes',
  eradicationActions: 'Reconstruction des systèmes, correctifs déployés',
  recoveryActions: 'Restauration depuis les sauvegardes de J-1',
  lessonsLearned: 'Améliorer le processus de gestion des correctifs',
  recommendedActions: 'Formation anti-phishing, meilleure segmentation réseau',
  
  // Données d'impact supplémentaires
  dataImpactClassification: 'Données sensibles',
  dataImpactVolume: '250 Go',
  dataImpactType: 'Chiffrement',
  reputationImpactVisibility: 'Interne uniquement',
  reputationImpactStakeholders: 'Employés, direction',
  reputationImpactMediaPotential: 'Faible',
  financialImpactEstimate: '15 000 €',
  financialImpactType: 'Coûts de récupération et temps d\'arrêt'
};

// Mock des fonctions de rappel
const mockOnStatusChange = jest.fn();
const mockOnDelete = jest.fn();
const mockOnShare = jest.fn();

// Configuration du composant de test avec des props par défaut
const renderComponent = (props = {}) => {
  const defaultProps = {
    incident: mockIncident,
    onStatusChange: mockOnStatusChange,
    onDelete: mockOnDelete,
    onShare: mockOnShare,
  };
  
  return render(<IncidentDetailScreen {...defaultProps} {...props} />);
};

describe('IncidentDetailScreen', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });
  
  test('doit afficher correctement les informations de l\'incident', () => {
    renderComponent();
    
    // Vérifier le titre et l'ID
    expect(screen.getByText('Incident Ransomware sur serveur de fichiers')).toBeInTheDocument();
    expect(screen.getByText('IR-2025-042')).toBeInTheDocument();
    
    // Vérifier la sévérité et le statut
    expect(screen.getByText('Critique')).toBeInTheDocument();
    expect(screen.getByText('En cours')).toBeInTheDocument();
    
    // Vérifier les onglets de navigation
    expect(screen.getByText('Informations générales')).toBeInTheDocument();
    expect(screen.getByText('Évaluation d\'impact')).toBeInTheDocument();
    expect(screen.getByText('Actions de réponse')).toBeInTheDocument();
    expect(screen.getByText('Retour d\'expérience')).toBeInTheDocument();
  });
  
  test('doit changer d\'onglet lorsqu\'on clique sur les boutons de navigation', () => {
    renderComponent();
    
    // Au début, l'onglet "Informations générales" devrait être actif
    const generalInfoTab = screen.getByText('Informations générales');
    expect(generalInfoTab).toHaveClass('border-b-2');
    
    // Cliquer sur l'onglet "Évaluation d'impact"
    fireEvent.click(screen.getByText('Évaluation d\'impact'));
    
    // Maintenant, "Évaluation d'impact" devrait être actif
    const impactTab = screen.getByText('Évaluation d\'impact');
    expect(impactTab).toHaveClass('border-b-2');
    
    // Le contenu devrait afficher les informations d'impact
    expect(screen.getByText('Évaluation d\'impact')).toBeInTheDocument();
    expect(screen.getByText('Impact sur les données')).toBeInTheDocument();
    expect(screen.getByText('Impact sur la réputation')).toBeInTheDocument();
  });
  
  test('doit ouvrir le dialogue de changement de statut', () => {
    renderComponent();
    
    // Cliquer sur le bouton "Changer le statut"
    fireEvent.click(screen.getByText('Changer le statut'));
    
    // Vérifier que le dialogue est ouvert
    expect(screen.getByText('Changer le statut de l\'incident')).toBeInTheDocument();
    expect(screen.getByText('Nouveau statut')).toBeInTheDocument();
    expect(screen.getByText('Note (optionnel)')).toBeInTheDocument();
    
    // Vérifier que les boutons du dialogue sont présents
    expect(screen.getByText('Annuler')).toBeInTheDocument();
    expect(screen.getByText('Confirmer')).toBeInTheDocument();
  });
  
  test('doit appeler onStatusChange lors de la confirmation du changement de statut', async () => {
    renderComponent();
    
    // Ouvrir le dialogue
    fireEvent.click(screen.getByText('Changer le statut'));
    
    // Changer le statut
    const selectElement = screen.getByLabelText('Nouveau statut');
    fireEvent.change(selectElement, { target: { value: 'Résolu' } });
    
    // Ajouter une note
    const noteElement = screen.getByLabelText('Note (optionnel)');
    fireEvent.change(noteElement, { target: { value: 'Incident résolu après restauration des données.' } });
    
    // Confirmer le changement
    fireEvent.click(screen.getByText('Confirmer'));
    
    // Vérifier que onStatusChange a été appelé avec les bons arguments
    expect(mockOnStatusChange).toHaveBeenCalledWith(
      'IR-2025-042',
      'Résolu',
      'Incident résolu après restauration des données.'
    );
  });
  
  test('doit ouvrir le dialogue de confirmation de suppression', () => {
    renderComponent();
    
    // Cliquer sur le bouton "Supprimer"
    fireEvent.click(screen.getByText('Supprimer'));
    
    // Vérifier que le dialogue est ouvert
    expect(screen.getByText('Supprimer l\'incident')).toBeInTheDocument();
    expect(screen.getByText(/Êtes-vous sûr de vouloir supprimer cet incident/)).toBeInTheDocument();
    
    // Vérifier que les boutons du dialogue sont présents
    expect(screen.getByText('Annuler')).toBeInTheDocument();
    expect(screen.getByText('Supprimer')).toBeInTheDocument();
  });
  
  test('doit appeler onDelete lors de la confirmation de suppression', async () => {
    renderComponent();
    
    // Ouvrir le dialogue
    fireEvent.click(screen.getByText('Supprimer'));
    
    // Confirmer la suppression
    fireEvent.click(screen.getAllByText('Supprimer')[1]); // Le deuxième bouton "Supprimer" est celui du dialogue
    
    // Vérifier que onDelete a été appelé avec le bon ID
    expect(mockOnDelete).toHaveBeenCalledWith('IR-2025-042');
  });
  
  test('doit appeler onShare lors de l\'export PDF', () => {
    renderComponent();
    
    // Cliquer sur le bouton "Exporter PDF"
    fireEvent.click(screen.getByText('Exporter PDF'));
    
    // Vérifier que onShare a été appelé avec le bon format
    expect(mockOnShare).toHaveBeenCalledWith(mockIncident, 'pdf');
  });
  
  test('doit afficher un message d\'erreur quand l\'incident est null', () => {
    renderComponent({ incident: null });
    
    // Vérifier le message d'erreur
    expect(screen.getByText('Incident non trouvé')).toBeInTheDocument();
  });
});
