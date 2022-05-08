import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PSQL_HOST: Joi.string().required(),
        PSQL_PORT: Joi.number().default(5432),
        PSQL_USERNAME: Joi.string().required(),
        PSQL_PASSWORD: Joi.string().required(),
        PSQL_DB: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigurationModule {}
