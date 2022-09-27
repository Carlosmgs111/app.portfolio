import React, {
  createContext,
  useContext,
  useReducer,
  Children,
  cloneElement,
} from "react";
export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children
      ? Children.toArray(children).map((child) =>
          cloneElement(child, { withContext: true })
        )
      : null}
  </StateContext.Provider>
);
export const useStateValue = () => [...useContext(StateContext)];
