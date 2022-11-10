import { useState } from "react";
import { TrackSidebar } from "../../components/Sidebars/TrackSidebar";

export const useTrackSidebar = () => {
  const items = [];
  const [elements, setElements] = useState([]);
  const [refs, setRefs] = useState([]);

  const updateRefs = (ref, show) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  (() => elements.map((element, index) => items.push(element)))();

  return [
    <TrackSidebar {...{ items, refs, id: "track-sidebar" }} />,
    setElements,
    updateRefs,
  ];
};
