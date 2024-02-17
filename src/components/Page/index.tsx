import styles from "./styles.module.css";
import { Children, cloneElement } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getContextValue, CONTEXTS } from "../../contexts";

export function Page({ children, name }: any) {
  const childrens = Children.toArray(children);
  const location = useLocation();
  const { searchedUsername } = getContextValue(CONTEXTS.Global);
  const [searchParams, setSearchParams] = useSearchParams();
  /*  const [searchedUsername, setSearchedUsername] = useState(
    searchParams.get("username")
  ); */

  return (
    <div className={styles.page}>
      {childrens.map((child: any) => {
        return cloneElement(child, { searchedUsername });
      })}
    </div>
  );
}
