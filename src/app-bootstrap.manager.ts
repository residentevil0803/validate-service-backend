import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { json } from 'express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { InternalServerErrorExceptionsFilter } from './common/filters/internal-server-error-exceptions.filter';
import { Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ApiKeyOrJwtGuard } from './auth/guards/api-key-or-jwt.guard';

export class AppBootstrapManager {
  static getTestingModuleBuilder(): TestingModuleBuilder {
    return Test.createTestingModule({
      imports: [AppModule],
    });
  }

  static setAppDefaults(app: INestApplication): INestApplication {
    const reflector = app.get(Reflector);

    useContainer(app.select(AppModule), { fallbackOnErrors: true, fallback: true });

    app
      .use(json({ limit: '50mb' }))
      .use(cookieParser())
      .setGlobalPrefix('api/v1')
      .useGlobalGuards(new ApiKeyOrJwtGuard(reflector))
      .useGlobalFilters(new InternalServerErrorExceptionsFilter())
      .useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          validationError: {
            target: false,
          },
          stopAtFirstError: true,
          forbidNonWhitelisted: true,
        }),
      );

    return app;
  }
}
