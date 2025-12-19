import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param,
  UseGuards, 
  Request,
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

// Controller mta3 interventions
// Route de base: /api/interventions
@Controller('interventions')
@UseGuards(JwtAuthGuard, RolesGuard) // Authentication w roles
export class InterventionsController {
  constructor(private interventionsService: InterventionsService) {}

  // POST /api/interventions - Créer intervention jdida
  // Technicien berk (manager ma ya3mléch réparations)
  @Post()
  @Roles(UserRole.TECH) // Tech only
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInterventionDto: CreateInterventionDto,
    @Request() req,
  ) {
    // El technicien connecté yetsajjel kif auteur automatiquement
    return await this.interventionsService.create(
      createInterventionDto,
      req.user.id, // ID el technicien mel token
    );
  }

  // GET /api/interventions - Liste kol el interventions
  // Admin w tech ynajjmou ychoufou
  @Get()
  @Roles(UserRole.ADMIN, UserRole.TECH)
  async findAll() {
    return await this.interventionsService.findAll();
  }

  // GET /api/interventions/:id - Jib intervention b ID
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TECH)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.interventionsService.findOne(id);
  }

  // GET /api/interventions/technician/:id - Interventions mta3 technicien
  @Get('technician/:id')
  @Roles(UserRole.ADMIN, UserRole.TECH)
  async findByTechnician(@Param('id', ParseIntPipe) technicianId: number) {
    return await this.interventionsService.findByTechnician(technicianId);
  }

  // GET /api/interventions/device/:id - Interventions mta3 appareil
  @Get('device/:id')
  @Roles(UserRole.ADMIN, UserRole.TECH)
  async findByDevice(@Param('id', ParseIntPipe) deviceId: number) {
    return await this.interventionsService.findByDevice(deviceId);
  }
}