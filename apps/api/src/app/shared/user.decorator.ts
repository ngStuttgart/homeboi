import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: any) => {
    return ctx.user;
  },
);
