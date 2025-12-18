import { 
  Injectable, 
  NotFoundException, 
  ConflictException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceStatus } from './enums/device-status.enum';

// Service mta3 les appareils
@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  // Nenregistriw appareil jdid
  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    // Nverifiw ken serial number deja mawjoud
    const existing = await this.devicesRepository.findOne({
      where: { serialNumber: createDeviceDto.serialNumber },
    });

    if (existing) {
      throw new ConflictException(
        'Appareil b nafs el serial number deja mawjoud'
      );
    }

    // Na3mlou appareil jdid (status yabda PENDING automatically)
    const device = this.devicesRepository.create(createDeviceDto);
    return await this.devicesRepository.save(device);
  }

  // Njibou kol el appareils
  async findAll(): Promise<Device[]> {
    return await this.devicesRepository.find({
      order: { createdAt: 'DESC' }, // El jdod lowlin
    });
  }

  // Nlaweou 3la appareil b ID
  async findOne(id: number): Promise<Device> {
    const device = await this.devicesRepository.findOne({ 
      where: { id } 
    });

    if (!device) {
      throw new NotFoundException(`Appareil b ID ${id} ma l9inéhech`);
    }

    return device;
  }

  // Nbaddlou status mta3 el appareil (PENDING -> REPAIRING -> READY)
  async updateStatus(id: number, status: DeviceStatus): Promise<Device> {
    const device = await this.findOne(id);
    device.status = status;
    return await this.devicesRepository.save(device);
  }

  // N7athfou appareil
  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    await this.devicesRepository.remove(device);
  }
}
