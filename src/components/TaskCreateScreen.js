import React, { useState } from 'react';

/**
 * Formulaire de création de tâches liées à un incident
 * 
 * Ce composant permet de créer de nouvelles tâches associées 
 * à un incident de sécurité spécifique.
 */
const TaskCreateScreen = ({ incidentId, onCreateSuccess, onCancel }) => {
  // État initial du formulaire
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'Moyenne',
    status: 'À faire',
    category: 'Analyse'
  });
  
  // Options pour les champs de sélection
  const priorityOptions = ['Haute', 'Moyenne', 'Basse'];
  const statusOptions = ['À faire', 'En cours', 'En attente', 'Terminée'];
  const categoryOptions = [
    'Analyse', 
    'Confinement', 
    'Éradication', 
    'Récupération',
    'Forensique',
    'Communication',
    'Documentation',
    'Autre'
  ];
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ajouter l'ID de l'incident et un timestamp
    const newTask = {
      ...taskData,
      incidentId,
      taskId: `TASK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Dans une application réelle, ce serait un appel API
    console.log('Nouvelle tâche créée:', newTask);
    
    // Notifier le succès
    if (onCreateSuccess) {
      onCreateSuccess(newTask);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Créer une nouvelle tâche</h2>
      <p className="text-gray-500 mb-6">Incident ID: {incidentId}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Titre de la tâche */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de la tâche <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assignée à */}
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                Assignée à
              </label>
              <input
                type="text"
                id="assignee"
                name="assignee"
                value={taskData.assignee}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nom de la personne responsable"
              />
            </div>
            
            {/* Date d'échéance */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date d'échéance
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Priorité */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <select
                id="priority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {priorityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Statut */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Catégorie */}
            <div className="md:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={taskData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {categoryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
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
              Créer la tâche
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskCreateScreen;
