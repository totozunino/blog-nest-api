import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: +id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.preload({
      id: +id,
      ...updatePostDto,
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: +id });

    return this.postRepository.remove(post);
  }
}
