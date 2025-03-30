import React, { useState } from 'react';

/**
 * Formulaire pour ajouter des événements à la chronologie d'un incident
 * 
 * Ce composant permet d'enregistrer des événements clés survenus
 * pendant un incident de sécurité.
 */
const TimelineCreateScreen = ({ incidentId, onCreateSuccess, onCancel }) => {
  // Date et heure actuelles pour les valeurs par défaut
  const now = new Date();
  const today = now.toISOString().substring(0, 10);
  const currentTime = now.toTimeString().substring(0, 5);
  
  // État initial du formulaire
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: today,
    eventTime: currentTime,
    eventType: 'Détection',
    source: '',
    actor: '',
    impact: 'Aucun',
    isKeyEvent: false
  });
  
  // Options pour les champs de sélection
  const eventTypeOptions = [
    'Détection', 
    'Attaque', 
    'Exfiltration', 
    'Confinement', 
    'Éradication', 
    'Récupération', 
    'Notification', 
    'Autre'
  ];
  
  const impactOptions = [
    'Aucun',
    'Faible',
    'Moyen',
    'Élevé',
    'Critique'
  ];
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ajouter l'ID de l'incident, un ID unique et un timestamp
    const newEvent = {
      ...eventData,
      incidentId,
      eventId: `EV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      timestamp: `${eventData.eventDate}T${eventData.eventTime}:00`
    };
    
    // Dans une vraie application, ce serait un appel API
    console.log('Nouvel événement créé:', newEvent);
    
    // Notifier le succès
    if (onCreateSuccess) {
      onCreateSuccess(newEvent);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Ajouter un événement à la chronologie</h2>
      <p className="text-gray-500 mb-6">Incident ID: {incidentId}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Titre de l'événement */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'événement <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date et heure de l'événement */}
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de l'événement <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={eventData.eventDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
                Heure de l'événement <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                value={eventData.eventTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            {/* Type d'événement et impact */}
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                Type d'événement
              </label>
              <select
                id="eventType"
                name="eventType"
                value={eventData.eventType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {eventTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau d'impact
              </label>
              <select
                id="impact"
                name="impact"
                value={eventData.impact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {impactOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Source et acteur */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source de l'information
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={eventData.source}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Log, Système de monitoring, Témoin..."
              />
            </div>
            
            <div>
              <label htmlFor="actor" className="block text-sm font-medium text-gray-700 mb-1">
                Acteur impliqué
              </label>
              <input
                type="text"
                id="actor"
                name="actor"
                value={eventData.actor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Attaquant, Administrateur, Utilisateur..."
              />
            </div>
          </div>
          
          {/* Option pour marquer comme événement clé */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isKeyEvent"
              name="isKeyEvent"
              checked={eventData.isKeyEvent}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isKeyEvent" className="ml-2 block text-sm text-gray-700">
              Marquer comme un événement clé
            </label>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            Les événements clés sont mis en évidence dans la chronologie et inclus dans le rapport d'incident.
          </p>
          
          {/* Boutons d'action */}
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
              Ajouter l'événement
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimelineCreateScreen;
