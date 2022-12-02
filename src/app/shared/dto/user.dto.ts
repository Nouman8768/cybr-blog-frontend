export class UserDto {
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
  user: JwtTokenUser;
}

interface JwtTokenUser {
  firstname: string;

  lastname: string;

  username: string;

  password: string;

  confirmpassword: string;

  image: string;

  role: number;

  refreshToken: string;
}
