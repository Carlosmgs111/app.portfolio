import { useState } from "react";
import { ProjectsSidebar } from "../../components/Sidebars/ProjectsSidebar";

/**
 * It returns a rendered sidebar component and two functions to update the state of the sidebar
 * @param [initialElements] - The initial elements to be passed to the sidebar.
 * @param key - The key of the element that will be used to identify it.
 * @returns An array of three elements. The first element is the sidebar being rendered. The
 * second element is a function that updates the state of the elements. The third element is a function
 * that updates the state of the refs.
 */

export const useSidebar = (initialElements = [], key) => {
  const indexes = [];

  const [elements, setElements] = useState(initialElements);
  const [refs, setRefs] = useState([]);

  const extractIndexes = () =>
    elements.map((element, index) => indexes.push(element[key]));

  const updateRefs = (ref, show) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  extractIndexes();
  return [<ProjectsSidebar {...{ indexes, refs }} />, setElements, updateRefs];
};
