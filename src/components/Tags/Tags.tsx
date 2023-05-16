import React from 'react';
import { Tag } from '..';
import type { Tag as TagType } from '../../types';
import styles from './Tags.module.scss';

interface ITagsProps {
  items: TagType[];
}

const Tags: React.FC<ITagsProps> = ({ items }) => {
  return (
    <div className={styles.Tags}>
      {items.map((name, index) => (
        <Tag name={name} key={name + index} />
      ))}
    </div>
  );
};

export default Tags;
