import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base-req.dto';

export class CreateUserReqDto extends PickType(UserBaseReqDto, [
  'age',
  'name',
  'email',
  'phone',
  'gender',
  'password',
  'isStudent',
  'cars',
]) {}
