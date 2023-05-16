type Permission = string;

export type ID = string;
export type Email = string;
export type Image = string;
export type Name = string;
export type Permissions = Permission[];

export interface IUserDetails {
  id: ID;
  email: Email;
  image: Image;
  name: Name;
  permissions: Permissions;
}

export interface IUser extends IUserDetails {
  details: IUserDetails;
}

class User implements IUser {
  readonly id;
  readonly email;
  readonly image;
  readonly name;
  readonly permissions;

  constructor(
    id: ID,
    email: Email,
    image: Image,
    name: Name,
    permissions: Permissions
  ) {
    this.id = id;
    this.email = email;
    this.image = image;
    this.name = name;
    this.permissions = permissions;
  }

  public get details() {
    return {
      id: this.id,
      email: this.email,
      image: this.image,
      name: this.name,
      permissions: this.permissions,
    };
  }
}

export default User;
