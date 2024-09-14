import { useStateValue } from "../../../../../contexts/context";

export const Label = ({ entity }: any) => {
  const [state] = useStateValue();
  return <label htmlFor="">{state[entity]}</label>;
};
