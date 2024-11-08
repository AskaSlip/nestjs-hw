import { ConflictException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/acticle.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleDto } from '../models/dto/req/create-article.dto';
import { ListArticleQueryDto } from '../models/dto/req/list-article-query.req.dto';
import { UpdateArticleDto } from '../models/dto/req/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articlesRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const tags = await this.createTags(dto.tags);

    return await this.articlesRepository.save(
      this.articlesRepository.create({
        ...dto,
        tags,
        user_id: userData.userId,
      }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: ListArticleQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articlesRepository.findAll(userData, query);
  }

  public async findOne(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    return await this.articlesRepository.getById(userData, articleId);
  }

  public async update(
    userData: IUserData,
    articleId: ArticleID,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return {} as any;
  }

  public async like(userData: IUserData, articleId: ArticleID): Promise<void> {
    const article = await this.articlesRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new ConflictException('Article not found');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (like) {
      throw new ConflictException('Already liked');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: articleId,
      }),
    );
  }

  public async unlike(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<void> {
    const article = await this.articlesRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new ConflictException('Article not found');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (!like) {
      throw new ConflictException('Not liked yet');
    }
    await this.likeRepository.remove(like);
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || !tags.length) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
