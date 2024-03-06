import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './DTO/regDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './DTO/userEnity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginDTO } from './DTO/loginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private jwtSerice: JwtService
  ) {}



  async regUser(body: AuthDTO) {
    const {userName, login, password} = body
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = {
      userName,
      login,
      password: hashedPassword
    }
    const savedUser = await this.UserRepository.save(newUser)
    return savedUser
  }


  async login(body: LoginDTO) {
    const {login, password} = body
    const foundUser = await this.UserRepository.findOneBy({login: login})
    if (!foundUser) {
      throw new NotFoundException({Message: `User with login ${login} not found`})
    }
    const pwdCorrect = await bcrypt.compare(password, foundUser.password)
    if (!pwdCorrect) {
      throw new UnauthorizedException({message: 'Incorrect password'})
    }
    
    const payload = {
      id: foundUser.id,
      login: foundUser.login
    }

    const token = this.jwtSerice.sign(payload)
    return token
  }



}
