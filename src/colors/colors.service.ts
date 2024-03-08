import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './DTO/colorEntity';
import { Repository } from 'typeorm';
import { AuthorizedRequest } from 'src/auth/DTO/constants';
import { Pallete } from 'src/palletes/DTO/palleteEntity';
import { User } from 'src/auth/DTO/userEnity';
import { ColorDTO } from './DTO/colorDTO';
import { UpdateColorDTO } from './DTO/updateColorDTO';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Pallete) private palletRepository: Repository<Pallete>,
    @InjectRepository(User) private userRepository: Repository<User>
    ) {}


    
  async getColors(palleteId: number, req: AuthorizedRequest) {
    const foundPallete = await this.palletRepository.findOneBy({id: palleteId})
    await this.verifyAccess(palleteId, req.user.id)
    return this.colorRepository.find({where: {pallete: foundPallete}})
  }

  

  async getColor(palleteId: number, colorId: number, req: AuthorizedRequest) {
    const verified = await this.verifyAccess(palleteId, req.user.id)
    const foundColor = await this.colorRepository.findOneBy({id: colorId})
    if (!foundColor) {
      throw new NotFoundException({message: `Цвет с ID ${colorId} не найден`})
    }
    return foundColor
  }



  async addColor(colorDTO: ColorDTO, req: AuthorizedRequest) {
    const verified = await this.verifyAccess(colorDTO.palleteId, req.user.id)
    const colorName = await this.getColorNameFromHEX(colorDTO.HEX)
    const newColor = {
      pallete: verified.foundPallete,
      HEX: colorDTO.HEX,
      colorName
    }
    return this.colorRepository.save(newColor)
  }


  
  async updateColor(id: number, updateBody: UpdateColorDTO, req: AuthorizedRequest) {
    const foundColor = await this.colorRepository.findOne({where: {id: id}, relations: {
      pallete: true
    }})
    if (!foundColor) {
      throw new BadRequestException({message: `Цвет с ID ${id} не найден`})
    }
    await this.verifyAccess(foundColor.pallete.id, req.user.id)
    const colorName = await this.getColorNameFromHEX(updateBody.HEX)
    foundColor.HEX = updateBody.HEX
    foundColor.colorName = colorName
    return this.colorRepository.save(foundColor)
  }

  

  async deleteColor(id: number, req: AuthorizedRequest) {
    const foundColor = await this.colorRepository.findOne({where: {id: id}, relations: {
      pallete: true
    }})
    if (!foundColor) {
      throw new BadRequestException({message: `Цвет с ID ${id} не найден`})
    }
    await this.verifyAccess(foundColor.pallete.id, req.user.id)
    return this.colorRepository.delete(foundColor)
  }


  async getColorNameFromHEX(HEX: string) {
    const request = await fetch(`https://www.thecolorapi.com/id?hex=${HEX}&format=json`, {
      method: 'GET'
    })
    const HEXinfo = await request.json()
    if (HEXinfo.name.distance === null) {
      throw new BadRequestException({message: `Значение ${HEX} не соответсвует ни одному цвету формата HEX`})
    }
    const colorName = HEXinfo.name.value
    return colorName
  }



  async verifyAccess(palleteId: number, userId: number) {
    const foundPallete = await this.palletRepository.findOne({where: {id: palleteId}, relations: {
      user: true
    }})
    if (!foundPallete) {
      throw new NotFoundException({message: `Палитра c ID ${palleteId} не найдена`})
    }
    const foundUser = await this.userRepository.findOne({where: {id: userId}})
    if (!(foundPallete.user.id === foundUser.id)) {
      throw new ForbiddenException({message: 'Вы не имеете доступа к чужим палитрам'})
    }
    const verified = {
      foundPallete,
      foundUser
    }
    return verified
  }
}
