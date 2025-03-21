import { useState, useCallback, useRef, useEffect } from "react";
import { TrackSidebar as WrappedTrackSidebar } from "../../components/TrackSidebar";
import { cloneElement, Children } from "react";
import { Refs } from "../../components/Refs";
import { Memo } from "../../components/Memo";
import { mapToList } from "../../utils";

const WrappedElement = ({
  children: child,
  indexes,
  index,
  setIndexes,
}: any) => {
  const { id, title } = child.props;
  useEffect(() => {
    indexes[index] = {
      reference: id,
      title,
      isVisible: indexes[index]?.isVisible,
    };
    setIndexes({ ...indexes });
  }, [id, title]);

  return (
    <Memo deps={[child.props]}>
      <div id={id}>
        {cloneElement(child, {
          ...child.props,
        })}
      </div>
    </Memo>
  );
};

export const useTrackSidebar = () => {
  const [indexes, setIndexes]: any = useState({});
  const elementsIndexes = useRef([]);

  const TrackSidebar = useCallback((props: any) => {
    return (
      <WrappedTrackSidebar
        {...{
          ...props,
          items: indexes,
        }}
      />
    );
  }, []);

  const ContentWrapper = useCallback(({ children }: any): any => {
    if(!children)return null
    useEffect(() => {
      mapToList(indexes).forEach((_: any, index: any) => {
        if (index > children.length - 1) delete indexes[index];
      });
    }, [children.length]);
    return (
      <Refs $refs={elementsIndexes}>
        {Children.toArray(children).map((child: any, index) => (
          <WrappedElement
            key={index}
            {...{
              indexes,
              setIndexes,
              index,
              $useCurrent: (current: any) => {
                let onGone = () => {};
                if (child.props.$useCurrent) {
                  onGone = child.props.$useCurrent(current);
                }
                current;
                if (!current) return;
                const observer: any = new window.IntersectionObserver(
                  (entries) => {
                    const { isIntersecting }: any = entries[0];
                    indexes[index] = {
                      ...indexes[index],
                      isVisible: isIntersecting,
                    };
                    setIndexes({ ...indexes });
                  },
                  { threshold: 0.5 }
                ).observe(current);
                return () => {
                  observer?.disconnect();
                  onGone();
                };
              },
            }}
          >
            {child}
          </WrappedElement>
        ))}
      </Refs>
    );
  }, []);
  return { TrackSidebar, ContentWrapper };
};
