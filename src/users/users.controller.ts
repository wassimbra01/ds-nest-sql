import { 
  Controller, 
  Get, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';

// Controller mta3 users
// Route de base: /api/users
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Kol el endpoints y7otou guards
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /api/users/profile - Profil el user connecté
  // Admin bark inajem ychouf
  @Get('profile')
  @Roles(UserRole.ADMIN) // Admin only
  async getProfile(@Request() req) {
    return await this.usersService.getProfile(req.user.id);
  }

  // GET /api/users - Liste kol el users (optionnel)
  @Get()
  @Roles(UserRole.ADMIN) // Admin only
  async findAll() {
    return await this.usersService.findAll();
  }
}