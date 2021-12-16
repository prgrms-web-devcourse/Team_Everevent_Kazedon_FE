import { useEffect, useRef } from 'react';

interface useIntersectionObserverTypes {
  lastIdCurrent: number | string;
  observerCallback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  observerOptions: {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
  };
}
const useIntersectionObserver = ({
  lastIdCurrent,
  observerCallback,
  observerOptions,
}: useIntersectionObserverTypes) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observerRef: HTMLDivElement | null = null;
    if (observerTarget.current) {
      observerRef = observerTarget.current;
    }

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    observer.observe(observerRef as HTMLElement);
    return () => {
      observer.unobserve(observerRef as HTMLElement);
    };

    // TODO: 현재 lastIdCurrent가 변경될 때마다 observer을 만들고 해제할 수 있도록 한다.
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [lastIdCurrent]);

  return {
    observerTarget,
  };
};

export default useIntersectionObserver;
