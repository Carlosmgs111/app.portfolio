import React, {
  createContext,
  useContext,
  useReducer,
  Children,
  cloneElement,
} from "react";
export const StateContext: any = createContext(null);
export const StateProvider = ({ reducer, initialState, children }: any) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children
      ? Children.toArray(children).map((child: any) =>
          cloneElement(child, { withcontext: 1 })
        )
      : null}
  </StateContext.Provider>
);
export const useStateValue = () => [...useContext<any>(StateContext)];
