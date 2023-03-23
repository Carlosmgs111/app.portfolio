export const SelectionInput = ({
  keyName,
  value,
  name,
  onChange,
  nonOptionals,
  attributes,
}) => {
  <select
    name={keyName}
    defaultValue={value.find(
      (v) => v === Object.entries(attributes)[0][1][name.replace("{", "")]
    )}
    disabled={!nonOptionals.includes(name)}
    onChange={(e) => onChange(name, value, e.target)}
  >
    {value.map((item, index) => {
      return (
        <option value={item} key={index}>
          {item}
        </option>
      );
    })}
  </select>;
};
