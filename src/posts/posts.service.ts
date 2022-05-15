import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PostStatusOptions } from 'src/enums';
import { PostStatus } from 'src/posts-status/entities/post-status.entity';
import { PostsStatusService } from 'src/posts-status/posts-status.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @Inject('POSTS_SERVICE') private readonly client: ClientProxy,
    private readonly postsStatusService: PostsStatusService,
  ) {}

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostStatus> {
    const postStatus = await this.postsStatusService.create({
      status: PostStatusOptions.IN_PROGRESS,
    });

    // setTimeout(() => {
    //   if (Math.floor(Math.random() * 10) > 8) {
    //     this.postsStatusService.update(postStatus.id, {
    //       status: PostStatusOptions.FAILED,
    //     });
    //   } else {
    this.client.emit('post-created', {
      postStatusId: postStatus.id,
      createdPostDto: createPostDto,
    });
    // }
    // }, 5000);

    return postStatus;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.preload({
      id,
      ...updatePostDto,
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    return this.postRepository.remove(post);
  }
}
