import { PageStyle } from "./styles";
import { Children, cloneElement, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export function Page({ children, name }) {
  const childrens = Children.toArray(children);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedUsername, setSearchedUsername] = useState(
    searchParams.get("username")
  );

  return (
    <PageStyle>
      {childrens.map((child) => {
        return cloneElement(child, { searchedUsername });
      })}
    </PageStyle>
  );
}
