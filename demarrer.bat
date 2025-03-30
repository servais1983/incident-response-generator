@echo off
echo Demarrage du Generateur de Rapport d'Incident...

if not exist "node_modules\" (
    echo Installation des dependances...
    npm install
) else (
    echo Dependances deja installees.
)

echo Lancement de l'application...
echo L'application sera accessible a l'adresse http://localhost:3000
npm start
