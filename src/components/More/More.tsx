import React from 'react';
import styles from './More.module.scss';
import { ReactSVG } from 'react-svg';
import icon from '../../assets/more-icon.svg';

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
  containerElement: Node | null;
}

const Menu: React.FC<IMenuProps> = ({
  items,
  menuHandle,
  containerElement,
}) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!containerElement) return;

    if (!containerElement.contains(e.target as Node)) {
      menuHandle(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

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
  const moreElement = moreRef.current || null;

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className={styles.More} ref={moreRef}>
      <ReactSVG src={icon} onClick={toggleMenu} className={styles.More__icon} />
      {menu && (
        <Menu
          items={items}
          menuHandle={setMenu}
          containerElement={moreElement}
        />
      )}
    </div>
  );
};

export default More;
