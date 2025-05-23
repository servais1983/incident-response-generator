import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Action types
const ACTION_TYPES = {
  SET_INCIDENTS: 'SET_INCIDENTS',
  ADD_INCIDENT: 'ADD_INCIDENT',
  UPDATE_INCIDENT: 'UPDATE_INCIDENT',
  DELETE_INCIDENT: 'DELETE_INCIDENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
};

// État initial
const initialState = {
  incidents: [],
  isLoading: false,
  error: null,
  filter: {
    status: 'all',
    severity: 'all',
    type: 'all',
    dateRange: null,
    searchText: '',
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  userPreferences: {
    theme: 'system', // 'light', 'dark' ou 'system'
    dashboardLayout: 'grid', // 'grid' ou 'list'
    cardsPerPage: 10,
    showCompletedIncidents: true,
  },
};

// Réducteur pour la gestion des actions
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INCIDENTS:
      return {
        ...state,
        incidents: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.ADD_INCIDENT:
      return {
        ...state,
        incidents: [action.payload, ...state.incidents],
      };
    case ACTION_TYPES.UPDATE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? action.payload : incident
        ),
      };
    case ACTION_TYPES.DELETE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.filter(
          incident => incident.id !== action.payload.id
        ),
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    case ACTION_TYPES.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case ACTION_TYPES.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// Création du contexte
const GlobalStateContext = createContext();

// Provider du contexte
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const actions = useMemo(
    () => ({
      setIncidents: (incidents) =>
        dispatch({ type: ACTION_TYPES.SET_INCIDENTS, payload: incidents }),
      addIncident: (incident) =>
        dispatch({ type: ACTION_TYPES.ADD_INCIDENT, payload: incident }),
      updateIncident: (incident) =>
        dispatch({ type: ACTION_TYPES.UPDATE_INCIDENT, payload: incident }),
      deleteIncident: (incident) =>
        dispatch({ type: ACTION_TYPES.DELETE_INCIDENT, payload: incident }),
      setLoading: (isLoading) =>
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading }),
      setError: (error) =>
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error }),
      clearError: () => dispatch({ type: ACTION_TYPES.CLEAR_ERROR }),
      setFilter: (filter) =>
        dispatch({ type: ACTION_TYPES.SET_FILTER, payload: filter }),
      setSort: (sort) => dispatch({ type: ACTION_TYPES.SET_SORT, payload: sort }),
      setUserPreferences: (preferences) =>
        dispatch({
          type: ACTION_TYPES.SET_USER_PREFERENCES,
          payload: preferences,
        }),
    }),
    []
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export default useGlobalState;
