import React from 'react';
import Header from './ui/Header';

// Composant de mise en page responsive
const ResponsiveLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Conteneur principal avec des marges responsives */}
        <div className="w-full transition-all duration-300">
          {children}
        </div>
      </main>
      <footer className="bg-white dark:bg-dark-bg-secondary py-4 border-t border-gray-200 dark:border-gray-700 transition-theme duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Générateur de Rapport d'Incident
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveLayout;
