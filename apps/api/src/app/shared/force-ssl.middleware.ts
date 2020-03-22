import { NextFunction, Request, Response } from 'express';

export function forceSSLMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.hostname, req.url].join(''));
  }
  next();
}
