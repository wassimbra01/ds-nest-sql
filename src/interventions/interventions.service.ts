import { 
  Injectable, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { DevicesService } from '../devices/devices.service';
import { SparePartsService } from '../spare-parts/spare-parts.service';
import { DeviceStatus } from '../devices/enums/device-status.enum';

// Service mta3 les interventions - EL IMPORTANT BARCHA!
@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>,
    private devicesService: DevicesService,       // Service devices
    private sparePartsService: SparePartsService, // Service pièces
    private dataSource: DataSource,               // Bech na3mlou transactions SQL
  ) {}

  // Na3mlou intervention jdida - HEDHI EL FONCTION EL PLUS IMPORTANTE!
  // Transaction = kol el opérations ysirrou walla ma ysirrouch (all or nothing)
  async create(
    createInterventionDto: CreateInterventionDto, 
    technicianId: number
  ): Promise<Intervention> {
    // Na3mlou query runner bech nmanipuliw el transaction
    const queryRunner = this.dataSource.createQueryRunner();
    
    // N7ottou connection
    await queryRunner.connect();
    
    // Nabdew el transaction
    await queryRunner.startTransaction();

    try {
      // ===== ÉTAPE 1: Nverifiw el appareil mawjoud =====
      const device = await this.devicesService.findOne(
        createInterventionDto.deviceId
      );

      if (!device) {
        throw new NotFoundException('Appareil ma l9inéhech');
      }

      // ===== ÉTAPE 2: Njibou kol el pièces w nverifiw el stock =====
      const spareParts = [];
      
      for (const partId of createInterventionDto.sparePartIds) {
        // Nlaweou 3la kol pièce
        const part = await this.sparePartsService.findOne(partId);
        
        // Nverifiw elli el stock kifféh (3andna 3al a9al we7da)
        if (part.stock < 1) {
          throw new BadRequestException(
            `Stock mta3 "${part.name}" ma kifféch. Stock actuel: ${part.stock}`
          );
        }

        spareParts.push(part);
      }

      // ===== ÉTAPE 3: Na9sou mel stock mta3 kol pièce =====
      // Hedhi el partie CRITIQUE: Na9sou mel stock atomiquement
      for (const part of spareParts) {
        await this.sparePartsService.decrementStock(part.id, 1);
      }

      // ===== ÉTAPE 4: Nbaddlou status el appareil l REPAIRING =====
      await this.devicesService.updateStatus(
        device.id, 
        DeviceStatus.REPAIRING
      );

      // ===== ÉTAPE 5: Na3mlou el intervention =====
      const intervention = this.interventionsRepository.create({
        description: createInterventionDto.description,
        technician: { id: technicianId }, // El technicien connecté
        device: device,
        spareParts: spareParts,
      });

      // Nsajjlou el intervention fil database
      const savedIntervention = await queryRunner.manager.save(intervention);

      // ===== COMMIT: Kol chay mché behi, n'confirmiw el transaction =====
      await queryRunner.commitTransaction();

      // Njibou el intervention b kol el relations bech nraja3ouha complete
      return await this.interventionsRepository.findOne({
        where: { id: savedIntervention.id },
        relations: ['technician', 'device', 'spareParts'],
      });

    } catch (error) {
      // ===== ROLLBACK: Ken sar erreur, n'annuliw kol chay =====
      // Hedha y7afeth 3la data integrity: ken stock ma kifféch, 
      // ma tbaddléch el device status w ma t7othch intervention
      await queryRunner.rollbackTransaction();
      
      // Nraja3ou el error bech el controller ychoufha
      throw error;

    } finally {
      // N9afflou el connection (toujours fil finally bech etsir même ken sar error)
      await queryRunner.release();
    }
  }

  // Njibou kol el interventions
  async findAll(): Promise<Intervention[]> {
    return await this.interventionsRepository.find({
      relations: ['technician', 'device', 'spareParts'], // Njibou kol el relations
      order: { date: 'DESC' }, // El jdod lowlin
    });
  }

  // Njibou intervention we7da b ID
  async findOne(id: number): Promise<Intervention> {
    const intervention = await this.interventionsRepository.findOne({
      where: { id },
      relations: ['technician', 'device', 'spareParts'],
    });

    if (!intervention) {
      throw new NotFoundException(`Intervention b ID ${id} ma l9inéhéch`);
    }

    return intervention;
  }

  // Njibou interventions mta3 technicien mo3ayyan
  async findByTechnician(technicianId: number): Promise<Intervention[]> {
    return await this.interventionsRepository.find({
      where: { technician: { id: technicianId } },
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }

  // Njibou interventions mta3 device mo3ayyan
  async findByDevice(deviceId: number): Promise<Intervention[]> {
    return await this.interventionsRepository.find({
      where: { device: { id: deviceId } },
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }
}