import React from 'react';
import type { Tag as TagType } from '../../types';
import styles from './Tag.module.scss';

export interface ITagProps {
  name: TagType;
}

const Tag: React.FC<ITagProps> = ({ name }) => {
  return <div className={styles.Tag}>{name}</div>;
};

export default Tag;
