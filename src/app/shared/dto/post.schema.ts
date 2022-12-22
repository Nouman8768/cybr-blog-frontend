import { UserDto } from './user.dto';

export interface Post {
  _id: string;

  title: string;

  category: string;

  body: string;

  image: string;

  slug: string;

  author: UserDto;

  text: string;
}
