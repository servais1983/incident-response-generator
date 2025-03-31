import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  incidents: [],
  currentIncident: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    severity: 'all',
    type: 'all',
    dateRange: null,
    searchText: '',
  },
  sorting: {
    field: 'createdAt',
    direction: 'desc',
  },
};

// Async thunks for API requests
export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async (_, { rejectWithValue }) => {
    try {
      // Simuler une requête API
      // Dans une implémentation réelle, ce serait un appel à l'API
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: JSON.parse(localStorage.getItem('incidents') || '[]')
          });
        }, 500);
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveIncident = createAsyncThunk(
  'incidents/saveIncident',
  async (incident, { rejectWithValue, getState }) => {
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mettre à jour le stockage local
      const { incidents } = getState().incidents;
      
      let updatedIncidents;
      if (incident.id) {
        // Mise à jour d'un incident existant
        updatedIncidents = incidents.map(inc => 
          inc.id === incident.id ? { ...inc, ...incident } : inc
        );
      } else {
        // Nouvel incident
        const newIncident = {
          ...incident,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        updatedIncidents = [newIncident, ...incidents];
      }
      
      localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
      
      return incident.id ? incident : updatedIncidents[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIncident = createAsyncThunk(
  'incidents/deleteIncident',
  async (incidentId, { rejectWithValue, getState }) => {
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mettre à jour le stockage local
      const { incidents } = getState().incidents;
      const updatedIncidents = incidents.filter(inc => inc.id !== incidentId);
      
      localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
      
      return incidentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setCurrentIncident: (state, action) => {
      state.currentIncident = action.payload;
    },
    clearCurrentIncident: (state) => {
      state.currentIncident = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchIncidents
      .addCase(fetchIncidents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // saveIncident
      .addCase(saveIncident.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Mettre à jour l'incident existant ou ajouter un nouvel incident
        if (action.meta.arg.id) {
          const index = state.incidents.findIndex(i => i.id === action.payload.id);
          if (index !== -1) {
            state.incidents[index] = action.payload;
          }
        } else {
          state.incidents.unshift(action.payload);
        }
        
        state.currentIncident = action.payload;
      })
      .addCase(saveIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // deleteIncident
      .addCase(deleteIncident.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incidents = state.incidents.filter(inc => inc.id !== action.payload);
        if (state.currentIncident && state.currentIncident.id === action.payload) {
          state.currentIncident = null;
        }
      })
      .addCase(deleteIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  setCurrentIncident,
  clearCurrentIncident,
  setFilters,
  setSorting,
  clearError,
} = incidentsSlice.actions;

export default incidentsSlice.reducer;

// Selectors
export const selectAllIncidents = (state) => state.incidents.incidents;
export const selectCurrentIncident = (state) => state.incidents.currentIncident;
export const selectIsLoading = (state) => state.incidents.isLoading;
export const selectError = (state) => state.incidents.error;
export const selectFilters = (state) => state.incidents.filters;
export const selectSorting = (state) => state.incidents.sorting;

// Selector pour les incidents filtrés et triés
export const selectFilteredIncidents = (state) => {
  const { incidents, filters, sorting } = state.incidents;
  
  // Fonction pour filtrer les incidents
  const filterIncidents = (incidents) => {
    return incidents.filter(incident => {
      // Filtre par statut
      if (filters.status !== 'all' && incident.status !== filters.status) {
        return false;
      }
      
      // Filtre par sévérité
      if (filters.severity !== 'all' && incident.severity !== filters.severity) {
        return false;
      }
      
      // Filtre par type
      if (filters.type !== 'all' && incident.type !== filters.type) {
        return false;
      }
      
      // Filtre par texte de recherche
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        return (
          incident.title?.toLowerCase().includes(searchLower) ||
          incident.description?.toLowerCase().includes(searchLower) ||
          incident.id?.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };
  
  // Fonction pour trier les incidents
  const sortIncidents = (incidents) => {
    return [...incidents].sort((a, b) => {
      let aValue = a[sorting.field];
      let bValue = b[sorting.field];
      
      // Convertir les dates en objets Date pour la comparaison
      if (sorting.field === 'createdAt' || sorting.field === 'updatedAt' || 
          sorting.field === 'detectedAt' || sorting.field === 'resolvedAt') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }
      
      // Comparaison
      if (aValue < bValue) {
        return sorting.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sorting.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Appliquer les filtres puis le tri
  return sortIncidents(filterIncidents(incidents));
};
