import styles from "./styles.module.css";
export const COA = ({ className }: any) => {
  return (
    <div className={`${styles.coat_of_arms} ${className}`}>
      <span>
        <i className="fa-solid fa-lightbulb"></i>
      </span>
      <span>
        <i className="fa-solid fa-screwdriver-wrench"></i>
      </span>
      <span>
        <i className="fa-solid fa-puzzle-piece"></i>
      </span>
      <span>
        <i className="fa-solid fa-compass-drafting"></i>
      </span>
    </div>
  );
};
