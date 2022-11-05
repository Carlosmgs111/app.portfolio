import { useState } from "react";
import { ProjectsSidebar } from "../../components/Sidebars/ProjectsSidebar";
// ! As it is imported
const sidebars = { ProjectsSidebar };

/**
 * It returns a rendered sidebar component and two functions to update the state of the sidebar
 * @param [initialElements] - The initial elements to be passed to the sidebar.
 * @param key - The key of the element that will be used to identify it.
 * @param [string || component] - the sidebar component to be used,
 * @returns An array of three elements. The first element is the sidebar being rendered. The
 * second element is a function that updates the state of the elements. The third element is a function
 * that updates the state of the refs.
 */

export const useSidebar = (
  component = sidebars[
    "ProjectsSidebar"
  ] /* ! set a fallback sidebar component */
) => {
  const indexes = [];
  const [elements, setElements] = useState([]);
  const [refs, setRefs] = useState([]);
  const Sidebar =
    typeof component === "string" ? sidebars[component] : component;
  if (!Sidebar) throw new Error("Sidebar doesn't exist!");
  const updateRefs = (ref, show) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  (() => elements.map((element, index) => indexes.push(element)))();

  return [<Sidebar {...{ indexes, refs }} />, setElements, updateRefs];
};
