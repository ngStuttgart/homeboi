import { Body, Controller, Post } from '@nestjs/common';
import { LoginPostDto } from './dto/login.post.dto';
import { UserService } from './user.service';
import { UserPostDto } from './dto/user.post.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Post('login')
  login(@Body() credentials: LoginPostDto) {
    return this.userService.login();
  }

  @Post('signup')
  signup(@Body() user: UserPostDto) {
    return this.userService.signup();
  }




}
