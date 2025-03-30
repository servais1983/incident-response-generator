import React, { useState, useEffect } from 'react';

/**
 * Métriques de performance pour l'analyse de la réponse aux incidents
 * 
 * Ce composant affiche des indicateurs clés de performance (KPI) pour
 * évaluer l'efficacité de l'équipe de réponse aux incidents.
 */
const PerformanceMetrics = () => {
  // État pour les données (simulées)
  const [metricsData, setMetricsData] = useState({
    loading: true,
    error: null,
    metrics: null
  });
  
  // État pour les filtres
  const [filters, setFilters] = useState({
    period: 'month',
    team: 'all'
  });
  
  // Options pour les filtres
  const periodOptions = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' }
  ];
  
  const teamOptions = [
    { value: 'all', label: 'Toutes les équipes' },
    { value: 'soc', label: 'Équipe SOC' },
    { value: 'incident', label: 'Équipe de réponse' },
    { value: 'forensic', label: 'Équipe forensique' }
  ];
  
  // Charger les données simulées
  useEffect(() => {
    const loadMetricsData = () => {
      // Simuler un appel API
      setTimeout(() => {
        try {
          // Générer des métriques fictives
          const mockMetrics = generateMockMetrics(filters);
          setMetricsData({
            loading: false,
            error: null,
            metrics: mockMetrics
          });
        } catch (err) {
          setMetricsData({
            loading: false,
            error: 'Erreur lors du chargement des métriques de performance',
            metrics: null
          });
        }
      }, 800);
    };
    
    loadMetricsData();
  }, [filters]);
  
  // Générer des métriques fictives
  const generateMockMetrics = (filters) => {
    // Simuler des variations selon les filtres
    const baseMetrics = {
      // Temps de réponse (en minutes)
      meanTimeToDetect: 180 + Math.floor(Math.random() * 120),
      meanTimeToRespond: 45 + Math.floor(Math.random() * 30),
      meanTimeToResolve: 1440 + Math.floor(Math.random() * 720), // en minutes (1-2 jours)
      
      // Efficacité
      incidentResolutionRate: 85 + Math.floor(Math.random() * 15),
      falsePositiveRate: 12 + Math.floor(Math.random() * 8),
      reopenedIncidentRate: 5 + Math.floor(Math.random() * 5),
      
      // Conformité
      slaComplianceRate: 92 + Math.floor(Math.random() * 8),
      documentationCompleteness: 88 + Math.floor(Math.random() * 12),
      reportingTimeCompliance: 90 + Math.floor(Math.random() * 10),
      
      // Activité
      incidentsHandled: 42 + Math.floor(Math.random() * 20),
      tasksCompleted: 186 + Math.floor(Math.random() * 50),
      investigationsPerformed: 37 + Math.floor(Math.random() * 15),
      
      // Impact
      dataBreach: 3 + Math.floor(Math.random() * 3),
      serviceDowntime: 240 + Math.floor(Math.random() * 180), // en minutes
      preventedIncidents: 12 + Math.floor(Math.random() * 8),
      
      // Comparaison avec période précédente
      responseTimeChange: -5 + Math.floor(Math.random() * 10),
      resolutionRateChange: 2 + Math.floor(Math.random() * 5),
      incidentVolumeChange: 8 + Math.floor(Math.random() * 15)
    };
    
    // Appliquer des modifications selon la période
    let periodFactor = 1;
    switch (filters.period) {
      case 'week':
        periodFactor = 0.25;
        break;
      case 'month':
        periodFactor = 1;
        break;
      case 'quarter':
        periodFactor = 3;
        break;
      case 'year':
        periodFactor = 12;
        break;
      default:
        periodFactor = 1;
    }
    
    // Appliquer des modifications selon l'équipe
    let teamAdjustment = {
      meanTimeToRespond: 0,
      meanTimeToResolve: 0,
      incidentResolutionRate: 0,
      slaComplianceRate: 0
    };
    
    switch (filters.team) {
      case 'soc':
        teamAdjustment = {
          meanTimeToRespond: -10, // Plus rapide
          meanTimeToResolve: 120, // Plus lent
          incidentResolutionRate: -5,
          slaComplianceRate: 2
        };
        break;
      case 'incident':
        teamAdjustment = {
          meanTimeToRespond: 5,
          meanTimeToResolve: -180, // Plus rapide
          incidentResolutionRate: 5,
          slaComplianceRate: 3
        };
        break;
      case 'forensic':
        teamAdjustment = {
          meanTimeToRespond: 15, // Plus lent
          meanTimeToResolve: 240, // Plus lent mais plus approfondi
          incidentResolutionRate: 8, // Meilleur taux
          slaComplianceRate: -4
        };
        break;
      default:
        // Aucun ajustement pour "all"
        break;
    }
    
    // Ajuster les métriques
    const adjustedMetrics = {
      ...baseMetrics,
      incidentsHandled: Math.round(baseMetrics.incidentsHandled * periodFactor),
      tasksCompleted: Math.round(baseMetrics.tasksCompleted * periodFactor),
      investigationsPerformed: Math.round(baseMetrics.investigationsPerformed * periodFactor),
      meanTimeToRespond: baseMetrics.meanTimeToRespond + teamAdjustment.meanTimeToRespond,
      meanTimeToResolve: baseMetrics.meanTimeToResolve + teamAdjustment.meanTimeToResolve,
      incidentResolutionRate: Math.min(100, Math.max(0, baseMetrics.incidentResolutionRate + teamAdjustment.incidentResolutionRate)),
      slaComplianceRate: Math.min(100, Math.max(0, baseMetrics.slaComplianceRate + teamAdjustment.slaComplianceRate))
    };
    
    return adjustedMetrics;
  };
  
  // Gérer les changements de filtre
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Formatage du temps (minutes vers heures/jours)
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h${mins ? ` ${mins}min` : ''}`;
    } else {
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      return `${days}j${hours ? ` ${hours}h` : ''}`;
    }
  };
  
  // Formatage du pourcentage avec indicateur de tendance
  const formatPercentageWithTrend = (value, change) => {
    const trend = change > 0
      ? <span className="text-green-600 ml-1">↑ {change}%</span>
      : change < 0
        ? <span className="text-red-600 ml-1">↓ {Math.abs(change)}%</span>
        : <span className="text-gray-600 ml-1">→ 0%</span>;
        
    return (
      <div className="flex items-center">
        <span>{value}%</span>
        {trend}
      </div>
    );
  };
  
  // Calcul du score de santé global (0-100)
  const calculateHealthScore = (metrics) => {
    if (!metrics) return 0;
    
    // Pondération des métriques
    const weights = {
      meanTimeToRespond: 0.15,
      meanTimeToResolve: 0.15,
      incidentResolutionRate: 0.2,
      slaComplianceRate: 0.1,
      reopenedIncidentRate: 0.1,
      falsePositiveRate: 0.05,
      documentationCompleteness: 0.1,
      serviceDowntime: 0.15
    };
    
    // Normaliser les valeurs (0-100, où 100 est meilleur)
    const normalizedValues = {
      meanTimeToRespond: Math.max(0, 100 - (metrics.meanTimeToRespond / 2)), // 0min=100, 200min=0
      meanTimeToResolve: Math.max(0, 100 - (metrics.meanTimeToResolve / 60)), // 0h=100, 60h=0
      incidentResolutionRate: metrics.incidentResolutionRate, // déjà en %
      slaComplianceRate: metrics.slaComplianceRate, // déjà en %
      reopenedIncidentRate: 100 - metrics.reopenedIncidentRate, // inversé
      falsePositiveRate: 100 - metrics.falsePositiveRate, // inversé
      documentationCompleteness: metrics.documentationCompleteness, // déjà en %
      serviceDowntime: Math.max(0, 100 - (metrics.serviceDowntime / 24)) // 0min=100, 2400min=0
    };
    
    // Calculer le score pondéré
    let score = 0;
    for (const [key, weight] of Object.entries(weights)) {
      score += normalizedValues[key] * weight;
    }
    
    return Math.round(score);
  };
  
  // Déterminer la couleur du score de santé
  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Rendu du composant
  if (metricsData.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (metricsData.error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{metricsData.error}</p>
      </div>
    );
  }
  
  const metrics = metricsData.metrics;
  const healthScore = calculateHealthScore(metrics);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Métriques de performance</h2>
      
      {/* Filtres */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
              Période
            </label>
            <select
              id="period"
              name="period"
              value={filters.period}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
              Équipe
            </label>
            <select
              id="team"
              name="team"
              value={filters.team}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {teamOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Score de santé global */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-700">Score de santé global</h3>
          <p className="text-gray-500 text-sm">Évaluation combinée de toutes les métriques</p>
        </div>
        <div className="text-4xl font-bold mr-2 ml-4">
          <span className={getHealthScoreColor(healthScore)}>{healthScore}</span>
        </div>
        <div className="w-16 h-16 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={healthScore >= 80 ? '#10b981' : healthScore >= 60 ? '#f59e0b' : '#ef4444'} 
              strokeWidth="10" 
              strokeDasharray={`${healthScore * 2.83} 283`} 
              strokeDashoffset="-70.75" 
              transform="rotate(-90, 50, 50)" 
            />
          </svg>
        </div>
      </div>
      
      {/* Métriques par catégorie */}
      <div className="space-y-6">
        {/* Temps de réponse */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Temps de réponse</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Temps moyen de détection</h4>
              <p className="text-2xl font-bold">{formatTime(metrics.meanTimeToDetect)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Temps moyen de réponse</h4>
              <p className="text-2xl font-bold">{formatTime(metrics.meanTimeToRespond)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {metrics.responseTimeChange > 0 
                  ? <span className="text-red-500">+{metrics.responseTimeChange}% vs période précédente</span>
                  : <span className="text-green-500">{metrics.responseTimeChange}% vs période précédente</span>
                }
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Temps moyen de résolution</h4>
              <p className="text-2xl font-bold">{formatTime(metrics.meanTimeToResolve)}</p>
            </div>
          </div>
        </div>
        
        {/* Efficacité */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Efficacité</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Taux de résolution</h4>
              <div className="text-2xl font-bold">
                {formatPercentageWithTrend(metrics.incidentResolutionRate, metrics.resolutionRateChange)}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Taux de faux positifs</h4>
              <p className="text-2xl font-bold">{metrics.falsePositiveRate}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Taux de réouverture</h4>
              <p className="text-2xl font-bold">{metrics.reopenedIncidentRate}%</p>
            </div>
          </div>
        </div>
        
        {/* Conformité */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Conformité</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Respect des SLA</h4>
              <p className="text-2xl font-bold">{metrics.slaComplianceRate}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Complétude de la documentation</h4>
              <p className="text-2xl font-bold">{metrics.documentationCompleteness}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Respect des délais de reporting</h4>
              <p className="text-2xl font-bold">{metrics.reportingTimeCompliance}%</p>
            </div>
          </div>
        </div>
        
        {/* Volume */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Volume d'activité</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Incidents traités</h4>
              <p className="text-2xl font-bold">{metrics.incidentsHandled}</p>
              <p className="text-sm text-gray-500 mt-1">
                {metrics.incidentVolumeChange > 0 
                  ? <span className="text-red-500">+{metrics.incidentVolumeChange}% vs période précédente</span>
                  : <span className="text-green-500">{metrics.incidentVolumeChange}% vs période précédente</span>
                }
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Tâches complétées</h4>
              <p className="text-2xl font-bold">{metrics.tasksCompleted}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Investigations effectuées</h4>
              <p className="text-2xl font-bold">{metrics.investigationsPerformed}</p>
            </div>
          </div>
        </div>
        
        {/* Impact */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Fuites de données</h4>
              <p className="text-2xl font-bold">{metrics.dataBreach}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Temps d'indisponibilité</h4>
              <p className="text-2xl font-bold">{formatTime(metrics.serviceDowntime)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-500">Incidents prévenus</h4>
              <p className="text-2xl font-bold">{metrics.preventedIncidents}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Note explicative */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-700 mb-2">À propos de ces métriques</h3>
        <p className="text-sm text-blue-800">
          Ces indicateurs de performance sont calculés à partir des données d'incidents et permettent d'évaluer l'efficacité des processus de réponse aux incidents.
          Les tendances sont calculées par rapport à la période précédente équivalente.
          Le score de santé global combine ces métriques avec une pondération reflétant leur importance relative.
        </p>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
