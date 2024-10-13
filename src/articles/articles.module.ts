import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CommentsModule } from "../comments/comments.module";

@Module({
  imports: [UsersModule, CommentsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
