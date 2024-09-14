import { factory, CONTEXTS } from "./factory";

export const {
  addContext,
  getContext,
  removeContext,
  cleanContexts,
  getContextValue,
}: any = factory();

export { CONTEXTS };
