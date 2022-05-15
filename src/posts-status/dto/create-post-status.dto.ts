import { IsEnum } from 'class-validator';
import { PostStatusOptions } from 'src/enums';

export class CreatePostStatusDto {
  @IsEnum(PostStatusOptions)
  readonly status: PostStatusOptions;
}
