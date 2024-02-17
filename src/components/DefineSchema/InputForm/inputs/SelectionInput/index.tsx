export const SelectionInput = ({
  keyName,
  value,
  name,
  onChange,
  nonOptionals,
  attributes,
}: any) => {
  return (
    <select
      name={keyName}
      defaultValue={value.find(
        (v: any) =>
          v === Object.entries<any>(attributes)[0][1][name.replace("{", "")]
      )}
      disabled={!nonOptionals.includes(name)}
      onChange={(e) => onChange(name, value, e.target)}
    >
      {value.map((item: any, index: number) => {
        return (
          <option value={item} key={index}>
            {item}
          </option>
        );
      })}
    </select>
  );
};
