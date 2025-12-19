import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePartsController } from './spare-parts.controller';
import { SparePartsService } from './spare-parts.service';
import { SparePart } from './entities/spare-part.entity';

// Module mta3 pièces détachées
@Module({
  imports: [
    TypeOrmModule.forFeature([SparePart]), // Import entity SparePart
  ],
  controllers: [SparePartsController],
  providers: [SparePartsService],
  exports: [SparePartsService], // Export bech interventions module yesta3mlou
})
export class SparePartsModule {}
