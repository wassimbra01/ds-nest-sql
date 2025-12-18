import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { DeviceGrade } from '../enums/device-grade.enum';

// DTO bech nenregistriw appareil jdid
export class CreateDeviceDto {
  // Serial number unique mta3 el appareil (obligatoire)
  @IsString({ message: 'Serial number lazem ykoun texte' })
  @IsNotEmpty({ message: 'Serial number obligatoire' })
  serialNumber: string;

  // Marque (obligatoire, ex: Apple, Samsung)
  @IsString({ message: 'Marque lazem tkoun texte' })
  @IsNotEmpty({ message: 'Marque obligatoire' })
  brand: string;

  // Model (obligatoire, ex: iPhone 12, Galaxy S21)
  @IsString({ message: 'Model lazem ykoun texte' })
  @IsNotEmpty({ message: 'Model obligatoire' })
  model: string;

  // Grade optionnel (par défaut NONE)
  @IsEnum(DeviceGrade, { message: 'Grade lazem ykoun A, B, C walla NONE' })
  @IsOptional()
  grade?: DeviceGrade;
}