import { useState, useMemo, useEffect } from "react";
import { TrackSidebar } from "../../components/Sidebars/TrackSidebar";
import { cloneElement, Children } from "react";
import { useNearScreen, useNearScreenArray } from "../../hooks/useNearScreen";

export const useTrackSidebar = () => {
  const [refs, setRefs]: any = useState([]);
  const [indexes, setIndexes]: any = useState([]);
  const refreshRefs = (ref: any, show: boolean) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };
  const WrappedTrackSidebar: any = useMemo(
    () => (props: any) =>
      TrackSidebar({
        ...props,
        items: indexes,
        refs,
        id: "track-sidebar",
      }),
    [indexes]
  );
  const ElementWrapper = useMemo(
    () =>
      ({ children }: any): any => {
        const _children = Children.toArray(children);
        const [, refs] = useNearScreenArray(_children.map(() => false),refreshRefs);
        useEffect(() => {
          setIndexes(_children.map((child: any) => child.props.id));
        }, []);
        return _children.map((child: any, index: any): any => {
          // const [, ref] = useNearScreen(false, refreshRefs);
          return cloneElement(child, { ref: refs.current[index] });
        });
      },
    []
  );
  return [WrappedTrackSidebar, ElementWrapper, setIndexes, refreshRefs];
};
