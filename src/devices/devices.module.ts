import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';

// Module mta3 appareils
@Module({
  imports: [
    TypeOrmModule.forFeature([Device]), // Import entity Device
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService], // Export bech interventions module yesta3mlou
})
export class DevicesModule {}