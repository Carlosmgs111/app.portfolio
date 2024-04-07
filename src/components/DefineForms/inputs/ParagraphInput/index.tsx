import { useEffect, useState } from "react";
import { InputHelper } from "../../../../components/DefineForms/styles";
import { beutifyLabel, genRandomId } from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import styles from "./styles.module.css";

export const ParagraphInput = ({
  name,
  idx,
  text,
  placeholder,
  onChange,
  showLabel = true,
  required = false,
}: any) => {
  const [textArea, setTextArea]: any = useState(null);
  const id = `text_input_${idx}_${genRandomId()}`;

  const autoGrow = () => {
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (textArea) {
      autoGrow();
      textArea.addEventListener("input", autoGrow);
      return;
    }
    setTextArea(document.getElementById(id));
  }, [textArea]);

  return (
    <>
      {required && <InputHelper>*</InputHelper>}
      <div className={styles.input_text} key={idx}>
        <textarea
          className={styles.textarea}
          wrap="hard"
          id={id}
          rows={1}
          name={idx}
          value={text}
          onChange={(e: any) => {
            onChange(name, e.target, INPUT_TYPES.PARAGRAPH);
          }}
          placeholder={placeholder || beutifyLabel(name).CS}
        />
        {showLabel && <label className="label">{name}</label>}
      </div>
      <label className={styles.label}>{beutifyLabel(name)}</label>
    </>
  );
};
