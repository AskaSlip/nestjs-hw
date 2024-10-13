import { Injectable } from '@nestjs/common';

import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/users.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
  ) {}

  create(dto: CreateArticleDto) {
    this.usersService.checkAbilityToEditArticle('authorId', 'articleId');
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    this.commentsService.deleteAllCommentsForArticle('articleId');
    return `This action removes a #${id} article`;
  }
}
