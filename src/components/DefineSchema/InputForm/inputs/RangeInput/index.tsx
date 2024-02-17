import { beutifyLabel } from "../../../../../utils";

export const RangeInput = ({
  keyName,
  value,
  name,
  onChange,
  nonOptionals,
  attributes,
}: any) => {
  const [min, max, step] = value[0];
  return (
    <>
      <input
        style={{ padding: 0 }}
        type="range"
        id={name}
        min={min}
        max={max}
        name={keyName}
        defaultValue={
          Object.entries<any>(attributes)[0][1][name.replace("<", "")]
        }
        // value={value}
        onChange={(e) => onChange(name, value, e.target)}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(name)}
        step={step}
      ></input>
      <label htmlFor={name} className="label">
        {beutifyLabel(name)} :{" "}
        {Object.entries<any>(attributes)[0][1][name.replace("<", "")]}
      </label>
    </>
  );
};
