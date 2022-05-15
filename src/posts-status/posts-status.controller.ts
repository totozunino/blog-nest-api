import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsStatusService } from './posts-status.service';

@ApiTags('posts-status')
@Controller('posts-status')
export class PostsStatusController {
  constructor(private readonly postsStatusService: PostsStatusService) {}

  @Get()
  findAll() {
    return this.postsStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsStatusService.findOne(id);
  }
}
