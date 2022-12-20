export class UserDto {
  _id!: string;

  firstname!: string;

  lastname!: string;

  username!: string;

  password!: string;

  confirmpassword!: string;

  image!: string;

  role!: Role[];

  refreshToken!: string;

  isActive!: boolean;
}
export interface LooggedUser {
  user: string;
}
export enum Role {
  USER = 0,
  ADMIN = 1,
  BAN = 2,
}
