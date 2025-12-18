import { 
  Injectable, 
  NotFoundException, 
  ConflictException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

// Service mta3 les pièces détachées
@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private sparePartsRepository: Repository<SparePart>,
  ) {}

  // Na3mlou pièce jdida
  async create(createSparePartDto: CreateSparePartDto): Promise<SparePart> {
    // Nverifiw ken pièce b nafs el esm deja mawjouda
    const existing = await this.sparePartsRepository.findOne({
      where: { name: createSparePartDto.name },
    });

    if (existing) {
      throw new ConflictException('Pièce b nafs el esm deja mawjouda');
    }

    // Na3mlou pièce jdida
    const sparePart = this.sparePartsRepository.create(createSparePartDto);
    return await this.sparePartsRepository.save(sparePart);
  }

  // Njibou kol el pièces
  async findAll(): Promise<SparePart[]> {
    return await this.sparePartsRepository.find({
      order: { name: 'ASC' }, // Sorted b esm alphabétiquement
    });
  }

  // Nlaweou 3la pièce b ID
  async findOne(id: number): Promise<SparePart> {
    const sparePart = await this.sparePartsRepository.findOne({ 
      where: { id } 
    });

    if (!sparePart) {
      throw new NotFoundException(`Pièce b ID ${id} ma l9inéhéch`);
    }

    return sparePart;
  }

  // Nbaddlou pièce (stock walla prix)
  async update(id: number, updateSparePartDto: UpdateSparePartDto): Promise<SparePart> {
    // Nlaweou 3la el pièce
    const sparePart = await this.findOne(id);

    // Nbaddlou el valeurs (Object.assign yzid el valeurs jdod)
    Object.assign(sparePart, updateSparePartDto);

    // Nsajjlou el modifications
    return await this.sparePartsRepository.save(sparePart);
  }

  // N7athfou pièce
  async remove(id: number): Promise<void> {
    const sparePart = await this.findOne(id);
    await this.sparePartsRepository.remove(sparePart);
  }

  // Na9sou mel stock (utilisé fil interventions)
  // Hedhi el fonction IMPORTANT barcha bech el stock manazzelch ta7t 0
  async decrementStock(id: number, quantity: number): Promise<void> {
    const sparePart = await this.findOne(id);

    // Nverifiw elli famma stock kéfi
    if (sparePart.stock < quantity) {
      throw new ConflictException(
        `Stock ma kifféch: 3andek ${sparePart.stock}, t7ebb ${quantity} mel ${sparePart.name}`
      );
    }

    // Na9sou mel stock
    sparePart.stock -= quantity;
    await this.sparePartsRepository.save(sparePart);
  }
}