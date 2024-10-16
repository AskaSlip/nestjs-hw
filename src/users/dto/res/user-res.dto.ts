import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UsersResDto extends PickType(UserBaseResDto, [
  'id',
  'age',
  'name',
  'email',
  'role',
]) {}
