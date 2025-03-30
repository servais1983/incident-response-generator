import React, { useState } from 'react';

const IncidentResponseGenerator = () => {
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
    recommendedActions: ''
  });
  
  const [showReport, setShowReport] = useState(false);
  
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const fillWithExample = () => {
    setIncidentData({
      incidentTitle: 'Incident Ransomware sur serveur de fichiers',
      incidentId: 'IR-2025-042',
      detectionDate: '2025-03-25',
      detectionTime: '14:30',
      incidentType: 'Ransomware',
      severity: 'Critique',
      detectionMethod: 'Alerte SIEM et signalement utilisateur',
      affectedSystems: 'Serveur de fichiers FS001, postes de travail (5)',
      initialVector: 'Email de phishing avec document Office malveillant',
      attackerActions: 'Exécution de macro, élévation de privilèges, déploiement de ransomware',
      impactDescription: 'Chiffrement de 250 Go de données, perturbation pendant 48h',
      containmentActions: 'Isolation réseau, blocage des IP malveillantes',
      eradicationActions: 'Reconstruction des systèmes, correctifs déployés',
      recoveryActions: 'Restauration depuis les sauvegardes de J-1',
      lessonsLearned: 'Améliorer le processus de gestion des correctifs',
      recommendedActions: 'Formation anti-phishing, meilleure segmentation réseau'
    });
  };
  
  const generateReport = (e) => {
    e.preventDefault();
    setShowReport(true);
  };
  
  const newReport = () => {
    setShowReport(false);
    window.scrollTo(0, 0);
  };

  const downloadReport = () => {
    const reportElement = document.getElementById('incident-report');
    const reportText = reportElement.innerText;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapport-Incident-${incidentData.incidentId || 'nouveau'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Générateur de Rapport d'Incident de Sécurité</h1>
      
      {!showReport ? (
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-end">
            <button
              onClick={fillWithExample}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Remplir avec exemple
            </button>
          </div>
          
          <form onSubmit={generateReport} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-700">Informations Générales</h2>
                
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
                <h2 className="text-xl font-semibold text-blue-700">Détails de l'Incident</h2>
                
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
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Actions de Réponse</h2>
              
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            
            <div className="text-center">
              <button 
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Générer le Rapport
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div id="incident-report" className="mb-6 whitespace-pre-line">
            <h1 className="text-xl font-bold text-center mb-4">RAPPORT D'INCIDENT DE SÉCURITÉ</h1>
            <h2 className="text-lg font-bold mb-3">{incidentData.incidentTitle}</h2>
            
            <div className="mb-4">
              <p><strong>ID de l'incident:</strong> {incidentData.incidentId}</p>
              <p><strong>Date de détection:</strong> {incidentData.detectionDate} {incidentData.detectionTime}</p>
              <p><strong>Date de résolution:</strong> {incidentData.resolutionDate} {incidentData.resolutionTime}</p>
              <p><strong>Type d'incident:</strong> {incidentData.incidentType}</p>
              <p><strong>Sévérité:</strong> {incidentData.severity}</p>
              <p><strong>Méthode de détection:</strong> {incidentData.detectionMethod}</p>
              <p><strong>Systèmes affectés:</strong> {incidentData.affectedSystems}</p>
            </div>
            
            <h3 className="font-bold mt-4">DESCRIPTION DE L'INCIDENT</h3>
            <p><strong>Vecteur initial:</strong> {incidentData.initialVector}</p>
            <p><strong>Actions de l'attaquant:</strong></p>
            <p>{incidentData.attackerActions}</p>
            <p><strong>Impact:</strong></p>
            <p>{incidentData.impactDescription}</p>
            
            <h3 className="font-bold mt-4">ACTIONS DE RÉPONSE</h3>
            <p><strong>Confinement:</strong></p>
            <p>{incidentData.containmentActions}</p>
            <p><strong>Éradication:</strong></p>
            <p>{incidentData.eradicationActions}</p>
            <p><strong>Récupération:</strong></p>
            <p>{incidentData.recoveryActions}</p>
            
            <h3 className="font-bold mt-4">RETOUR D'EXPÉRIENCE</h3>
            <p><strong>Leçons apprises:</strong></p>
            <p>{incidentData.lessonsLearned}</p>
            <p><strong>Actions recommandées:</strong></p>
            <p>{incidentData.recommendedActions}</p>
            
            <p className="text-sm text-gray-500 mt-6">Rapport généré le {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()}</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={newReport}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Nouveau Rapport
            </button>
            <button
              onClick={downloadReport}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Télécharger (.txt)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentResponseGenerator;