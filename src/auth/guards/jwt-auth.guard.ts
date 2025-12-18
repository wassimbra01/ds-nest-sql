import { 
  Injectable, 
  ExecutionContext, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// Guard bech yverifiyi elli el user 3andou token JWT ça7i7
// Hedha yesta3mel 3la kol endpoint bech yprotégih
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(); // Super = na3mlou call lel constructor mta3 AuthGuard
  }

  // Fonction li tsir 9bal ma yodkhol lel endpoint
  canActivate(context: ExecutionContext) {
    // Nverifiw ken el endpoint public (3andou @Public() decorator)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Nel9aw fel method
      context.getClass(),   // Nel9aw fel class
    ]);

    // Ken public, khalih yodkhol bila ma yverifiyi token
    if (isPublic) {
      return true;
    }

    // Sinon, yverifiyi el token b el JWT strategy
    return super.canActivate(context);
  }

  // Fonction li etsir ba3d ma yverifiyi el token
  handleRequest(err, user, info) {
    // Ken famma error walla user ma l9ahech (token ghalet), yraja3 error
    if (err || !user) {
      throw err || new UnauthorizedException('Lazem tkoun connecté, token ghalet walla expéré');
    }
    // User mawjoud w token ça7i7, rja3 el user
    return user;
  }
}