import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/acticle.repository';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository, ArticleRepository];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
