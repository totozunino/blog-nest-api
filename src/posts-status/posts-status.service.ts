import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostStatus } from 'src/posts-status/entities/post-status.entity';
import { Repository } from 'typeorm';
import { CreatePostStatusDto } from './dto/create-post-status.dto';

@Injectable()
export class PostsStatusService {
  constructor(
    @InjectRepository(PostStatus)
    private readonly postStatusRepository: Repository<PostStatus>,
  ) {}

  findAll() {
    return this.postStatusRepository.find();
  }

  async findOne(id: number): Promise<PostStatus> {
    const postStatus = await this.postStatusRepository.findOneBy({ id });
    if (!postStatus) {
      throw new NotFoundException(`Post Status #${id} not found`);
    }
    return postStatus;
  }

  create(createPostStatusDto: CreatePostStatusDto): Promise<PostStatus> {
    const postStatus = this.postStatusRepository.create({
      status: createPostStatusDto.status,
    });
    return this.postStatusRepository.save(postStatus);
  }

  async update(id: number, status: CreatePostStatusDto): Promise<PostStatus> {
    const postStatus = await this.postStatusRepository.preload({
      id,
      ...status,
    });

    if (!postStatus) {
      throw new NotFoundException(`Post Status #${id} not found`);
    }

    return this.postStatusRepository.save(postStatus);
  }
}
