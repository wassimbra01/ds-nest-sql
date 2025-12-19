import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionsController } from './interventions.controller';
import { InterventionsService } from './interventions.service';
import { Intervention } from './entities/intervention.entity';
import { DevicesModule } from '../devices/devices.module';
import { SparePartsModule } from '../spare-parts/spare-parts.module';

// Module mta3 interventions
@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention]), // Import entity Intervention
    DevicesModule,     // Import devices module bech nesta3mlou DevicesService
    SparePartsModule,  // Import spare-parts module bech nesta3mlou SparePartsService
  ],
  controllers: [InterventionsController],
  providers: [InterventionsService],
  exports: [InterventionsService],
})
export class InterventionsModule {}