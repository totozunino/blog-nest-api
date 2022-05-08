import {
  Body,
  Delete,
  Get,
  Controller,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdatePostDto) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
