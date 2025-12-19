
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// Module mta3 l'authentification - hné n7ottou kol chay related lel login w JWT
@Module({
  imports: [
    UsersModule,      // Import users module bech nesta3mlou UsersService
    PassportModule,   // Passport bech ya3ml JWT strategy
    
    // Configuration JWT - hné n7ottou kifeh bech ya3ml el tokens
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Import config bech ne9raw mel .env
      inject: [ConfigService],  // Inject config service
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // El secret key mel .env bech n9eneriyyou w nverifiw el tokens
        signOptions: {
          expiresIn: '24h', // El token yab9a shi7 24 se3a, ba3d hekka yexpiri w lazem ya3mlou login jdid
        },
      }),
    }),
  ],
  controllers: [AuthController], // El controller eli fiha el endpoints mta3 login w register
  providers: [
    AuthService,    // El service eli fiha el logique mta3 login w register
    JwtStrategy,    // El strategy eli tverififi el token fil kol request
    // N7ottou JwtAuthGuard kif global guard - ya3ni ykoun 3la kol el endpoints automatically
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService], // Export el service bech modules okhra inajmou yesta3mlouh
})
export class AuthModule {}