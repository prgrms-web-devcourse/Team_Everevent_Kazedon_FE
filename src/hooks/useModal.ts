import { useEffect, useMemo } from 'react';

import useClickAway from '@hooks/useClickAway';

const useModal = ({ onClose }: { onClose: () => void }) => {
  const clickRef = useClickAway(() => {
    if (onClose) onClose();
  });

  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });

  return [clickRef, el];
};

export default useModal;
