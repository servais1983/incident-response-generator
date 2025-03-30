import React, { useState } from 'react';
import { exportIncidentToText, prepareIncidentForPDF } from '../../utils/exportUtils';

/**
 * Générateur de rapports standardisés pour les incidents
 * 
 * Ce composant permet de générer différents types de rapports
 * à partir des données d'incident.
 */
const ReportGenerator = ({ incident, onClose }) => {
  // État pour les options de rapport
  const [reportOptions, setReportOptions] = useState({
    reportType: 'complet',
    includeTimeline: true,
    includeEvidence: true,
    includeTasks: true,
    includeImpactAnalysis: true,
    includeActionItems: true,
    format: 'pdf',
    recipientEmail: ''
  });
  
  // Options pour les types de rapport
  const reportTypeOptions = [
    { value: 'complet', label: 'Rapport complet' },
    { value: 'executif', label: 'Rapport exécutif (résumé)' },
    { value: 'technique', label: 'Rapport technique' },
    { value: 'reglementaire', label: 'Rapport réglementaire' }
  ];
  
  // Options pour le format
  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'text', label: 'Texte (.txt)' },
    { value: 'email', label: 'Email' }
  ];
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Prévisualisation du rapport
  const [previewContent, setPreviewContent] = useState(null);
  
  // Génération de la prévisualisation
  const generatePreview = () => {
    // Simulation d'un rapport au format texte pour la prévisualisation
    const previewText = generateReportText(incident, reportOptions);
    setPreviewContent(previewText);
  };
  
  // Génération du rapport texte (contenu simulé)
  const generateReportText = (incident, options) => {
    if (!incident) return 'Aucun incident sélectionné';
    
    let report = '';
    
    // En-tête du rapport
    if (options.reportType === 'executif') {
      report += `RAPPORT EXÉCUTIF D'INCIDENT\n`;
      report += `================================\n\n`;
    } else if (options.reportType === 'technique') {
      report += `RAPPORT TECHNIQUE D'INCIDENT\n`;
      report += `================================\n\n`;
    } else if (options.reportType === 'reglementaire') {
      report += `RAPPORT RÉGLEMENTAIRE D'INCIDENT\n`;
      report += `================================\n\n`;
    } else {
      report += `RAPPORT COMPLET D'INCIDENT\n`;
      report += `================================\n\n`;
    }
    
    // Informations de base
    report += `Titre: ${incident.incidentTitle || 'Non défini'}\n`;
    report += `ID: ${incident.incidentId || 'Non défini'}\n`;
    report += `Type: ${incident.incidentType || 'Non défini'}\n`;
    report += `Sévérité: ${incident.severity || 'Non définie'}\n`;
    report += `Statut: ${incident.status || 'En cours'}\n`;
    report += `Date de détection: ${incident.detectionDate || 'Non spécifiée'} ${incident.detectionTime || ''}\n`;
    
    if (incident.resolutionDate) {
      report += `Date de résolution: ${incident.resolutionDate} ${incident.resolutionTime || ''}\n`;
    }
    
    report += `\n`;
    
    // Description de l'incident
    report += `DESCRIPTION\n`;
    report += `-----------\n`;
    report += `${incident.attackerActions || 'Aucune description disponible.'}\n\n`;
    
    // Analyse d'impact (conditionnelle)
    if (options.includeImpactAnalysis) {
      report += `ANALYSE D'IMPACT\n`;
      report += `---------------\n`;
      report += `Impact opérationnel: ${incident.impactDescription || 'Non spécifié'}\n\n`;
      
      // Impact sur les données
      if (incident.dataImpactClassification || incident.dataImpactVolume || incident.dataImpactType) {
        report += `Impact sur les données:\n`;
        report += `- Classification: ${incident.dataImpactClassification || 'Non spécifiée'}\n`;
        report += `- Volume: ${incident.dataImpactVolume || 'Non spécifié'}\n`;
        report += `- Type: ${incident.dataImpactType || 'Non spécifié'}\n\n`;
      }
      
      // Impact sur la réputation
      if (incident.reputationImpactVisibility || incident.reputationImpactStakeholders || incident.reputationImpactMediaPotential) {
        report += `Impact sur la réputation:\n`;
        report += `- Visibilité: ${incident.reputationImpactVisibility || 'Non spécifiée'}\n`;
        report += `- Parties prenantes: ${incident.reputationImpactStakeholders || 'Non spécifiées'}\n`;
        report += `- Impact médiatique: ${incident.reputationImpactMediaPotential || 'Non spécifié'}\n\n`;
      }
      
      // Impact financier
      if (incident.financialImpactEstimate || incident.financialImpactType) {
        report += `Impact financier:\n`;
        report += `- Coûts estimés: ${incident.financialImpactEstimate || 'Non spécifiés'}\n`;
        report += `- Type d'impact: ${incident.financialImpactType || 'Non spécifié'}\n\n`;
      }
    }
    
    // Actions de réponse
    report += `ACTIONS DE RÉPONSE\n`;
    report += `------------------\n`;
    report += `Confinement: ${incident.containmentActions || 'Non spécifié'}\n\n`;
    report += `Éradication: ${incident.eradicationActions || 'Non spécifiée'}\n\n`;
    report += `Récupération: ${incident.recoveryActions || 'Non spécifiée'}\n\n`;
    
    // Chronologie (conditionnelle)
    if (options.includeTimeline) {
      report += `CHRONOLOGIE\n`;
      report += `-----------\n`;
      report += `Cette section contiendrait les événements de la chronologie de l'incident.\n\n`;
    }
    
    // Preuves (conditionnelle)
    if (options.includeEvidence) {
      report += `PREUVES\n`;
      report += `-------\n`;
      report += `Cette section contiendrait les preuves collectées lors de l'investigation.\n\n`;
    }
    
    // Tâches (conditionnelle)
    if (options.includeTasks) {
      report += `TÂCHES\n`;
      report += `------\n`;
      report += `Cette section contiendrait les tâches associées à cet incident.\n\n`;
    }
    
    // Actions recommandées (conditionnelle)
    if (options.includeActionItems) {
      report += `RETOUR D'EXPÉRIENCE\n`;
      report += `------------------\n`;
      report += `Leçons apprises: ${incident.lessonsLearned || 'Non spécifiées'}\n\n`;
      report += `Actions recommandées: ${incident.recommendedActions || 'Non spécifiées'}\n\n`;
    }
    
    // Pied de page
    report += `Rapport généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}\n`;
    
    return report;
  };
  
  // Génération du rapport final
  const generateReport = () => {
    switch (reportOptions.format) {
      case 'pdf':
        // Simulation de génération de PDF
        alert('Le rapport a été généré au format PDF et téléchargé');
        break;
      case 'text':
        // Utiliser l'utilitaire d'exportation de texte
        const reportText = generateReportText(incident, reportOptions);
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Rapport-${reportOptions.reportType}-${incident.incidentId || 'incident'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      case 'email':
        // Vérifier si un email a été saisi
        if (!reportOptions.recipientEmail) {
          alert('Veuillez saisir une adresse email');
          return;
        }
        
        // Préparation du corps de l'email
        const reportBody = generateReportText(incident, reportOptions);
        const subject = encodeURIComponent(`Rapport d'incident: ${incident.incidentTitle || 'Sans titre'} (${incident.incidentId || 'ID non défini'})`);
        const body = encodeURIComponent(reportBody);
        
        window.location.href = `mailto:${reportOptions.recipientEmail}?subject=${subject}&body=${body}`;
        break;
      default:
        console.warn('Format de rapport non pris en charge:', reportOptions.format);
    }
    
    // Fermer le générateur de rapport
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Générateur de rapports</h2>
      <p className="text-gray-500 mb-6">
        Incident: {incident?.incidentTitle} ({incident?.incidentId})
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-blue-700">Options du rapport</h3>
          
          {/* Type de rapport */}
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de rapport
            </label>
            <select
              id="reportType"
              name="reportType"
              value={reportOptions.reportType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {reportTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Format de sortie */}
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
              Format de sortie
            </label>
            <select
              id="format"
              name="format"
              value={reportOptions.format}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {formatOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Email (si format email) */}
          {reportOptions.format === 'email' && (
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email du destinataire
              </label>
              <input
                type="email"
                id="recipientEmail"
                name="recipientEmail"
                value={reportOptions.recipientEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="email@exemple.com"
                required
              />
            </div>
          )}
          
          <h3 className="font-semibold text-blue-700 mt-4">Sections à inclure</h3>
          
          {/* Options des sections */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeTimeline"
                name="includeTimeline"
                checked={reportOptions.includeTimeline}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeTimeline" className="ml-2 block text-sm text-gray-700">
                Inclure la chronologie
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeEvidence"
                name="includeEvidence"
                checked={reportOptions.includeEvidence}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeEvidence" className="ml-2 block text-sm text-gray-700">
                Inclure les preuves
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeTasks"
                name="includeTasks"
                checked={reportOptions.includeTasks}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeTasks" className="ml-2 block text-sm text-gray-700">
                Inclure les tâches
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeImpactAnalysis"
                name="includeImpactAnalysis"
                checked={reportOptions.includeImpactAnalysis}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeImpactAnalysis" className="ml-2 block text-sm text-gray-700">
                Inclure l'analyse d'impact
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeActionItems"
                name="includeActionItems"
                checked={reportOptions.includeActionItems}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeActionItems" className="ml-2 block text-sm text-gray-700">
                Inclure les actions recommandées
              </label>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <button
              type="button"
              onClick={generatePreview}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
            >
              Prévisualiser
            </button>
            <button
              type="button"
              onClick={generateReport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Générer le rapport
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 ml-auto"
            >
              Annuler
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Prévisualisation</h3>
          <div className="border rounded-lg bg-gray-50 p-4 h-96 overflow-y-auto font-mono text-xs whitespace-pre-wrap">
            {previewContent ? previewContent : 'Cliquez sur "Prévisualiser" pour voir un aperçu du rapport.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
