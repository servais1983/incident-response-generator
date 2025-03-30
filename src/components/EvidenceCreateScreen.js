import React, { useState } from 'react';

/**
 * Formulaire de création d'éléments de preuve
 * 
 * Ce composant permet d'ajouter des preuves associées à un incident,
 * avec support pour les pièces jointes.
 */
const EvidenceCreateScreen = ({ incidentId, onCreateSuccess, onCancel }) => {
  // État initial du formulaire
  const [evidenceData, setEvidenceData] = useState({
    title: '',
    description: '',
    source: '',
    collectionDate: '',
    collectionTime: '',
    evidenceType: 'Log',
    classification: 'Normal',
    location: '',
    md5Hash: '',
    notes: ''
  });
  
  // État pour les fichiers
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  
  // Options pour les champs de sélection
  const evidenceTypeOptions = [
    'Log', 
    'Capture réseau', 
    'Mémoire', 
    'Disque', 
    'Image', 
    'Email', 
    'Document', 
    'Autre'
  ];
  
  const classificationOptions = [
    'Normal',
    'Confidentiel',
    'Sensible',
    'Restreint'
  ];
  
  // Taille maximale des fichiers (en octets) - 25 Mo
  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvidenceData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gestion des fichiers attachés
  const handleFileChange = (e) => {
    setFileError('');
    
    const selectedFiles = Array.from(e.target.files);
    
    // Vérifier la taille des fichiers
    const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setFileError(`Certains fichiers dépassent la taille maximale de 25 Mo: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    setFiles(selectedFiles);
  };
  
  // Suppression de fichiers
  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Formatage de la taille des fichiers
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Calculer un hash MD5 (simulation)
  const generateMockHash = () => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Générer un hash MD5 fictif si aucun n'est fourni
    let finalEvidenceData = { ...evidenceData };
    if (!finalEvidenceData.md5Hash && files.length > 0) {
      finalEvidenceData.md5Hash = generateMockHash();
    }
    
    // Ajouter l'ID d'incident, un ID unique et des timestamps
    const newEvidence = {
      ...finalEvidenceData,
      incidentId,
      evidenceId: `EV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      attachments: files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }))
    };
    
    // Dans une application réelle, ce serait un appel API avec upload de fichiers
    console.log('Nouvelle preuve créée:', newEvidence);
    console.log('Fichiers à télécharger:', files);
    
    // Notifier le succès
    if (onCreateSuccess) {
      onCreateSuccess(newEvidence);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Ajouter un élément de preuve</h2>
      <p className="text-gray-500 mb-6">Incident ID: {incidentId}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Titre de la preuve */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={evidenceData.title}
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
              value={evidenceData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={evidenceData.source}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Firewall, Serveur web, Poste utilisateur"
              />
            </div>
            
            {/* Localisation */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={evidenceData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Chemin du fichier, URL, Adresse IP"
              />
            </div>
            
            {/* Date et heure de collecte */}
            <div>
              <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de collecte
              </label>
              <input
                type="date"
                id="collectionDate"
                name="collectionDate"
                value={evidenceData.collectionDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="collectionTime" className="block text-sm font-medium text-gray-700 mb-1">
                Heure de collecte
              </label>
              <input
                type="time"
                id="collectionTime"
                name="collectionTime"
                value={evidenceData.collectionTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Type de preuve */}
            <div>
              <label htmlFor="evidenceType" className="block text-sm font-medium text-gray-700 mb-1">
                Type de preuve
              </label>
              <select
                id="evidenceType"
                name="evidenceType"
                value={evidenceData.evidenceType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {evidenceTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Classification */}
            <div>
              <label htmlFor="classification" className="block text-sm font-medium text-gray-700 mb-1">
                Classification
              </label>
              <select
                id="classification"
                name="classification"
                value={evidenceData.classification}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {classificationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* MD5 Hash */}
            <div>
              <label htmlFor="md5Hash" className="block text-sm font-medium text-gray-700 mb-1">
                Hash MD5 (si connu)
              </label>
              <input
                type="text"
                id="md5Hash"
                name="md5Hash"
                value={evidenceData.md5Hash}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: d41d8cd98f00b204e9800998ecf8427e"
              />
            </div>
          </div>
          
          {/* Pièces jointes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pièces jointes (max. 25 Mo par fichier)
            </label>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour ajouter des fichiers</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">Tout type de fichier accepté</p>
                </div>
                <input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>
            </div>
            
            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}
            
            {/* Liste des fichiers sélectionnés */}
            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers sélectionnés</h4>
                <ul className="border rounded-lg divide-y">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <span className="material-icons text-gray-500 mr-2">
                          {file.type.startsWith('image/') ? 'image' : 
                           file.type.includes('pdf') ? 'picture_as_pdf' : 
                           file.type.includes('word') ? 'description' : 
                           file.type.includes('excel') ? 'table_chart' : 
                           'insert_drive_file'}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <span className="material-icons">close</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Notes supplémentaires */}
          <div className="mt-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes supplémentaires
            </label>
            <textarea
              id="notes"
              name="notes"
              value={evidenceData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Informations additionnelles sur cette preuve..."
            ></textarea>
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
              Ajouter la preuve
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EvidenceCreateScreen;
