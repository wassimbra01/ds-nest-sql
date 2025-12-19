import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

// Module mta3 users - yorganisi kol chay related lel users
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import el entity User bech nesta3mlouh fil repository
  ],
  controllers: [UsersController], // El controller mta3 users
  providers: [UsersService],      // El service mta3 users
  exports: [UsersService],        // Export el service bech modules okhra yesta3mlouh (auth module y7tajjou)
})
export class UsersModule {}