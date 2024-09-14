import { getContextValue, CONTEXTS } from "../contexts";

export const headers = () => {
  const { token }: any = getContextValue(CONTEXTS.Global);
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
