import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';

// Module principal - yorganisi kol el modules mta3 l'application
@Module({
  imports: [
    // Configuration module - bech ne9raw mel .env
    ConfigModule.forRoot({
      isGlobal: true,      // Global = kol el modules y9addrou yesta3mlouh
      envFilePath: '.env', // Path el fichier .env
    }),

    // TypeORM configuration - connection lel database MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',    // Database type
        host: configService.get('DB_HOST'),       // Host mel .env
        port: +configService.get('DB_PORT'),      // Port mel .env (+ = convert to number)
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Kol el entities
        synchronize: true, // TRUE lel dev (auto-sync schema), FALSE lel production (nesta3mlou migrations)
        logging: true,     // TRUE bech ychoufou el queries fil console (dev mode)
      }),
    }),

    // Kol el modules mta3na
    AuthModule,
    UsersModule,
    SparePartsModule,
    DevicesModule,
    InterventionsModule,
  ],
})
export class AppModule {}
