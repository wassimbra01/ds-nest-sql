import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

// Controller mta3 pièces détachées
// Route de base: /api/parts
@Controller('parts')
@UseGuards(JwtAuthGuard) // Kol el endpoints y7ottou authentication
export class SparePartsController {
  constructor(private sparePartsService: SparePartsService) {}

  // GET /api/parts - Liste kol el pièces
  // Kol wa7ed y9adder ychouf (admin w tech)
  @Get()
  async findAll() {
    return await this.sparePartsService.findAll();
  }

  // GET /api/parts/:id - Jib pièce b ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.sparePartsService.findOne(id);
  }

  // POST /api/parts - Créer pièce jdida
  // Admin berk
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSparePartDto: CreateSparePartDto) {
    return await this.sparePartsService.create(createSparePartDto);
  }

  // PATCH /api/parts/:id - Modifier pièce (stock walla prix)
  // Admin berk
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return await this.sparePartsService.update(id, updateSparePartDto);
  }

  // DELETE /api/parts/:id - 7athef pièce
  // Admin berk
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.sparePartsService.remove(id);
    return { message: 'Pièce t7athfet b njet7' };
  }
}