import styles from "./styles.module.css";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { InputHelper } from "../../../../components/DefineForms/styles";

export const SelectionInput = ({
  keyName,
  value,
  controlledValue,
  name,
  onChange,
  nonOptionals,
  required = false,
}: {
  keyName: string;
  value: any;
  controlledValue: any;
  name: string;
  onChange: Function;
  nonOptionals: Array<any>;
  required?: boolean;
}) => {
  return (
    <>
      {required && <InputHelper>*</InputHelper>}
      <select
        className={styles.selection}
        name={keyName}
        defaultValue={value.find((v: any) => v === controlledValue)}
        disabled={!nonOptionals.includes(name)}
        onChange={(e: any) => onChange(name, e.target, INPUT_TYPES.SELECTION)}
      >
        {value.map((item: any, index: any) => {
          return (
            <option className={styles.option} value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};
