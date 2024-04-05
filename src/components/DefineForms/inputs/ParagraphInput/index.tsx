import { useEffect, useState } from "react";
import { InputHelper } from "../../../../components/DefineForms/styles";
import { InputTextStyle, TextArea } from "./styles";
import { beutifyLabel, genRandomId } from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";

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
      <InputTextStyle key={idx}>
        <TextArea
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
      </InputTextStyle>
    </>
  );
};
