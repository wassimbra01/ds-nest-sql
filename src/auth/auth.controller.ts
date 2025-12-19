import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

// Controller mta3 l'authentification
// Route de base: /api/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /api/auth/register - Inscription
  // Public = ma y7tajjch token (ma 3andékch compte yet)
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED) // 201 Created
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  // POST /api/auth/register-admin - Créer admin (admin berk)
  // Hedha yesta3mlou admin bech ya3ml admin akher
  @Post('register-admin')
  @UseGuards(JwtAuthGuard) // Lazem tkoun connecté
  @HttpCode(HttpStatus.CREATED)
  async registerAdmin(
    @Body() registerDto: RegisterDto, 
    @Request() req
  ) {
    // N7ottou role ADMIN fel DTO
    registerDto.role = 'ADMIN' as any;
    return await this.authService.register(registerDto, req.user);
  }

  // POST /api/auth/login - Connexion
  // Public = ma y7tajjch token
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK) // 200 OK
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}