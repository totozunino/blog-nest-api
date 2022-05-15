import { PostStatusOptions } from 'src/enums';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PostStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: PostStatusOptions;

  @CreateDateColumn()
  createdAt: Date;
}
