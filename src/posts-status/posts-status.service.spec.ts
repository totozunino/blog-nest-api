import { Test, TestingModule } from '@nestjs/testing';
import { PostsStatusService } from './posts-status.service';

describe('PostsStatusService', () => {
  let service: PostsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsStatusService],
    }).compile();

    service = module.get<PostsStatusService>(PostsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
