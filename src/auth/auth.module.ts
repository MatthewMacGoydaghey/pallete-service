import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './DTO/userEnity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authGuard';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {
        expiresIn: '1h'
      }
    })
],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController]
})
export class AuthModule {}
