import React from 'react';
import { IUserDetails } from '../../utils/User';
import { More, Tags } from '..';
import styles from './User.module.scss';

interface IUserProps extends IUserDetails {
  children?: React.ReactNode;
}

const User: React.FC<IUserProps> = ({ email, name, image, permissions }) => {
  return (
    <div className={styles.User}>
      <img src={image} alt={name} className={styles.User__image} />
      <div className={styles.User__content}>
        <div>
          <span className={styles.User__name}>{name}</span>
          <span className={styles.User__email}>{email}</span>
        </div>
        <div className={styles.User__tags}>
          <Tags items={permissions} />
        </div>
      </div>
      <More></More>
    </div>
  );
};

export default User;
