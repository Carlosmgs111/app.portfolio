import { useStateValue } from "../../../../../contexts/context";
import { useState } from "react";

export const PortalInput = ({ entity }) => {
  const [_, dispatch] = useStateValue("");
  return (
    <input
      type="text"
      // value={state.value}
      onChange={(e) => dispatch({ [entity]: e.target.value })}
    />
  );
};
