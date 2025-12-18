import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/enums/user-role.enum';

// Key bech nesta3mlouh fil metadata (bech nsajjlou les roles required)
export const ROLES_KEY = 'roles';

// Decorator bech n7ottou 3la el endpoints: @Roles(UserRole.ADMIN, UserRole.TECH)
// Hedha y7ott fel metadata wech roles required bech ta3ml access lel endpoint
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);