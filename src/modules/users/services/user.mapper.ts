import * as process from 'node:process';

import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { UserResDto } from '../models/dto/res/user-res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      image: `${process.env.AWS_S3_ENDPOINT}/${user.image}`,
      isFollowed: user.followings?.length > 0 || false,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      email: user.email,
      deviceId: jwtPayload.deviceId,
    };
  }
}
