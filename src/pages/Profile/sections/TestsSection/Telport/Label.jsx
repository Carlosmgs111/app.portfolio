import { useStateValue } from "../../../../../contexts/context";

export const Label = ({ entity }) => {
  const [state] = useStateValue();
  return <label htmlFor="">{state[entity]}</label>;
};
