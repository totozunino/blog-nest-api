import { Test, TestingModule } from '@nestjs/testing';
import { PostsStatusController } from './posts-status.controller';

describe('PostsStatusController', () => {
  let controller: PostsStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsStatusController],
    }).compile();

    controller = module.get<PostsStatusController>(PostsStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
