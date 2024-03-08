import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { PalletesService } from './palletes.service';
import { PalletDTO } from './DTO/palletDTO';
import { AuthorizedRequest } from 'src/auth/DTO/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pallete } from './DTO/palleteEntity';

@ApiTags('Палитры')
@Controller('palletes')
export class PalletesController {
  constructor(
    private readonly palletesService: PalletesService
  ) {}


  @ApiOperation({summary: "Возвращает все имеющиеся у пользователя палитры"})
  @ApiResponse({status: 200, type: [Pallete]})
  @Get()
  getPalletes(@Req() req: AuthorizedRequest) {
    return this.palletesService.getPalletes(req)
  }

  @ApiOperation({summary: "Возвращает указанную палитру"})
  @ApiResponse({status: 200, type: [Pallete]})
  @Get(':id')
  getPallete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthorizedRequest) {
    return this.palletesService.getPallete(id, req)
  }

  @ApiOperation({summary: "Создаёт палитру"})
  @ApiResponse({status: 200, type: Pallete})
  @Post()
  createPallet(@Body() PalletDTO: PalletDTO, @Req() req: AuthorizedRequest) {
    return this.palletesService.createPallete(PalletDTO, req)
  }


  @ApiOperation({summary: "Обновляет указанную палитру"})
  @ApiResponse({status: 200, type: [Pallete]})
  @Put(':id')
  updatePallete(@Param('id', ParseIntPipe) id: number, @Body() updatedPallete: PalletDTO, @Req() req: AuthorizedRequest) {
    return this.palletesService.updatePallete(id, updatedPallete, req)
  }


  @ApiOperation({summary: "Удаляет указанную палитру"})
  @ApiResponse({status: 200})
  @Delete(':id')
  deletePallete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthorizedRequest) {
    return this.palletesService.deletePallete(id, req)
  }
}
