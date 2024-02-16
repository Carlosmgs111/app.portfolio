import { StateContext, StateProvider, useStateValue } from "./context";
import { Mapfy } from "../utils";

const excludeContexts = ["Global", "CreationForm", "CreateNodeAndRelationship"];

export const CONTEXTS: any = {};
export const ACTIONS: any = {};

/**
 * @param name[String] String with the name of context
 * @param actionTypes[Object] Object with the action types
 * @param exclude[Boolean] Boolean value to add exclude context, by default is true
 */
export function factory() {
  const contexts: any = {};
  const addContext = (name: any, actionTypes: any, exclude = true) => {
    if (exclude) excludeContexts.push(name);
    CONTEXTS[name] = name;
    ACTIONS[name] = actionTypes;
    contexts[name] = { StateContext, StateProvider, useStateValue };
    return { StateProvider };
  };
  const getContext = (name: any) => {
    if (!Mapfy(CONTEXTS).has(name)) throw new Error(`Context doesn't exist!`);
    return [contexts[name], ACTIONS[name]];
  };
  const removeContext = (name: any) => {
    if (Mapfy(CONTEXTS).has(name)) delete contexts[name];
  };
  const cleanContexts = () => {
    for (var context in contexts) {
      if (!excludeContexts.includes(context)) {
        delete contexts[context];
      }
    }
  };
  const getContextValue = (name: any) => {
    if (!Mapfy(CONTEXTS).has(name)) throw new Error(`Context doesn't exist!`);
    const { useStateValue } = contexts[name];
    const [contextValue] = useStateValue();
    return contextValue;
  };

  return {
    addContext,
    getContext,
    removeContext,
    cleanContexts,
    getContextValue,
  };
}
