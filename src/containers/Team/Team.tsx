import React from 'react';
import { Users } from '../../components';
import styles from './Team.module.scss';

const Team: React.FC = () => {
  return (
    <div className={styles.Team__wrapper}>
      <div className={styles.Team}>
        <Users />
      </div>
    </div>
  );
};

export default Team;
