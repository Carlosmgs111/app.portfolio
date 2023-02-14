import { PageStyle } from "./styles";
import { Children, cloneElement, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Page({ children, name }) {
  const childrens = Children.toArray(children);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedUsername, setSearchedUsername] = useState(
    searchParams.get("username")
  );
  return (
    <PageStyle>
      {childrens.map((child) => {
        return cloneElement(child, { dummyTitle: searchedUsername });
      })}
    </PageStyle>
  );
}
