import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigurationModule,
    PostsModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
