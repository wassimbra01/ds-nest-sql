import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

// Controller mta3 appareils
// Route de base: /api/devices
@Controller('devices')
@UseGuards(JwtAuthGuard) // Lazem tkoun connecté
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  // GET /api/devices - Liste kol el appareils
  // Kol wa7ed y9adder ychouf
  @Get()
  async findAll() {
    return await this.devicesService.findAll();
  }

  // GET /api/devices/:id - Jib appareil b ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.devicesService.findOne(id);
  }

  // POST /api/devices - Enregistrer appareil jdid
  // Kol wa7ed y9adder yenregistri appareil (admin w tech)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }

  // DELETE /api/devices/:id - 7athef appareil
  // Admin berk (bech ma yfaskhouch el techs)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.devicesService.remove(id);
    return { message: 'Appareil t7athef b njet7' };
  }
}
