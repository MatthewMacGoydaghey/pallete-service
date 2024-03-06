import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './DTO/colorEntity';
import { Pallete } from 'src/palletes/DTO/palleteEntity';
import { User } from 'src/auth/DTO/userEnity';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Pallete, User])],
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule {}
