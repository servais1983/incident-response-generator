import React, { useState } from 'react';

const IncidentDetailScreen = ({ incident, onStatusChange, onDelete, onShare }) => {
  // État local pour les dialogues
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newStatus, setNewStatus] = useState(incident?.status || 'En cours');
  const [statusNote, setStatusNote] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Options de statut
  const statusOptions = [
    'Nouveau', 
    'En cours', 
    'En attente', 
    'Résolu', 
    'Fermé'
  ];

  // Fonction pour gérer le changement de statut
  const handleStatusChange = () => {
    onStatusChange(incident.id, newStatus, statusNote);
    setShowStatusDialog(false);
  };

  // Fonction pour gérer la suppression
  const handleDelete = () => {
    onDelete(incident.id);
    setShowDeleteDialog(false);
  };

  // Fonction pour le partage/export
  const handleExport = (format) => {
    onShare(incident, format);
  };

  // Rendu des onglets et gestion de l'affichage actif
  const renderTab = (tab) => {
    switch(tab) {
      case 'general':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID de l'incident</p>
                <p className="font-medium">{incident?.incidentId || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type d'incident</p>
                <p className="font-medium">{incident?.incidentType || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de détection</p>
                <p className="font-medium">{incident?.detectionDate || '-'} {incident?.detectionTime || ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de résolution</p>
                <p className="font-medium">{incident?.resolutionDate || '-'} {incident?.resolutionTime || ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Méthode de détection</p>
                <p className="font-medium">{incident?.detectionMethod || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Systèmes affectés</p>
                <p className="font-medium">{incident?.affectedSystems || '-'}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6">Description de l'incident</h3>
            <p>{incident?.attackerActions || 'Aucune description disponible.'}</p>
          </div>
        );
      
      case 'impact':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Évaluation d'impact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Impact opérationnel</h4>
                <p>{incident?.impactDescription || 'Aucune information disponible.'}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Impact sur les données</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Classification des données</p>
                  <p className="font-medium">{incident?.dataImpactClassification || 'Non spécifié'}</p>
                  
                  <p className="text-sm text-gray-500">Volume de données affectées</p>
                  <p className="font-medium">{incident?.dataImpactVolume || 'Non spécifié'}</p>
                  
                  <p className="text-sm text-gray-500">Type de compromission</p>
                  <p className="font-medium">{incident?.dataImpactType || 'Non spécifié'}</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Impact sur la réputation</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Visibilité externe</p>
                  <p className="font-medium">{incident?.reputationImpactVisibility || 'Non spécifié'}</p>
                  
                  <p className="text-sm text-gray-500">Parties prenantes affectées</p>
                  <p className="font-medium">{incident?.reputationImpactStakeholders || 'Non spécifié'}</p>
                  
                  <p className="text-sm text-gray-500">Impact médiatique potentiel</p>
                  <p className="font-medium">{incident?.reputationImpactMediaPotential || 'Non spécifié'}</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Impact financier</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Coûts estimés</p>
                  <p className="font-medium">{incident?.financialImpactEstimate || 'Non spécifié'}</p>
                  
                  <p className="text-sm text-gray-500">Type d'impact</p>
                  <p className="font-medium">{incident?.financialImpactType || 'Non spécifié'}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'response':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Actions de réponse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Confinement</h4>
                <p>{incident?.containmentActions || 'Aucune action documentée.'}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Éradication</h4>
                <p>{incident?.eradicationActions || 'Aucune action documentée.'}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Récupération</h4>
                <p>{incident?.recoveryActions || 'Aucune action documentée.'}</p>
              </div>
            </div>
          </div>
        );
        
      case 'lessons':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Retour d'expérience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Leçons apprises</h4>
                <p>{incident?.lessonsLearned || 'Aucune leçon documentée.'}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-700 mb-2">Actions recommandées</h4>
                <p>{incident?.recommendedActions || 'Aucune recommandation documentée.'}</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Sélectionnez un onglet pour voir les détails</div>;
    }
  };

  if (!incident) {
    return <div className="text-center p-8">Incident non trouvé</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* En-tête avec titre et statut */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-blue-800">{incident.incidentTitle}</h2>
            <p className="text-gray-500">{incident.incidentId}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                incident.severity === 'Critique' ? 'bg-red-100 text-red-800' :
                incident.severity === 'Élevé' ? 'bg-orange-100 text-orange-800' :
                incident.severity === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {incident.severity || 'Non défini'}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                {incident.status || 'En cours'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barre d'actions */}
      <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
        <button 
          onClick={() => setShowStatusDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
        >
          <span className="material-icons text-sm">update</span>
          Changer le statut
        </button>
        
        <button 
          onClick={() => handleExport('pdf')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1"
        >
          <span className="material-icons text-sm">download</span>
          Exporter PDF
        </button>
        
        <button 
          onClick={() => handleExport('text')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition flex items-center gap-1"
        >
          <span className="material-icons text-sm">text_snippet</span>
          Exporter Texte
        </button>
        
        <button 
          onClick={() => setShowDeleteDialog(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1 ml-auto"
        >
          <span className="material-icons text-sm">delete</span>
          Supprimer
        </button>
      </div>
      
      {/* Onglets de navigation */}
      <div className="border-b">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Informations générales
          </button>
          <button 
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'impact' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Évaluation d'impact
          </button>
          <button 
            onClick={() => setActiveTab('response')}
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'response' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Actions de réponse
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'lessons' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Retour d'expérience
          </button>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="p-6">
        {renderTab(activeTab)}
      </div>
      
      {/* Dialogue de changement de statut */}
      {showStatusDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Changer le statut de l'incident</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau statut</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optionnel)</label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Ajoutez une note expliquant ce changement de statut..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowStatusDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleStatusChange}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dialogue de confirmation de suppression */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Supprimer l'incident</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer cet incident ? Cette action est irréversible et toutes les données associées à cet incident seront perdues.
              </p>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentDetailScreen;
