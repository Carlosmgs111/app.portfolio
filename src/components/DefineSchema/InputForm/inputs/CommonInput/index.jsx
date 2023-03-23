import { beutifyLabel } from "../../../../../utils";

export const CommonInput = ({
  keyName,
  value,
  name,
  onChange,
  nonOptionals,
}) => {
  return (
    <input
      type={
        name.includes("~")
          ? "date"
          : typeof value === "string"
          ? "text"
          : "number"
      }
      name={keyName}
      value={value}
      onChange={(e) => onChange(name, value, e.target)}
      disabled={!nonOptionals.includes(name)}
      placeholder={beutifyLabel(name)}
    />
  );
};
