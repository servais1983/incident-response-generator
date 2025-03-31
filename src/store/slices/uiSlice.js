import { createSlice } from '@reduxjs/toolkit';

// Configuration des modes d'affichage
export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
  KANBAN: 'kanban',
};

// Initial state
const initialState = {
  // État général de l'UI
  isSidebarOpen: true,
  isDetailsOpen: false,
  viewMode: VIEW_MODES.LIST,
  activePanel: 'incidents', // 'incidents', 'reports', 'analytics', 'settings'
  
  // Gestion des modales
  activeModal: null, // 'create-incident', 'edit-incident', 'delete-confirmation', etc.
  modalData: null,
  
  // Gestion des écrans
  currentScreen: 'dashboard', // 'dashboard', 'detail', 'edit', 'create', etc.
  screenHistory: ['dashboard'],
  
  // Erreurs et chargement
  loadingStates: {}, // { componentId: boolean }
  errors: {}, // { componentId: string }
  
  // Tour d'introduction / aide
  isHelpVisible: false,
  currentHelpStep: 0,
  
  // Interface responsive
  isMobileView: false,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleDetailsPanel: (state) => {
      state.isDetailsOpen = !state.isDetailsOpen;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setActivePanel: (state, action) => {
      state.activePanel = action.payload;
    },
    
    // Gestion des modales
    openModal: (state, action) => {
      state.activeModal = action.payload.modalId;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
    
    // Navigation entre écrans
    navigateTo: (state, action) => {
      state.currentScreen = action.payload;
      state.screenHistory.push(action.payload);
      
      // Garder une historique raisonnable (max 10 écrans)
      if (state.screenHistory.length > 10) {
        state.screenHistory.shift();
      }
    },
    goBack: (state) => {
      // Si l'historique contient plus d'un élément
      if (state.screenHistory.length > 1) {
        state.screenHistory.pop(); // Supprimer l'écran actuel
        state.currentScreen = state.screenHistory[state.screenHistory.length - 1];
      }
    },
    
    // Gestion du chargement et des erreurs par composant
    setLoading: (state, action) => {
      const { componentId, isLoading } = action.payload;
      state.loadingStates[componentId] = isLoading;
    },
    setError: (state, action) => {
      const { componentId, error } = action.payload;
      state.errors[componentId] = error;
    },
    clearError: (state, action) => {
      const componentId = action.payload;
      if (componentId) {
        delete state.errors[componentId];
      } else {
        state.errors = {};
      }
    },
    
    // Gestion du tour d'aide / introduction
    toggleHelp: (state) => {
      state.isHelpVisible = !state.isHelpVisible;
      if (state.isHelpVisible) {
        state.currentHelpStep = 0;
      }
    },
    setHelpStep: (state, action) => {
      state.currentHelpStep = action.payload;
    },
    
    // Gestion responsive
    setMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  toggleDetailsPanel,
  setViewMode,
  setActivePanel,
  openModal,
  closeModal,
  navigateTo,
  goBack,
  setLoading,
  setError,
  clearError,
  toggleHelp,
  setHelpStep,
  setMobileView,
  toggleMobileMenu,
  closeMobileMenu,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;

// Selectors
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectIsDetailsOpen = (state) => state.ui.isDetailsOpen;
export const selectViewMode = (state) => state.ui.viewMode;
export const selectActivePanel = (state) => state.ui.activePanel;
export const selectActiveModal = (state) => state.ui.activeModal;
export const selectModalData = (state) => state.ui.modalData;
export const selectCurrentScreen = (state) => state.ui.currentScreen;
export const selectScreenHistory = (state) => state.ui.screenHistory;
export const selectLoadingState = (state, componentId) => state.ui.loadingStates[componentId] || false;
export const selectComponentError = (state, componentId) => state.ui.errors[componentId] || null;
export const selectIsHelpVisible = (state) => state.ui.isHelpVisible;
export const selectCurrentHelpStep = (state) => state.ui.currentHelpStep;
export const selectIsMobileView = (state) => state.ui.isMobileView;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
