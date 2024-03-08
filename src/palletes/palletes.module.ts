import { Module } from '@nestjs/common';
import { PalletesController } from './palletes.controller';
import { PalletesService } from './palletes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pallete } from './DTO/palleteEntity';
import { User } from 'src/auth/DTO/userEnity';

@Module({
  imports: [TypeOrmModule.forFeature([Pallete, User])],
  controllers: [PalletesController],
  providers: [PalletesService]
})
export class PalletesModule {}
