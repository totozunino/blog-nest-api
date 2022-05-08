import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(8)
  readonly title: string;

  @IsString()
  @MinLength(25)
  readonly content: string;
}
