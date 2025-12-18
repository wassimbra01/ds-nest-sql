import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

// Guard bech yverifiyi elli el user 3andou el role required bech yodkhol lel endpoint
// Exemple: @Roles(UserRole.ADMIN) = Ken el user mch admin, ma yodkhléch
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Nel9aw el roles required mel decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(), // Nel9aw fel method
      context.getClass(),   // Nel9aw fel class
    ]);

    // Ken ma fammech roles required (ma 7atténéch @Roles()), khalih yodkhol
    if (!requiredRoles) {
      return true;
    }

    // Njibou el user mel request (ba3d JWT auth)
    const { user } = context.switchToHttp().getRequest();

    // Nverifiw ken el user 3andou we7ed mel roles required
    const hasRole = requiredRoles.some((role) => user.role === role);

    // Ken ma 3andouch el role, yraja3 error 403 Forbidden
    if (!hasRole) {
      throw new ForbiddenException(
        'Ma 3andekch el permission bech ta3ml hekka, lazem tkoun ' + requiredRoles.join(' walla ')
      );
    }

    // User 3andou el role, khalih yodkhol
    return true;
  }
}