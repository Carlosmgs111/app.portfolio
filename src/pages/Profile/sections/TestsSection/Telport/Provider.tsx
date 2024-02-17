import { PortalInput } from "./PortalInput";
import { Label } from "./Label";
import { useStateValue } from "../../../../../contexts/context";
import { useEffect } from "react";

export const Provider = () => {
  const [state]: any = useStateValue();
  useEffect(() => console.log({ state }), [state]);
  return (
    <>
      <label>This is Provider Component</label>
      <PortalInput {...{ entity: "portal1" }}></PortalInput>
      <PortalInput {...{ entity: "portal2" }}></PortalInput>
      <Label {...{ entity: "portal1" }}></Label>
      <Label {...{ entity: "portal2" }}></Label>
    </>
  );
};
