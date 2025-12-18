import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

// JWT Strategy = kifeh bech yverifiyi el token w yjiblék el user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService, // Bech ne9raw el JWT_SECRET mel .env
    private usersService: UsersService,   // Bech nlaweou 3la el user
  ) {
    super({
      // Kifeh bech yextracti el token mel request?
      // Mel header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Ntékeweléch expired tokens (ken token 9dim, yraja3 error)
      ignoreExpiration: false,
      
      // Secret key bech yverifiyi el token (nafs el secret li 3malna bih el token)
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Hedhi etsir automatiquement ba3d ma yverifiyi el token
  // payload = el data li 7atténeha fel token (id, email, role)
  async validate(payload: any) {
    // Nlaweou 3la el user b el ID li fel token
    const user = await this.usersService.findById(payload.sub);

    // Ken user ma l9inéhech, yraja3 error (token invalid)
    if (!user) {
      throw new UnauthorizedException('User ma l9inéhech, token ghalet');
    }

    // Nraja3ou el user (yetsajjel automatiquement fel request.user)
    // Ba3d hekka ay endpoint y9adder yjib user mel request
    return { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    };
  }
}