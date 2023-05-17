import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../assets/more-icon.svg';
import styles from './More.module.scss';
import useClickOutside from '../../hooks/useClickOutside';

interface IMoreItem {
  title: string;
  onClick(): void;
}

interface IMoreProps {
  items: IMoreItem[];
}

interface IMenuProps {
  items: IMoreItem[];
  menuHandle: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Menu: React.FC<IMenuProps> = ({ items, menuHandle, containerRef }) => {
  useClickOutside(containerRef, () => menuHandle(false));

  return (
    <div className={styles.More__menu}>
      {items.map(({ title, onClick }, key) => (
        <div
          onClick={() => {
            onClick();
            menuHandle(false);
          }}
          key={title + key}
          className={styles.More__item}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

const More: React.FC<IMoreProps> = ({ items }) => {
  const [menu, setMenu] = React.useState(false);
  const moreRef = React.useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className={styles.More} ref={moreRef}>
      <ReactSVG src={icon} onClick={toggleMenu} className={styles.More__icon} />
      {menu && (
        <Menu items={items} menuHandle={setMenu} containerRef={moreRef} />
      )}
    </div>
  );
};

export default More;
