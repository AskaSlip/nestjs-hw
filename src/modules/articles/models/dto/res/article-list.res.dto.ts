import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../../users/models/dto/res/user-res.dto';
import { ListArticleQueryDto } from '../req/list-article-query.req.dto';
import { ArticleResDto } from './article.res.dto';

export class ArticleListResDto extends ListArticleQueryDto {
  data: ArticleResDto[];
  total: number;
}
