import { useStateValue } from "../../../../../context";

export const Label = ({ entity }: any) => {
  const [state]: any = useStateValue();
  return <label htmlFor="">{state[entity]}</label>;
};
