import React from 'react';

/**
 * Modèle pour la génération de PDF pour les rapports d'incident
 * 
 * Ce composant est destiné à être rendu par une bibliothèque de génération de PDF
 * comme react-pdf ou jsPDF
 */
const IncidentPDFTemplate = ({ incident }) => {
  if (!incident) return null;
  
  // Style pour le PDF
  const styles = {
    page: {
      padding: '40px',
      fontFamily: 'Helvetica',
      fontSize: '12pt',
      lineHeight: 1.5
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '24pt',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '18pt',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    section: {
      marginTop: '20px',
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '14pt',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#1e40af' // blue-800
    },
    metaRow: {
      display: 'flex',
      marginBottom: '8px'
    },
    metaLabel: {
      width: '200px',
      fontWeight: 'bold'
    },
    metaValue: {
      flex: 1
    },
    footer: {
      marginTop: '40px',
      borderTop: '1px solid #d1d5db',
      paddingTop: '10px',
      fontSize: '10pt',
      color: '#6b7280', // gray-500
      textAlign: 'center'
    },
    severityBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '10pt',
      fontWeight: 'bold',
      display: 'inline-block',
      marginLeft: '5px'
    }
  };
  
  // Obtenir la couleur basée sur la sévérité
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critique':
        return { backgroundColor: '#fee2e2', color: '#991b1b' }; // red-100, red-800
      case 'Élevé':
        return { backgroundColor: '#ffedd5', color: '#9a3412' }; // orange-100, orange-800
      case 'Moyen':
        return { backgroundColor: '#fef9c3', color: '#854d0e' }; // yellow-100, yellow-800
      case 'Faible':
        return { backgroundColor: '#dcfce7', color: '#166534' }; // green-100, green-800
      default:
        return { backgroundColor: '#e5e7eb', color: '#374151' }; // gray-200, gray-700
    }
  };
  
  // Format pour les champs manquants
  const formatField = (content) => content || 'Non spécifié';
  
  return (
    <div style={styles.page} id="incident-pdf-template">
      <div style={styles.header}>
        <div style={styles.title}>RAPPORT D'INCIDENT DE SÉCURITÉ</div>
        <div style={styles.subtitle}>
          {incident.incidentTitle}
          <span 
            style={{
              ...styles.severityBadge, 
              ...getSeverityStyle(incident.severity)
            }}
          >
            {incident.severity}
          </span>
        </div>
      </div>
      
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Informations générales</div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>ID de l'incident:</div>
          <div style={styles.metaValue}>{formatField(incident.incidentId)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Type d'incident:</div>
          <div style={styles.metaValue}>{formatField(incident.incidentType)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Statut:</div>
          <div style={styles.metaValue}>{formatField(incident.status)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Date de détection:</div>
          <div style={styles.metaValue}>
            {formatField(incident.detectionDate)} {incident.detectionTime}
          </div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Date de résolution:</div>
          <div style={styles.metaValue}>
            {formatField(incident.resolutionDate)} {incident.resolutionTime}
          </div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Méthode de détection:</div>
          <div style={styles.metaValue}>{formatField(incident.detectionMethod)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Systèmes affectés:</div>
          <div style={styles.metaValue}>{formatField(incident.affectedSystems)}</div>
        </div>
      </div>
      
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Description de l'incident</div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Vecteur initial:</div>
          <div style={styles.metaValue}>{formatField(incident.initialVector)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Actions de l'attaquant:</div>
          <div style={styles.metaValue}>{formatField(incident.attackerActions)}</div>
        </div>
      </div>
      
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Évaluation d'impact</div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Impact opérationnel:</div>
          <div style={styles.metaValue}>{formatField(incident.impactDescription)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Impact sur les données:</div>
          <div style={styles.metaValue}>
            Classification: {formatField(incident.dataImpactClassification)}<br />
            Volume: {formatField(incident.dataImpactVolume)}<br />
            Type: {formatField(incident.dataImpactType)}
          </div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Impact sur la réputation:</div>
          <div style={styles.metaValue}>
            Visibilité: {formatField(incident.reputationImpactVisibility)}<br />
            Parties prenantes: {formatField(incident.reputationImpactStakeholders)}<br />
            Impact médiatique: {formatField(incident.reputationImpactMediaPotential)}
          </div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Impact financier:</div>
          <div style={styles.metaValue}>
            Coûts estimés: {formatField(incident.financialImpactEstimate)}<br />
            Type d'impact: {formatField(incident.financialImpactType)}
          </div>
        </div>
      </div>
      
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Actions de réponse</div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Confinement:</div>
          <div style={styles.metaValue}>{formatField(incident.containmentActions)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Éradication:</div>
          <div style={styles.metaValue}>{formatField(incident.eradicationActions)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Récupération:</div>
          <div style={styles.metaValue}>{formatField(incident.recoveryActions)}</div>
        </div>
      </div>
      
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Retour d'expérience</div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Leçons apprises:</div>
          <div style={styles.metaValue}>{formatField(incident.lessonsLearned)}</div>
        </div>
        
        <div style={styles.metaRow}>
          <div style={styles.metaLabel}>Actions recommandées:</div>
          <div style={styles.metaValue}>{formatField(incident.recommendedActions)}</div>
        </div>
      </div>
      
      <div style={styles.footer}>
        Rapport généré le {incident.generationDate || new Date().toLocaleDateString()} 
        à {incident.generationTime || new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default IncidentPDFTemplate;
