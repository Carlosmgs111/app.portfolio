import { useStateValue } from "../../../../../context";

export const PortalInput = ({ entity }: any) => {
  const [_, dispatch]: any = useStateValue();
  return (
    <input
      type="text"
      // value={state.value}
      onChange={(e) => dispatch({ [entity]: e.target.value })}
    />
  );
};
