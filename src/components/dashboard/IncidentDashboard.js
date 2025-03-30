import React, { useState, useEffect } from 'react';

/**
 * Tableau de bord pour la visualisation des données d'incidents
 * 
 * Ce composant affiche des graphiques et des statistiques sur les incidents.
 */
const IncidentDashboard = () => {
  // État pour les données d'incidents (simulées)
  const [dashboardData, setDashboardData] = useState({
    incidents: [],
    loading: true,
    error: null
  });
  
  // État pour les filtres
  const [filters, setFilters] = useState({
    dateRange: 'month', // 'week', 'month', 'quarter', 'year'
    incidentTypes: [],
    severityLevels: []
  });
  
  // Options des filtres
  const dateRangeOptions = [
    { value: 'week', label: '7 derniers jours' },
    { value: 'month', label: '30 derniers jours' },
    { value: 'quarter', label: '3 derniers mois' },
    { value: 'year', label: '12 derniers mois' }
  ];
  
  const incidentTypeOptions = [
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
  
  const severityLevelOptions = [
    'Critique', 
    'Élevé', 
    'Moyen', 
    'Faible'
  ];
  
  // Charger les données simulées
  useEffect(() => {
    const loadDashboardData = () => {
      // Simuler un appel API
      setTimeout(() => {
        try {
          // Générer des données fictives pour le tableau de bord
          const mockIncidents = generateMockIncidents();
          setDashboardData({
            incidents: mockIncidents,
            loading: false,
            error: null
          });
        } catch (err) {
          setDashboardData({
            incidents: [],
            loading: false,
            error: 'Erreur lors du chargement des données du tableau de bord'
          });
        }
      }, 800);
    };
    
    loadDashboardData();
  }, [filters]); // Recharger quand les filtres changent
  
  // Générer des incidents fictifs
  const generateMockIncidents = () => {
    const incidents = [];
    const now = new Date();
    const incidentTypes = incidentTypeOptions;
    const severityLevels = severityLevelOptions;
    const statusOptions = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];
    
    // Déterminer le nombre de jours à couvrir selon le filtre
    let daysToGoBack = 30;
    switch (filters.dateRange) {
      case 'week':
        daysToGoBack = 7;
        break;
      case 'month':
        daysToGoBack = 30;
        break;
      case 'quarter':
        daysToGoBack = 90;
        break;
      case 'year':
        daysToGoBack = 365;
        break;
      default:
        daysToGoBack = 30;
    }
    
    // Générer quelques incidents aléatoires
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * daysToGoBack);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
      const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      // Simuler la durée de résolution
      const resolutionDays = Math.floor(Math.random() * 14) + 1; // 1-14 jours
      const resolutionDate = new Date(date);
      resolutionDate.setDate(resolutionDate.getDate() + resolutionDays);
      
      // Ne pas avoir de résolution pour les incidents en cours
      const hasResolution = status === 'Résolu' || status === 'Fermé';
      
      incidents.push({
        id: `IR-2025-${1000 + i}`,
        title: `Incident ${type} ${i + 1}`,
        type,
        severity,
        status,
        detectionDate: date.toISOString().split('T')[0],
        resolutionDate: hasResolution ? resolutionDate.toISOString().split('T')[0] : null,
        resolutionTime: hasResolution ? resolutionDays : null,
        // Ajouter quelques métriques aléatoires
        affectedSystems: Math.floor(Math.random() * 10) + 1,
        taskCount: Math.floor(Math.random() * 20) + 1,
        evidenceCount: Math.floor(Math.random() * 15)
      });
    }
    
    return incidents;
  };
  
  // Gérer les changements de filtre
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gérer les filtres à choix multiples (cases à cocher)
  const handleMultiFilterChange = (name, value) => {
    setFilters(prev => {
      const currentValues = [...prev[name]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        // Ajouter la valeur
        return {
          ...prev,
          [name]: [...currentValues, value]
        };
      } else {
        // Supprimer la valeur
        currentValues.splice(index, 1);
        return {
          ...prev,
          [name]: currentValues
        };
      }
    });
  };
  
  // Calculer les métriques clés
  const calculateMetrics = (incidents) => {
    if (!incidents.length) return {};
    
    // Appliquer les filtres
    let filteredIncidents = [...incidents];
    
    // Filtrer par type d'incident
    if (filters.incidentTypes.length > 0) {
      filteredIncidents = filteredIncidents.filter(incident => 
        filters.incidentTypes.includes(incident.type)
      );
    }
    
    // Filtrer par niveau de sévérité
    if (filters.severityLevels.length > 0) {
      filteredIncidents = filteredIncidents.filter(incident => 
        filters.severityLevels.includes(incident.severity)
      );
    }
    
    // Nombre d'incidents par statut
    const incidentsByStatus = filteredIncidents.reduce((acc, incident) => {
      acc[incident.status] = (acc[incident.status] || 0) + 1;
      return acc;
    }, {});
    
    // Nombre d'incidents par type
    const incidentsByType = filteredIncidents.reduce((acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1;
      return acc;
    }, {});
    
    // Nombre d'incidents par sévérité
    const incidentsBySeverity = filteredIncidents.reduce((acc, incident) => {
      acc[incident.severity] = (acc[incident.severity] || 0) + 1;
      return acc;
    }, {});
    
    // Calcul du temps moyen de résolution (pour les incidents résolus)
    const resolvedIncidents = filteredIncidents.filter(incident => incident.resolutionTime);
    const avgResolutionTime = resolvedIncidents.length
      ? resolvedIncidents.reduce((sum, incident) => sum + incident.resolutionTime, 0) / resolvedIncidents.length
      : 0;
    
    // Tendances (incidents par jour sur la période)
    const incidentsByDay = filteredIncidents.reduce((acc, incident) => {
      const date = incident.detectionDate;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    // Convertir les objets en tableaux pour les graphiques
    const statusData = Object.entries(incidentsByStatus).map(([status, count]) => ({
      name: status,
      value: count
    }));
    
    const typeData = Object.entries(incidentsByType).map(([type, count]) => ({
      name: type,
      value: count
    }));
    
    const severityData = Object.entries(incidentsBySeverity).map(([severity, count]) => ({
      name: severity,
      value: count
    }));
    
    // Préparer les données pour le graphique de tendance
    const trendData = Object.entries(incidentsByDay).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      totalIncidents: filteredIncidents.length,
      openIncidents: filteredIncidents.filter(i => i.status !== 'Résolu' && i.status !== 'Fermé').length,
      resolvedIncidents: filteredIncidents.filter(i => i.status === 'Résolu' || i.status === 'Fermé').length,
      criticalIncidents: filteredIncidents.filter(i => i.severity === 'Critique').length,
      avgResolutionTime,
      statusData,
      typeData,
      severityData,
      trendData
    };
  };
  
  // Calculer les métriques à partir des incidents filtrés
  const metrics = calculateMetrics(dashboardData.incidents);
  
  // Formatage du temps moyen de résolution
  const formatResolutionTime = (days) => {
    if (!days) return 'N/A';
    return days.toFixed(1) + ' jours';
  };
  
  // Affichage des tendances (simulation de graphique)
  const renderTrendChart = () => {
    if (!metrics.trendData || metrics.trendData.length === 0) {
      return <div className="text-center text-gray-500 py-8">Aucune donnée disponible</div>;
    }
    
    // Une représentation simple en ASCII des tendances
    // Dans une vraie application, utilisez une bibliothèque comme Recharts ou Chart.js
    const maxCount = Math.max(...metrics.trendData.map(item => item.count));
    const height = 10; // hauteur du graphique en "lignes"
    
    return (
      <div className="font-mono text-xs leading-none mt-4">
        {/* Axe Y et barres */}
        <div className="flex">
          <div className="text-right pr-2 text-gray-500">
            {Array.from({ length: height + 1 }).map((_, i) => (
              <div key={i} className="h-6">{Math.round((height - i) * maxCount / height)}</div>
            ))}
          </div>
          <div className="flex-1">
            <div className="flex items-end h-60 space-x-1">
              {metrics.trendData.map((item, index) => {
                const barHeight = Math.max(1, Math.round(item.count * 60 / maxCount));
                return (
                  <div 
                    key={index}
                    className="bg-blue-500 w-4 rounded-t transition-all duration-300"
                    style={{ height: `${barHeight}px` }}
                    title={`${item.date}: ${item.count} incidents`}
                  ></div>
                );
              })}
            </div>
            {/* Axe X */}
            <div className="flex justify-between text-gray-500 mt-2">
              <span>{metrics.trendData[0]?.date}</span>
              <span>{metrics.trendData[metrics.trendData.length - 1]?.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Rendu du composant
  if (dashboardData.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (dashboardData.error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{dashboardData.error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Tableau de bord des incidents</h2>
      
      {/* Filtres */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-700 mb-2">Filtres</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
              Période
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Types d'incidents
            </label>
            <div className="max-h-32 overflow-y-auto p-2 border border-gray-300 rounded">
              {incidentTypeOptions.map(type => (
                <div key={type} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={filters.incidentTypes.includes(type)}
                    onChange={() => handleMultiFilterChange('incidentTypes', type)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`type-${type}`} className="ml-2 block text-sm text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sévérité
            </label>
            <div className="max-h-32 overflow-y-auto p-2 border border-gray-300 rounded">
              {severityLevelOptions.map(severity => (
                <div key={severity} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`severity-${severity}`}
                    checked={filters.severityLevels.includes(severity)}
                    onChange={() => handleMultiFilterChange('severityLevels', severity)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`severity-${severity}`} className="ml-2 block text-sm text-gray-700">
                    {severity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Total des incidents</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.totalIncidents}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">Incidents en cours</h3>
          <p className="text-3xl font-bold text-yellow-600">{metrics.openIncidents}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm font-medium text-green-800 mb-1">Incidents résolus</h3>
          <p className="text-3xl font-bold text-green-600">{metrics.resolvedIncidents}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-red-800 mb-1">Incidents critiques</h3>
          <p className="text-3xl font-bold text-red-600">{metrics.criticalIncidents}</p>
        </div>
      </div>
      
      {/* Temps moyen de résolution */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
        <h3 className="text-sm font-medium text-indigo-800 mb-1">Temps moyen de résolution</h3>
        <p className="text-3xl font-bold text-indigo-600">{formatResolutionTime(metrics.avgResolutionTime)}</p>
      </div>
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-blue-700 mb-2">Incidents par statut</h3>
          <div className="flex flex-wrap">
            {metrics.statusData?.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 p-2">
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-2 ${
                      item.name === 'Nouveau' ? 'bg-purple-500' :
                      item.name === 'En cours' ? 'bg-blue-500' :
                      item.name === 'En attente' ? 'bg-yellow-500' :
                      item.name === 'Résolu' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                  <span className="ml-auto font-semibold">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-blue-700 mb-2">Incidents par sévérité</h3>
          <div className="flex flex-wrap">
            {metrics.severityData?.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 p-2">
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-2 ${
                      item.name === 'Critique' ? 'bg-red-500' :
                      item.name === 'Élevé' ? 'bg-orange-500' :
                      item.name === 'Moyen' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                  <span className="ml-auto font-semibold">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tendances */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-blue-700 mb-2">Tendance des incidents ({filters.dateRange})</h3>
        {renderTrendChart()}
      </div>
      
      {/* Détail par type d'incident */}
      <div className="mt-6">
        <h3 className="font-semibold text-blue-700 mb-2">Répartition par type d'incident</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type d'incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pourcentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.typeData?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(item.value / metrics.totalIncidents * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentDashboard;
