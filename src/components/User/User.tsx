import React from 'react';
import { IUser } from '../../utils/User';
import { More, Tags } from '..';
import UserRolesEditor from '../UserPermissionsEditor/UserPermissionsEditor';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/api/api';
import styles from './User.module.scss';

interface IUserProps {
  children?: React.ReactNode;
  user: IUser;
}

const User: React.FC<IUserProps> = ({ user }) => {
  const { id, name, email, image, permissions } = user.details;
  const [deleteUser] = useDeleteUserMutation();
  const [isEditor, setIsEditor] = React.useState(false);
  const { refetch } = useGetUsersQuery();

  const openEditor = () => {
    setIsEditor(true);
  };

  const closeEditor = () => {
    setIsEditor(false);
  };

  const moreOptions = [
    {
      title: 'Изменить права доступа',
      onClick: openEditor,
    },
    {
      title: 'Удалить',
      onClick: () => {
        deleteUser(id).then(() => {
          refetch();
        });
      },
    },
  ];

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
      <div className={styles.User__more}>
        <More items={moreOptions} />
        {isEditor && <UserRolesEditor user={user} onClose={closeEditor} />}
      </div>
    </div>
  );
};

export default User;
