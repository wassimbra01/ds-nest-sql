import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator bech najjmou nejbdou el user mel request directly
// Exemple: getProfile(@GetUser() user: User) {}
// Au lieu de: getProfile(@Request() req) { const user = req.user }
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Nejbdou el request mel context
    const request = ctx.switchToHttp().getRequest();
    // Nraja3ou el user li mawjoud fil request (ba3d el authentication)
    return request.user;
  },
);
