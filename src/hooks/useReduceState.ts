import { useReducer } from "react";
import deepEqual from "fast-deep-equal";
// import { getSetFunctions, getGetFunctions } from "../utils";

let lastUpdate = Date.now();
interface Opts {
  minUpdateInterval?: number;
  onChange?: Function | null;
  watch?: Array<string> | null;
}
/**
 * useReduceState is a hook that wraps React's useReducer hook,
 * it will only update the state if the new state is
 * different from the previous state, and if the time between the previous update
 * and the current update is greater than the specified `minUpdateInterval`.
 * If the time between the previous update and the current update is less than
 * minUpdateInterval, the state will be forced to be updated regardless of whether
 * the previous state is the same or not.
 *
 * @param {any} initialState The initial state.
 * @param {Opts} opts An object with the following properties:
 *
 * @param {number} [opts.minUpdateInterval=20] The minimum time in milliseconds
 * between updates to consider to force the update.
 *
 * @param {Function} [opts.onChange=null] A function that will be called with
 * the key and new value of the state whenever the state is updated.
 *
 * @returns {Array} An array with two elements, the first being the current state
 * and the second being a function that can be used to update the state.
 */

export const useReduceState = (initialState: any, opts?: Opts) => {
  const { minUpdateInterval = 20, onChange = null } = opts || {};
  const [state, dispatch]: any = useReducer((prevState: any, payload: any) => {
    if (!payload) return prevState;
    Object.entries(payload).forEach(([key, value]: any) => {
      if (key === "reset" && value) {
        return initialState;
      }
      if (onChange) {
        onChange(key, value);
      }
      prevState = { ...prevState, [key]: value };
    });
    lastUpdate = Date.now();
    return prevState;
  }, initialState);

  const conditionalDispatch = (payload: any) => {
    Object.entries(payload).forEach(([key, value]: any) => {
      if (key.startsWith("$")) {
        // * '$' to force update, this when time between update is too short
        delete payload[key];
        payload[key.slice(1)] = value;
        return;
      }
      if (Date.now() - lastUpdate <= minUpdateInterval) {
        payload[key] = value;
        return;
      }
      if (deepEqual(state[key], value)) {
        delete payload[key];
      }
    });
    if (!Object.keys(payload).length) return;
    return dispatch(payload);
  };
  // const setFunctions = Object.assign({}, getSetFunctions(dispatch, state));
  // const getFunctions = Object.assign({}, getGetFunctions(state));

  return [
    state,
    conditionalDispatch /* { ...setFunctions, ...getFunctions } */,
  ];
};
