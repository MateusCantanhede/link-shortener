import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShortenerModule } from './shortener/shortener.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from './shortener/entities/shortener.entity';
import { FaviconMiddleware } from './middlewares/favicon-middleware';
import * as process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Shortener],
      synchronize: true,
    }),
    ShortenerModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FaviconMiddleware).forRoutes('*');
  }
}
