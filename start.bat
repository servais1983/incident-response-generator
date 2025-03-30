@echo off
echo Demarrage du Generateur de Rapport d'Incident...
echo Verification des dependances...

:: Verifier si Node.js est installe
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js n'est pas installe. Veuillez installer Node.js v16 ou superieur.
    echo Visitez https://nodejs.org/ pour les instructions d'installation.
    pause
    exit /b 1
)

:: Verifier si npm est installe
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo npm n'est pas installe. Veuillez installer npm v8 ou superieur.
    echo npm est generalement installe avec Node.js.
    pause
    exit /b 1
)

:: Installer les dependances si necessaire
if not exist "node_modules\" (
    echo Installation des dependances...
    call npm install
)

:: Demarrer l'application
echo Lancement de l'application...
echo L'application sera accessible a l'adresse http://localhost:3000
call npm start
