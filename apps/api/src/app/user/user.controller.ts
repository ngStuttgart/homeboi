import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginPostDto } from './dto/login.post.dto';
import { UserService } from './user.service';
import { UserPostDto } from './dto/user.post.dto';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginPostDto, @Res() response: Response) {
    const userResponse = await this.userService.login(credentials.email, credentials.password);
    if (!userResponse) {
      throw new UnauthorizedException();
    }
    const absolutlySecureLogin = Buffer.from(JSON.stringify({
      password: userResponse.password,
      email: userResponse.email
    })).toString('base64');
    response.setHeader('Set-Cookie', `homeboi-login=${absolutlySecureLogin}; Path=/; Max-Age=6000;`);
    delete userResponse.password;
    response.json(userResponse);
  }

  @Post('signup')
  async signup(@Body() user: UserPostDto) {
    return this.userService.signup(user);
  }

  @Get()
  async user(@User() user: UserEntity): Promise<UserEntity> {
    return await this.userService.getUser(user);
  }
}
