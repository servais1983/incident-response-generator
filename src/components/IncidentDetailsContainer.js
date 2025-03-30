import React, { useState, useEffect } from 'react';
import IncidentDetailScreen from './IncidentDetailScreen';
import { downloadIncidentAsText, shareIncidentByEmail } from '../utils/exportUtils';

/**
 * Composant conteneur pour gérer les interactions avec l'écran de détail d'incident
 * 
 * Ce composant fait le pont entre les détails de l'incident et le stockage/état de l'application
 */
const IncidentDetailsContainer = ({ incidentId, onClose, onUpdateSuccess }) => {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simuler le chargement d'un incident à partir d'un stockage
  useEffect(() => {
    // Dans une vraie application, ceci serait un appel API
    // ou une requête à une base de données
    const fetchIncident = () => {
      setLoading(true);
      
      // Simuler un délai réseau
      setTimeout(() => {
        try {
          // Dans une application réelle, recherchez l'incident par ID
          // dans votre stockage ou faites un appel API
          
          // Pour l'exemple, on utilise un incident codé en dur
          const mockIncident = {
            incidentId: incidentId || 'IR-2025-042',
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
            
            // Données d'impact supplémentaires pour la nouvelle section
            dataImpactClassification: 'Données sensibles',
            dataImpactVolume: '250 Go',
            dataImpactType: 'Chiffrement',
            reputationImpactVisibility: 'Interne uniquement',
            reputationImpactStakeholders: 'Employés, direction',
            reputationImpactMediaPotential: 'Faible',
            financialImpactEstimate: '15 000 €',
            financialImpactType: 'Coûts de récupération et temps d\'arrêt'
          };
          
          setIncident(mockIncident);
          setLoading(false);
        } catch (err) {
          setError('Erreur lors du chargement des détails de l\'incident');
          setLoading(false);
        }
      }, 500);
    };
    
    fetchIncident();
  }, [incidentId]);
  
  // Gérer le changement de statut
  const handleStatusChange = (id, newStatus, note) => {
    // Dans une vraie application, ce serait un appel API pour mettre à jour le statut
    setIncident(prev => ({
      ...prev,
      status: newStatus
    }));
    
    // Log la note et autres détails pour une utilisation future
    console.log(`Statut de l'incident ${id} changé en ${newStatus}. Note: ${note}`);
    
    // Simuler un succès de mise à jour
    if (onUpdateSuccess) {
      onUpdateSuccess(`Le statut a été mis à jour avec succès en "${newStatus}"`);
    }
  };
  
  // Gérer la suppression
  const handleDelete = (id) => {
    // Dans une vraie application, ce serait un appel API pour supprimer l'incident
    console.log(`Demande de suppression de l'incident ${id}`);
    
    // Simuler un retour à la liste des incidents
    if (onClose) {
      onClose('delete-success');
    }
  };
  
  // Gérer le partage/export
  const handleShare = (incident, format) => {
    switch (format) {
      case 'pdf':
        // Simuler la génération d'un PDF
        console.log('Export PDF demandé pour l\'incident', incident.incidentId);
        alert('Le PDF a été généré et téléchargé');
        break;
      case 'text':
        // Utiliser l'utilitaire d'exportation de texte
        downloadIncidentAsText(incident);
        break;
      case 'email':
        // Demander l'email du destinataire
        const email = prompt('Entrez l\'adresse email du destinataire:');
        if (email) {
          shareIncidentByEmail(incident, email, 'Voici les détails de l\'incident que vous avez demandé:');
        }
        break;
      default:
        console.warn('Format d\'export non reconnu:', format);
    }
  };
  
  // Affichage conditionnel en fonction de l'état
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button 
          onClick={onClose}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retour
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <IncidentDetailScreen 
        incident={incident} 
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onShare={handleShare}
      />
    </div>
  );
};

export default IncidentDetailsContainer;
