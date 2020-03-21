import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const cookieData = req.cookies['homeboi-login'] ?? Buffer.from('{}').toString('base64');
    const homeboiLogin = JSON.parse(Buffer.from(cookieData, 'base64').toString());
    const user = await getRepository(UserEntity).findOne({
      password: homeboiLogin.password,
      email: homeboiLogin.email
    });
    if (user) {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
