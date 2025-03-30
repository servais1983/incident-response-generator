/**
 * Utilitaires pour l'exportation des données d'incident
 */

/**
 * Exporte les détails d'un incident au format texte
 * @param {Object} incident - L'objet incident à exporter
 * @return {String} Texte formaté de l'incident
 */
export const exportIncidentToText = (incident) => {
  if (!incident) return '';
  
  const formatSection = (title, content) => {
    return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n${content || 'Non spécifié'}\n\n`;
  };
  
  let text = '';
  
  // Titre et informations générales
  text += `RAPPORT D'INCIDENT DE SÉCURITÉ\n`;
  text += `================================\n\n`;
  text += `${incident.incidentTitle || 'Sans titre'}\n\n`;
  
  text += `ID de l'incident: ${incident.incidentId || 'Non défini'}\n`;
  text += `Type d'incident: ${incident.incidentType || 'Non défini'}\n`;
  text += `Sévérité: ${incident.severity || 'Non définie'}\n`;
  text += `Statut: ${incident.status || 'En cours'}\n`;
  text += `Date de détection: ${incident.detectionDate || 'Non spécifiée'} ${incident.detectionTime || ''}\n`;
  text += `Date de résolution: ${incident.resolutionDate || 'Non spécifiée'} ${incident.resolutionTime || ''}\n`;
  text += `Méthode de détection: ${incident.detectionMethod || 'Non spécifiée'}\n`;
  text += `Systèmes affectés: ${incident.affectedSystems || 'Non spécifiés'}\n\n`;
  
  // Description de l'incident
  text += formatSection('DESCRIPTION DE L\'INCIDENT', incident.attackerActions);
  
  // Impacts
  text += formatSection('IMPACT', incident.impactDescription);
  
  // Actions de réponse
  text += formatSection('CONFINEMENT', incident.containmentActions);
  text += formatSection('ÉRADICATION', incident.eradicationActions);
  text += formatSection('RÉCUPÉRATION', incident.recoveryActions);
  
  // Leçons apprises
  text += formatSection('LEÇONS APPRISES', incident.lessonsLearned);
  text += formatSection('ACTIONS RECOMMANDÉES', incident.recommendedActions);
  
  // Pied de page
  text += `Rapport généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}`;
  
  return text;
};

/**
 * Télécharge un fichier texte contenant les détails de l'incident
 * @param {Object} incident - L'objet incident à exporter
 */
export const downloadIncidentAsText = (incident) => {
  if (!incident) return;
  
  const text = exportIncidentToText(incident);
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rapport-Incident-${incident.incidentId || 'nouveau'}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Structure les données d'incident pour l'exportation au format PDF
 * @param {Object} incident - L'objet incident à structurer
 * @return {Object} Données structurées pour un document PDF
 */
export const prepareIncidentForPDF = (incident) => {
  if (!incident) return {};
  
  return {
    title: incident.incidentTitle || 'Rapport d\'incident',
    id: incident.incidentId || 'Non défini',
    severity: incident.severity || 'Non définie',
    status: incident.status || 'En cours',
    detectionDate: incident.detectionDate || 'Non spécifiée',
    detectionTime: incident.detectionTime || '',
    resolutionDate: incident.resolutionDate || 'Non spécifiée',
    resolutionTime: incident.resolutionTime || '',
    detectionMethod: incident.detectionMethod || 'Non spécifiée',
    affectedSystems: incident.affectedSystems || 'Non spécifiés',
    initialVector: incident.initialVector || 'Non spécifié',
    attackerActions: incident.attackerActions || 'Non spécifiées',
    impactDescription: incident.impactDescription || 'Non spécifié',
    containmentActions: incident.containmentActions || 'Non spécifiées',
    eradicationActions: incident.eradicationActions || 'Non spécifiées',
    recoveryActions: incident.recoveryActions || 'Non spécifiées',
    lessonsLearned: incident.lessonsLearned || 'Non spécifiées',
    recommendedActions: incident.recommendedActions || 'Non spécifiées',
    dataImpact: {
      classification: incident.dataImpactClassification || 'Non spécifiée',
      volume: incident.dataImpactVolume || 'Non spécifié',
      type: incident.dataImpactType || 'Non spécifié'
    },
    reputationImpact: {
      visibility: incident.reputationImpactVisibility || 'Non spécifiée',
      stakeholders: incident.reputationImpactStakeholders || 'Non spécifiés',
      mediaPotential: incident.reputationImpactMediaPotential || 'Non spécifié'
    },
    financialImpact: {
      estimate: incident.financialImpactEstimate || 'Non spécifié',
      type: incident.financialImpactType || 'Non spécifié'
    },
    generationDate: new Date().toLocaleDateString(),
    generationTime: new Date().toLocaleTimeString()
  };
};

/**
 * Partage l'incident par email
 * @param {Object} incident - L'objet incident à partager
 * @param {String} recipients - Destinataires séparés par des virgules
 * @param {String} additionalMessage - Message supplémentaire à inclure
 */
export const shareIncidentByEmail = (incident, recipients, additionalMessage = '') => {
  if (!incident) return;
  
  const subject = encodeURIComponent(`Rapport d'incident : ${incident.incidentTitle || 'Sans titre'} (${incident.incidentId || 'ID non défini'})`);
  const body = encodeURIComponent(`${additionalMessage}\n\n${exportIncidentToText(incident)}`);
  
  window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
};
