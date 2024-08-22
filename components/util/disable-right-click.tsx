'use client';

import { useEffect } from 'react';

const DisableRightClick: React.FC = () => {
  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return null;
};

export default DisableRightClick;