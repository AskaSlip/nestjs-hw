import { OmitType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';
//omit extends without this properties
export class UsersResDto extends OmitType(UserBaseResDto, [
  'createdAt',
  'updatedAt',
]) {}
