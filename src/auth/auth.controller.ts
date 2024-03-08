import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './DTO/regDTO';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/loginDTO';
import { Public } from './DTO/constants';
import { ApiOperation,  ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './DTO/userEnity';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}


  @ApiOperation({summary: "Регистрирует пользователя"})
  @ApiResponse({status: 201, type: User})
  @Public()
  @Post('/reg')
  regUser(@Body() body: AuthDTO) {
    return this.authService.regUser(body)
  }


  @ApiOperation({summary: "Выдаёт токен"})
  @ApiResponse({status: 201})
  @Public()
  @Post()
  login(@Body() body: LoginDTO) {
    return this.authService.login(body)
  }
}
