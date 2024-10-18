import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, Config } from '../../../configs/config.type';
import { CreateUserReqDto } from '../models/dto/req/create-user-req.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user-req.dto';
import { UsersResDto } from '../models/dto/res/user-res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService<Config>) {}

  public async create(createUserDto: CreateUserReqDto): Promise<UsersResDto> {
    const appConfig = this.configService.get<AppConfig>('database');
    console.log(appConfig);
    return {} as UsersResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    //check if user can do it
  }
}