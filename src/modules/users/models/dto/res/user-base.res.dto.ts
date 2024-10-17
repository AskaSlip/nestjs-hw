export class UserBaseResDto {
  id: string;
  email: string;
  name: string;
  password: string;
  gender: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}
