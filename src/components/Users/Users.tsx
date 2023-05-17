import React from 'react';
import { User } from '..';
import { useGetUsersQuery } from '../../redux/api/api';
import styles from './Users.module.scss';

const Users: React.FC = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <div className={styles.Users}>
      {users &&
        users.map((user) => {
          const { details } = user;

          return <User user={user} key={details.id} />;
        })}
    </div>
  );
};

export default Users;
