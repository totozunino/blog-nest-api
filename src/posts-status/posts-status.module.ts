import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatus } from './entities/post-status.entity';
import { PostsStatusController } from './posts-status.controller';
import { PostsStatusService } from './posts-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostStatus])],
  controllers: [PostsStatusController],
  providers: [PostsStatusService],
  exports: [PostsStatusService],
})
export class PostsStatusModule {}
