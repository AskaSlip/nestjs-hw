export class CreateUserReqDto {
  // @ApiProperty({ description: 'User Name', example: 'John Moo' })
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly age?: number;
  readonly role: string;
}
