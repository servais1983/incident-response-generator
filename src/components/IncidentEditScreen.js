import React, { useState, useEffect } from 'react';

/**
 * Formulaire de modification des incidents
 * 
 * Ce composant permet d'éditer les informations d'un incident existant.
 */
const IncidentEditScreen = ({ incident, onSave, onCancel }) => {
  // État initial du formulaire
  const [incidentData, setIncidentData] = useState({
    incidentTitle: '',
    incidentId: '',
    detectionDate: '',
    detectionTime: '',
    resolutionDate: '',
    resolutionTime: '',
    detectionMethod: '',
    affectedSystems: '',
    incidentType: 'Malware',
    severity: 'Moyen',
    initialVector: '',
    attackerActions: '',
    impactDescription: '',
    containmentActions: '',
    eradicationActions: '',
    recoveryActions: '',
    lessonsLearned: '',
    recommendedActions: '',
    
    // Sections d'impact supplémentaires
    dataImpactClassification: '',
    dataImpactVolume: '',
    dataImpactType: '',
    reputationImpactVisibility: '',
    reputationImpactStakeholders: '',
    reputationImpactMediaPotential: '',
    financialImpactEstimate: '',
    financialImpactType: ''
  });
  
  // Remplir le formulaire avec les données de l'incident
  useEffect(() => {
    if (incident) {
      setIncidentData({
        ...incidentData,
        ...incident
      });
    }
  }, [incident]);
  
  // Options pour les champs de sélection
  const incidentTypes = [
    'Malware', 
    'Phishing', 
    'DDoS', 
    'Intrusion', 
    'Fuite de données', 
    'Accès non autorisé',
    'Ransomware',
    'Compromission de compte',
    'Autre'
  ];
  
  const severityLevels = ['Critique', 'Élevé', 'Moyen', 'Faible'];
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ajouter un timestamp de mise à jour
    const updatedIncident = {
      ...incidentData,
      updatedAt: new Date().toISOString()
    };
    
    // Dans une vraie application, ce serait un appel API
    console.log('Incident mis à jour:', updatedIncident);
    
    // Notifier le succès
    if (onSave) {
      onSave(updatedIncident);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Modifier l'incident</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Informations Générales</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'incident</label>
              <input
                type="text"
                name="incidentTitle"
                value={incidentData.incidentTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID de l'incident</label>
              <input
                type="text"
                name="incidentId"
                value={incidentData.incidentId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="IR-2025-001"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de détection</label>
                <input
                  type="date"
                  name="detectionDate"
                  value={incidentData.detectionDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <input
                  type="time"
                  name="detectionTime"
                  value={incidentData.detectionTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de résolution</label>
                <input
                  type="date"
                  name="resolutionDate"
                  value={incidentData.resolutionDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <input
                  type="time"
                  name="resolutionTime"
                  value={incidentData.resolutionTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de détection</label>
              <input
                type="text"
                name="detectionMethod"
                value={incidentData.detectionMethod}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="SIEM, SOC, Alerte utilisateur..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Systèmes affectés</label>
              <input
                type="text"
                name="affectedSystems"
                value={incidentData.affectedSystems}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Serveurs, réseaux, applications..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'incident</label>
                <select
                  name="incidentType"
                  value={incidentData.incidentType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {incidentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sévérité</label>
                <select
                  name="severity"
                  value={incidentData.severity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {severityLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Détails de l'Incident</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vecteur initial</label>
              <input
                type="text"
                name="initialVector"
                value={incidentData.initialVector}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email de phishing, exploit de vulnérabilité..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Actions de l'attaquant</label>
              <textarea
                name="attackerActions"
                value={incidentData.attackerActions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="Détails des actions malveillantes observées..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
              <textarea
                name="impactDescription"
                value={incidentData.impactDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="Impact sur les opérations, données, utilisateurs..."
              ></textarea>
            </div>
            
            <h4 className="font-medium text-blue-600 mt-4">Impact sur les données</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
                <input
                  type="text"
                  name="dataImpactClassification"
                  value={incidentData.dataImpactClassification}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                <input
                  type="text"
                  name="dataImpactVolume"
                  value={incidentData.dataImpactVolume}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text"
                  name="dataImpactType"
                  value={incidentData.dataImpactType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <h4 className="font-medium text-blue-600 mt-4">Impact sur la réputation</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visibilité</label>
                <input
                  type="text"
                  name="reputationImpactVisibility"
                  value={incidentData.reputationImpactVisibility}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parties prenantes</label>
                <input
                  type="text"
                  name="reputationImpactStakeholders"
                  value={incidentData.reputationImpactStakeholders}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact média</label>
                <input
                  type="text"
                  name="reputationImpactMediaPotential"
                  value={incidentData.reputationImpactMediaPotential}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <h4 className="font-medium text-blue-600 mt-4">Impact financier</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coûts estimés</label>
                <input
                  type="text"
                  name="financialImpactEstimate"
                  value={incidentData.financialImpactEstimate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'impact</label>
                <input
                  type="text"
                  name="financialImpactType"
                  value={incidentData.financialImpactType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">Actions de Réponse</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confinement</label>
              <textarea
                name="containmentActions"
                value={incidentData.containmentActions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
                placeholder="Actions prises pour limiter l'impact..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Éradication</label>
              <textarea
                name="eradicationActions"
                value={incidentData.eradicationActions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
                placeholder="Actions pour éliminer la menace..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Récupération</label>
              <textarea
                name="recoveryActions"
                value={incidentData.recoveryActions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
                placeholder="Actions pour restaurer les systèmes..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leçons apprises</label>
            <textarea
              name="lessonsLearned"
              value={incidentData.lessonsLearned}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-32"
              placeholder="Ce qui a bien fonctionné et ce qui pourrait être amélioré..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actions recommandées</label>
            <textarea
              name="recommendedActions"
              value={incidentData.recommendedActions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-32"
              placeholder="Mesures à prendre pour éviter des incidents similaires..."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentEditScreen;
