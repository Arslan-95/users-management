import React from 'react';
import styles from './More.module.scss';

interface IMoreItem {
  title: string;
  onClick(): void;
}

interface IMoreProps {
  items: IMoreItem[];
}

const More: React.FC<IMoreProps> = ({ items }) => {
  return (
    <div className={styles.More}>
      <img className={styles.More__icon} />
      <div className={styles.More__items}>
        {items.map(({ title, onClick }, key) => (
          <div
            onClick={onClick}
            key={title + key}
            className={styles.More__item}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
