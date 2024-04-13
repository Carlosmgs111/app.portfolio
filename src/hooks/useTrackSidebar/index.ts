import { useState, useMemo, useEffect } from "react";
import { TrackSidebar } from "../../components/Sidebars/TrackSidebar";
import { cloneElement, Children } from "react";
import { useNearScreen } from "../../hooks/useNearScreen";

const wrapperProvider = ({ setIndexes, refreshRefs, indexes, items }: any) => {
  return useMemo(
    () =>
      ({ children }: any): any => {
        const [elements, setElements]: any = useState([]);
        const [, ref] = useNearScreen(false, refreshRefs);
        useEffect(() => {
          setIndexes(
            Children.toArray(children).map((child: any): any => child.props.id)
          );
          setElements(
            Children.toArray(children).map((child: any): any =>
              cloneElement(child, { ref })
            )
          );
        }, []);
        indexes.map((innerIndex: any) => items.push(innerIndex));
        return elements;
      },
    [items]
  );
};

export const useTrackSidebar = () => {
  const items: any = [];
  const [refs, setRefs]: any = useState([]);
  const [indexes, setIndexes]: any = useState([]);
  const WrappedTrackSidebar: any = useMemo(
    () => (props: any) =>
      TrackSidebar({
        ...props,
        items,
        refs,
        id: "track-sidebar",
      }),
    [indexes]
  );

  const refreshRefs = (ref: any, show: boolean) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };

  const ElementWrapper = wrapperProvider({
    refreshRefs,
    setIndexes,
    items,
    indexes,
  });

  return [WrappedTrackSidebar, ElementWrapper, setIndexes, refreshRefs];
};
