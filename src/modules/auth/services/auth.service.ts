import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/services/user.mapper';
import { generateAndSaveTokens } from '../helpers/tokens.helper';
import { SignInReqDto } from '../models/dto/req/sign-in-req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up-req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      user.id,
      dto.deviceId,
    );
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      user.id,
      dto.deviceId,
    );

    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);

    return await generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      userData.userId,
      userData.deviceId,
    );
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
