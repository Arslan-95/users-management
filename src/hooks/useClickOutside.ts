import React from 'react';

const useClickOutside = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  cb: () => void
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!ref.current) return;

    if (!ref.current.contains(e.target as Node)) {
      cb();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
