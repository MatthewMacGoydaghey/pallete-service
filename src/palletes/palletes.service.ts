import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PalletDTO } from './DTO/palletDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Pallete } from './DTO/palleteEntity';
import { Repository } from 'typeorm';
import { AuthorizedRequest } from 'src/auth/DTO/constants';
import { User } from 'src/auth/DTO/userEnity';
import { first } from 'rxjs';

@Injectable()
export class PalletesService {
  constructor(
    @InjectRepository(Pallete) private PalleteRepository: Repository<Pallete>,
    @InjectRepository(User) private UserRepository: Repository<User>
  ) {}


  async getPalletes(req: AuthorizedRequest) {
    const { id } = req.user
    const foundUser = await this.UserRepository.findOneBy({id: id})
    const userPalletes = await this.PalleteRepository.find({where: {user: foundUser}})
    return userPalletes
  }

  async getPallete(id: number, req: AuthorizedRequest) {
    const userId = req.user.id
    const verified = await this.verifyPallete(id, userId)
    return verified.pallete
  }


  async createPallete(PalletDTO: PalletDTO, req: AuthorizedRequest) {
    const { palleteName } = PalletDTO
    const currentUser = req.user
    const foundUser = await this.UserRepository.findOneBy({id: currentUser.id})
    const newPallete = {
      user: foundUser,
      palleteName
    }
    return this.PalleteRepository.save(newPallete)
  }


  async updatePallete(id: number, updatedPallete: PalletDTO, req: AuthorizedRequest) {
    const userId = req.user.id
    const verified = await this.verifyPallete(id, userId)
    verified.pallete.palleteName = updatedPallete.palleteName
    return this.PalleteRepository.save(verified.pallete)
  
  }


  async deletePallete(id: number, req: AuthorizedRequest) {
    const userId = req.user.id
    const verified = await this.verifyPallete(id, userId)
    await this.PalleteRepository.delete(verified.pallete)
    return `Палитра ${verified.pallete.palleteName} удалена`
  }


  async verifyPallete(palleteId: number, userId: number) {
    const foundUser = await this.UserRepository.findOneBy({id: userId})
    const foundPallete = await this.PalleteRepository.findOne({where: {id: palleteId}, relations: {user: true}})
    if (!foundPallete) {
      throw new NotFoundException({message: 'Указанная палитра не найдена'})
    }
    if (!(foundPallete.user.id === foundUser.id)) {
      throw new ForbiddenException({message: 'Вы не имеете доступа к чужим палитрам'})
    }
    return {
      user: foundUser,
      pallete: foundPallete
    }
  }

}
