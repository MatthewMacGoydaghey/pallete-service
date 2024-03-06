import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/DTO/userEnity';
import { ConfigModule } from '@nestjs/config';
import { PalletesModule } from './palletes/palletes.module';
import { Pallete } from './palletes/DTO/palleteEntity';
import { ColorsModule } from './colors/colors.module';
import { Color } from './colors/DTO/colorEntity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Pallete, Color],
    synchronize: true,
  }),
   AuthModule,
   PalletesModule,
   ColorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
