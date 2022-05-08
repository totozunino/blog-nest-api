import {
  Body,
  Delete,
  Get,
  Controller,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.postsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
