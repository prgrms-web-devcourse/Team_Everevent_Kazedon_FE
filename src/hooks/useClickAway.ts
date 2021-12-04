import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = (handler: Function) => {
  const ref = useRef<HTMLDivElement>(null);
  const savedHandler = useRef<Function>(handler);

  useEffect(() => {
    savedHandler.current = handler; // 핸들러 함수가 변하더라도 다시 지우고 이벤트를 추가시키지 않도록 함.
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e: any) => {
      if (!element.contains(e.target)) {
        savedHandler.current(e);
      }
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
