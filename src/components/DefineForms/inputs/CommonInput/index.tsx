import { beutifyLabel } from "../../../../utils";
import styles from "./styles.module.css";
import { InputHelper } from "../../../../components/DefineForms/styles";
import { INPUT_TYPES } from "../../../../components/DefineForms";

// ? This component can be used as an Individual component
// ? Also as a controlled component using InputForm component
export const CommonInput = ({
  keyName = "",
  value = "",
  name = "",
  required = false,
  onChange = () => {},
  nonOptionals = [],
}: {
  keyName?: string;
  value?: any;
  name?: string;
  onChange?: Function;
  nonOptionals?: Array<string>;
  required?: boolean;
}) => {
  return (
    <>
      {required && <InputHelper>*</InputHelper>}
      <input
        className={styles.common_input}
        type={typeof value === "string" ? "text" : "number"}
        name={keyName}
        value={value}
        onChange={(e: any) => {
          onChange && onChange(name, e.target, INPUT_TYPES.TEXT);
        }}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(name)}
      />
      <label className={styles.label}>{beutifyLabel(name)}</label>
    </>
  );
};
