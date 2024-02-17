import { useStateValue } from "../../../../../contexts/context";
import { useState } from "react";

export const PortalInput = ({ entity }: any) => {
  const [_, dispatch] = useStateValue();
  return (
    <input
      type="text"
      // value={state.value}
      onChange={(e) => dispatch({ [entity]: e.target.value })}
    />
  );
};
