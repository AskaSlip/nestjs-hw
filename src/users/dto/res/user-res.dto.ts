export class UsersResDto {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}
