import { PortalInput } from "./PortalInput";
import { Label } from "./Label";

export const Provider = () => {
  
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
