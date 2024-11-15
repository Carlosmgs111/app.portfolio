// COA.tsx
import styles from "./styles.module.css";
import { Memo } from "../Memo";

type COAProps = {
  className?: string;
};

export const COA = ({ className = "" }: COAProps) => (
  <Memo>
    <div className={`${styles.coat_of_arms} ${className}`}>
      {["fa-lightbulb", "fa-screwdriver-wrench", "fa-puzzle-piece", "fa-compass-drafting"].map(
        (icon, index) => (
          <span key={index}>
            <i className={`fa-solid ${icon}`}></i>
          </span>
        )
      )}
    </div>
  </Memo>
);
