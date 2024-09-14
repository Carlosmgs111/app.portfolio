import { StateProvider } from "../../../../../contexts/context";
import { Provider } from "./Provider";

const initialState = { portal1: "", portal2: "" };
const reducer = (state: any, payload: any) => {
  return { ...state, ...payload };
};

export const Telport = () => {
  return (
    <StateProvider {...{ initialState, reducer }}>
      <label>This is Telport Component</label>
      <Provider></Provider>
    </StateProvider>
  );
};
