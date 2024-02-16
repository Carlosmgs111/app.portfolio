export const EitherInput = ({ keyName, value, name, onChange }: any) => {
  return (
    <>
      <label>
        false
        <input
          name={keyName}
          type="radio"
          disabled={true}
          value={false}
          checked={String(value) === "false"}
          onChange={(e) => onChange(name, value, e.target)}
        />
      </label>
      <label>
        true
        <input
          name={keyName}
          type="radio"
          disabled={true}
          value={true}
          checked={String(value) === "true"}
          onChange={(e) => onChange(name, value, e.target)}
        />
      </label>
    </>
  );
};
