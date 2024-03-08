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
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
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
