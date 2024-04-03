import { beutifyLabel } from "../../../../utils";
import { Range } from "./styles";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { useEffect, useState } from "react";
import { InputHelper } from "../../../../components/DefineForms/styles";
import { useToggle } from "../../../../hooks/useToggle";

export const RangeInput = ({
  keyName,
  value,
  controlledValue,
  initValue = null,
  name,
  onChange,
  nonOptionals,
  required = false,
}: {
  keyName: string;
  value: any;
  controlledValue: any;
  initValue?: number | null;
  name: string;
  onChange: Function;
  nonOptionals: Array<string>;
  required?: boolean;
}) => {
  const [min, max, step] = value;
  const [initialValue, switchInitialValue] = useToggle(initValue, null);

  useEffect(() => {
    const rangeElement: HTMLElement | null = document.getElementById(name);
    if (rangeElement) {
      rangeElement.addEventListener("touchstart", () => {
        rangeElement.classList.add("active");
      });

      rangeElement.addEventListener("touchend", () => {
        rangeElement.classList.remove("active");
      });
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {required && <InputHelper>*</InputHelper>}
      <Range
        type="range"
        id={name}
        min={min}
        max={max}
        name={name}
        defaultValue={initialValue || controlledValue}
        onChange={(e: any) => {
          if (initialValue) switchInitialValue();
          onChange(name, e.target, INPUT_TYPES.RANGE);
        }}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(name)}
        step={step}
      ></Range>
      <label htmlFor={name} className="label">
        {beutifyLabel(name)} : {initialValue || controlledValue}
      </label>
    </>
  );
};
