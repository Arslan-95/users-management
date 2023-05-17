import React from 'react';
import { Tag } from '../../types';
import { useEditUserMutation, useGetTagsQuery } from '../../redux/api/api';
import useClickOutside from '../../hooks/useClickOutside';
import { Checkbox } from '../../UI';
import { IUser } from '../../utils/User';
import _ from 'lodash';
import styles from './UserPermissionsEditor.module.scss';

interface IUserPermissionsEditorProps {
  user: IUser;
  onClose: () => void;
}

const UserPermissionsEditor: React.FC<IUserPermissionsEditorProps> = ({
  user,
  onClose,
}) => {
  const { data: tags } = useGetTagsQuery();
  const [editUser] = useEditUserMutation();
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  const handlePermissionChange = (role: Tag, checked: boolean) => {
    if (!tags) return;

    const allSelectorTag = 'Все';
    const withoutAllFilter = (tag: Tag) => tag !== allSelectorTag;
    const tagsWithoutAll = tags.filter(withoutAllFilter);
    let updatedPermissions = user.details.permissions;

    switch (role) {
      case allSelectorTag:
        updatedPermissions = checked ? tags : [];
        break;
      default: {
        updatedPermissions = tags.filter((tag) =>
          tag === role
            ? checked
            : tag !== allSelectorTag && user.permissions.includes(tag)
        );

        if (_.isEqual(updatedPermissions, tagsWithoutAll)) {
          updatedPermissions = tags;
        }
      }
    }

    const updatedUser = { ...user, permissions: updatedPermissions };

    user.updateDetails(updatedUser);
    editUser(user.details);
  };

  useClickOutside(editorRef, onClose);

  return (
    <div className={styles.UserPermissionsEditor__wrapper}>
      <div className={styles.UserPermissionsEditor} ref={editorRef}>
        {tags &&
          tags.map((role, index) => (
            <Checkbox
              title={role}
              value={user.permissions.includes(role)}
              onChange={(checked) => handlePermissionChange(role, checked)}
              key={role + index}
            />
          ))}
      </div>
    </div>
  );
};

export default UserPermissionsEditor;
