// COA.tsx
import styles from "./styles.module.css";
type COAProps = {
  className?: string;
};
export const COA = ({ className = "" }: COAProps) => (
  <div className={`${styles.coat_of_arms} ${className}`}>
    {[
      "fa-lightbulb",
      "fa-screwdriver-wrench",
      "fa-puzzle-piece",
      "fa-compass-drafting",
    ].map((icon, index) => (
      <span key={index}>
        <i className={`fa-solid ${icon}`}></i>
      </span>
    ))}
  </div>
);
