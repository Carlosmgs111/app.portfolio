import { useState } from "react";
import { TrackSidebar } from "../../components/Sidebars/TrackSidebar";

export const useTrackSidebar = (props?: any) => {
  const items: any = [];
  const [elements, setElements] = useState([]);
  const [refs, setRefs]: any = useState([]);

  const refreshRefs = (ref: any, show: boolean) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  (() => elements.map((element, index) => items.push(element)))();

  return [
    TrackSidebar({
      props,
      items,
      refs,
      id: "track-sidebar",
    }),
    setElements,
    refreshRefs,
  ];
};