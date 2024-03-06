import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { AuthorizedRequest } from 'src/auth/DTO/constants';
import { ColorDTO } from './DTO/colorDTO';
import { UpdateColorDTO } from './DTO/updateColorDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './DTO/colorEntity';

@ApiTags('Цвета')
@Controller('colors')
export class ColorsController {
  constructor(
    private readonly colorsService: ColorsService
  ) {}


  @ApiOperation({summary: "Возвращает все цвета из указанной палитры"})
  @ApiResponse({status: 200, type: Color})
  @Get('/pallete/:id')
  getColors(@Param('id', ParseIntPipe) id: number, @Req() req: AuthorizedRequest) {
  return this.colorsService.getColors(id, req)
  }

 
  @ApiOperation({summary: "Возвращает один цвет из из указанной палитры", description: "Эндпоинт принимает запрос через query параметры типа colors?palleteID=1&colorID=1"})
  @ApiResponse({status: 200, type: Color})
  @Get()
  getColor(@Query('palleteID') palleteID: number, @Query('colorID') colorID: number, @Req() req: AuthorizedRequest) {
    if (!palleteID || !colorID) {
      throw new BadRequestException({message: 'ID палитры/цвета не найдены как query параметры'})
    }
    return this.colorsService.getColor(palleteID, colorID, req)
  }

  @ApiOperation({summary: "Добавляет цвет в указанную палитру"})
  @ApiResponse({status: 200, type: Color})
  @Post()
  addColor(@Body() colorDTO: ColorDTO, @Req() req: AuthorizedRequest) {
    return this.colorsService.addColor(colorDTO, req)
  }


  @ApiOperation({summary: "Обновляет цвет"})
  @ApiResponse({status: 200, type: Color})
  @Put(':id')
  updatePallete(@Param('id', ParseIntPipe) id: number, @Body() updateBody: UpdateColorDTO, @Req() req: AuthorizedRequest) {
    return this.colorsService.updateColor(id, updateBody, req)
  }


  @ApiOperation({summary: "Удаляет цвет"})
  @ApiResponse({status: 200, type: Color})
  @Delete(':id')
  deletePallete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthorizedRequest) {
    return this.colorsService.deleteColor(id, req)
  }

}
