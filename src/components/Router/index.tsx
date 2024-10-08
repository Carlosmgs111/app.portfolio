import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../pages/NotFound";
import { Children } from "react";
import { Memo } from "../Memo";

export const Router = ({ children }: any): any => {
  return (
    // <Memo>
      <Routes>
        {Children.toArray(children).map((child: any, index: any): any => (
          <Route
            key={index}
            path={`/${child.props.path}`}
            element={child}
          ></Route>
        ))}
        <Route key="not-found" path="*" element={<NotFound />}></Route>
      </Routes>
    // </Memo>
  );
};
