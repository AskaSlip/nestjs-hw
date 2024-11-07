import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResDto } from './models/dto/res/tag.res.dto';
import { TagService } from './services/tag.service';
import { TagMapper } from './services/tag-mapper';

@ApiBearerAuth()
@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagResDto[]> {
    const result = await this.tagService.getPopular();
    return TagMapper.toResListDto(result);
  }
}
