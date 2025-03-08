import { useReducer, useContext, createContext } from "react";

// Reducer para manejar cambios en los estados
const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, [action.key]: action.value };
    case "SET_STATES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Contexto del estado global atomizado
const StateContext = createContext(null);

// Hook principal para gestionar el directorio de estados
export const useStateDirectory = (initialStates = {}) => {
  const [state, dispatch] = useReducer(stateReducer, initialStates);

  // Actualiza un estado individual
  const setState = (key: string, value: any) => {
    dispatch({ type: "SET_STATE", key, value });
  };

  // Actualiza múltiples estados a la vez
  const setStates = (updates: Record<string, any>) => {
    dispatch({ type: "SET_STATES", payload: updates });
  };

  // Obtiene el valor de un estado por clave
  const getState = (key: string) => state[key];

  // Obtiene múltiples estados especificados por un arreglo de claves
  const getStates = (keys: string[]) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: state[key] }), {});

  return { state, setState, setStates, getState, getStates };
};

// Proveedor de contexto para el directorio de estados
export const StateProvider = ({ initialStates, children }: any) => {
  const stateManager: any = useStateDirectory(initialStates);

  return (
    <StateContext.Provider value={stateManager}>
      {children}
    </StateContext.Provider>
  );
};

// Hook para consumir el directorio de estados desde el contexto
export const useGlobalState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useGlobalState debe usarse dentro de StateProvider");
  }
  return context;
};
