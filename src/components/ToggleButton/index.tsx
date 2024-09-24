import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";

function validateURL(str: string) {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

export const ToggleButton = ({
  onChange,
  backgrounds: [defaultBackground, toggledBackground] = [],
  labels: [defaultLabel, toggledLabel] = [],
  sliders: [defaultSlider, toggledSlider] = [],
}: any) => {
  const defaultLabelRef: any = useRef(null);
  const toggledLabelRef: any = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (!defaultLabelRef.current || !toggledLabelRef.current) return;
    if (validateURL(defaultBackground)) {
      defaultBackground = `url('${defaultBackground}')`;
    }
    if (validateURL(toggledBackground)) {
      toggledBackground = `url('${toggledBackground}')`;
    }
    if (defaultBackground) {
      defaultLabelRef.current.style.background = ` content-box center / cover ${defaultBackground}`;
    }
    if (toggledBackground) {
      toggledLabelRef.current.style.background = ` content-box center / cover ${toggledBackground}`;
    }
  }, [defaultLabelRef, toggledLabelRef]);
  return (
    <form className={`${styles.switch} `}>
      <label>
        <input
          type="checkbox"
          name="based-on"
          onChange={(e: any) => {
            setIsChecked(e.target.checked);
            onChange();
          }}
        ></input>
      </label>
      <span ref={defaultLabelRef} className={!isChecked ? styles.checked : ""}>
        <span>{defaultLabel}</span>
      </span>
      <span ref={toggledLabelRef} className={isChecked ? styles.checked : ""}>
        <span>{toggledLabel}</span>
      </span>
      <i
        className={`${
          defaultSlider ? defaultSlider : "fa-solid fa-circle-dot"
        } ${isChecked ? styles.checked : ""} `}
      ></i>
    </form>
  );
};
