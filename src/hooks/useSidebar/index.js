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
  initialElements = [],
  key,
  component = sidebars["ProjectsSidebar"] /* ! set a fallback sidebar component */
) => {
  const indexes = [];
  const [elements, setElements] = useState(initialElements);
  const [refs, setRefs] = useState([]);
  const Sidebar =
    typeof component === "string" ? sidebars[component] : component;
  if(!Sidebar) throw new Error("Sidebar doesn't exist!")
  /**
   * If the show parameter is true, and the ref parameter is not in the refs array, then add the ref
   * parameter to the refs array.
   * If the show parameter is false, and the ref parameter is in the refs array, then remove the ref
   * parameter from the refs array.
   * Then, set the refs state to the refs array.
   * @param ref - the ref of the component that is being updated
   * @param show - boolean
   */
  const updateRefs = (ref, show) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  (() => elements.map((element, index) => indexes.push(element[key])))();

  return [<Sidebar {...{ indexes, refs }} />, setElements, updateRefs];
};
