import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserReqDto } from './dto/req/create-user-req.dto';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import { UserListRequestDto } from './dto/req/user-list-req.dto';
import { UsersResDto } from './dto/res/user-res.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiOperation({
    summary: 'Create user',
    description: 'Create new user',
    deprecated: true,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserReqDto): Promise<UsersResDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: UserListRequestDto) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
