import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../users/enums/user-role.enum';

// Service mta3 l'authentification
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Service users
    private jwtService: JwtService,     // Service JWT
  ) {}

  // Inscription = créer compte jdid
  async register(registerDto: RegisterDto, currentUser?: any) {
    // Nverifiw el role: Ken y7ebb ya3ml admin, lazem ykoun admin
    if (registerDto.role === UserRole.ADMIN) {
      // Ken el user connecté mch admin, manajjamch ya3ml admin jdid
      if (!currentUser || currentUser.role !== UserRole.ADMIN) {
        throw new BadRequestException(
          'Ken admin berk yanjjem ya3ml admin akher'
        );
      }
    }

    // Na3mlou el user (users service yverifiyi email w y7awel password)
    const user = await this.usersService.create(registerDto);

    // Ma nraja3ouch el password
    delete user.password;

    return {
      message: 'User tcréa b njet7',
      user,
    };
  }

  // Login = connexion
  async login(loginDto: LoginDto) {
    // 1. Nlaweou 3la el user b email
    const user = await this.usersService.findByEmail(loginDto.email);

    // 2. Nverifiw elli user mawjoud w password ça7i7
    if (!user) {
      throw new UnauthorizedException('Email walla password ghalet');
    }

    // Ncomparaw el password li dkhalouh mé3a el password mhawel fil database
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email walla password ghalet');
    }

    // 3. Na3mlou payload bech n7ottou fil token
    const payload = {
      sub: user.id,       // sub = subject = ID mta3 el user
      email: user.email,
      role: user.role,
    };

    // 4. N9eneriyyou el JWT token
    const accessToken = this.jwtService.sign(payload);

    // 5. Nraja3ou el token w el user info
    return {
      access_token: accessToken, // Token bech yesta3mlou fel requests
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}