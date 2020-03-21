import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export function authenticationMiddleware(req: Request & { user: UserEntity }, res: Response, next: Function) {
  if (req.url.includes('user/login') || req.url.includes('user/signup')) {
    next();
  } else if (!req.cookies) {
    throw new UnauthorizedException();
  } else {
    const cookieData = req.cookies['homeboi-login'] ?? Buffer.from('{}').toString('base64');
    const homeboiLogin = JSON.parse(Buffer.from(cookieData, 'base64').toString());
    getRepository(UserEntity).findOne({
      password: homeboiLogin.password,
      email: homeboiLogin.email
    }).then((user) => {
      req.user = user;
      next();
    }, () => {
      throw new UnauthorizedException();
    });
  }
}

