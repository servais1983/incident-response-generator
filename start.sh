#!/bin/bash

# Script de démarrage pour l'application Générateur de Rapport d'Incident

echo "Démarrage du Générateur de Rapport d'Incident..."
echo "Vérification des dépendances..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "Node.js n'est pas installé. Veuillez installer Node.js (v16 ou supérieur)."
    echo "Visitez https://nodejs.org/ pour les instructions d'installation."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "npm n'est pas installé. Veuillez installer npm (v8 ou supérieur)."
    echo "npm est généralement installé avec Node.js."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances..."
    npm install
fi

# Démarrer l'application
echo "Lancement de l'application..."
echo "L'application sera accessible à l'adresse http://localhost:3000"
npm start
