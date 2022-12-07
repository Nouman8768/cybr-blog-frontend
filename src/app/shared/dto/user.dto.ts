export class UserDto {
  _id!: string;

  firstname!: string;

  lastname!: string;

  username!: string;

  password!: string;

  confirmpassword!: string;

  image!: string;

  role!: number;

  refreshToken!: string;
}
export interface LooggedUser {
  user: string;
}

// interface JwtTokenUser {
//   _id: string;

// }
