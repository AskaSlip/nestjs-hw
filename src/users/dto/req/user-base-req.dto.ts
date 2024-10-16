export class UserBaseReqDto {
  // @ApiProperty({ description: 'User Name', example: 'John Moo' })
  name: string;
  email: string;
  password: string;
  age?: number;
  role: string;
}
