import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Provider
} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

export const joinPathFactory: Provider = {
  provide: 'JOIN_PATH',
  useFactory: () => join
};

export const JOIN_PATH = 'JOIN_PATH';

@Catch(HttpException)
@Injectable()
export class CustomHttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const status = exception.getStatus();
    const code = +exception.message;

    if (status === HttpStatus.NOT_FOUND && !request.url.includes('api')) {
      response.sendFile(this.joinPath(__dirname, '..', 'homeboi', 'index.html'));
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        code: isNaN(code) ? exception.message : code
      });
    }
  }

  constructor(@Inject(JOIN_PATH) private readonly joinPath) {}
}
