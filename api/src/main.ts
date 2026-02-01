import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

function parseBool(v: string | undefined, defaultValue = false){
    if (v === undefined) return defaultValue;
    return ['1', 'true', 'yes', 'y', 'on'].includes(v.toLowerCase());
}

function parseOrigins(v: string | undefined): string[]{
    if (!v) return [];
    return v.split(',').map((s)=> s.trim()).filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());

  const corsEnabled = parseBool(config.get<string>('CORS_ENABLED'));
  if (corsEnabled) {
      const origins = parseOrigins(config.get<string>('CORS_ORIGINS'));
      const corsCredentials = parseBool(config.get<string>('CORS_CREDENTIALS'));

      app.enableCors({
          origin: (origin, callback) => {
              if (!origin) return callback(null, true);
              if (origins.length === 0) return callback(new Error('CORS_ORIGINS is empty'));
              return origins.includes(origin) ? callback(null, true) : callback(new Error(`CORS blocked for origin: ${origin}`));
          },
          credentials: corsCredentials,
      });
  }

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  await app.listen(config.get<number>('PORT') as number);
}
bootstrap();
