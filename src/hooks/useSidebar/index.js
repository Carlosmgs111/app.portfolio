import { useState } from "react";
import { ProjectsSidebar } from "../../components/Sidebars/ProjectsSidebar";

/**
 * It returns a function that renders a sidebar, a function that updates the elements, and a function
 * that updates the refs
 * @param [initialElements] - The initial elements to be passed to the sidebar.
 * @param key - the key of the element that will be used to identify it
 * @returns A function that returns a component.
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

  return [() => ProjectsSidebar({ indexes, refs }), setElements, updateRefs];
};
