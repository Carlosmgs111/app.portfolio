import { factory, CONTEXTS } from "./factory";

console.log({CONTEXTS})

export const {
  addContext,
  getContext,
  removeContext,
  cleanContexts,
  getContextValue,
}: any = factory();

export { CONTEXTS };
