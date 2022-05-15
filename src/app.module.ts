import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/config.module';
import { PostsModule } from './posts/posts.module';
import { PostsStatusModule } from './posts-status/posts-status.module';

@Module({
  imports: [
    ConfigurationModule,
    PostsModule,
    PostsStatusModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PSQL_HOST'),
        port: configService.get<number>('PSQL_PORT'),
        username: configService.get('PSQL_USERNAME'),
        password: configService.get('PSQL_PASSWORD'),
        database: configService.get('PSQL_DB'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
