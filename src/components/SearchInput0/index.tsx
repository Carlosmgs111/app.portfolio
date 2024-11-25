import { useEffect, useState } from "react";
import { runRequest } from "../../services/runRequest";
import { useStateValue } from "../../context";
import styles from "./styles.module.css";
export const SearchInput0 = () => {
  const [{ searchedUsername }, dispatch]: any = useStateValue();
  const [showfixed, setShowFixed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [indexedElements, setIndexedElements]: any = useState([]);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    runRequest({
      setData: (data: any) => setIndexedElements([...indexedElements, ...data]),
    }).get("users/username/all");
    const searchInput = document.getElementsByName("search-input")[0];
    searchInput.addEventListener("focusin", () => setSelected(true));
    searchInput.addEventListener("focusout", () => setSelected(false));
  }, [showfixed]);
  return (
    <>
      <form action="">
        <input
          className={styles.search_input}
          type="search"
          name="search-input"
          value={searchValue}
          list="indexed_elements"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <i
          className={`fa-solid fa-magnifying-glass ${styles.search_icon} ${
            selected ? styles.selected : ""
          }`}
        />
        <input
          type="submit"
          className={styles.submit_search}
          onClick={(e) => {
            dispatch({ searchValue });
            setSearchValue("");
            e.preventDefault();
          }}
        />
      </form>
      <datalist id="indexed_elements">
        {indexedElements.map((iE: any, idx: any) => (
          <option value={iE} key={idx} />
        ))}
      </datalist>
    </>
  );
};
