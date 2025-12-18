import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

// DTO bech na3mlou intervention (réparation) jdida
export class CreateInterventionDto {
  // ID mta3 el appareil li bech yetçalla7 (obligatoire)
  @IsNumber({}, { message: 'Device ID lazem ykoun nombre' })
  @IsNotEmpty({ message: 'Device ID obligatoire' })
  deviceId: number;

  // Description el réparation: chnou bech ya3ml el technicien? (obligatoire)
  @IsString({ message: 'Description lazem tkoun texte' })
  @IsNotEmpty({ message: 'Description obligatoire' })
  description: string;

  // Array des IDs mta3 les pièces li bech yesta3mlou (lazem fih 3al a9al we7da)
  @IsArray({ message: 'Spare parts lazem ykoun array' })
  @ArrayMinSize(1, { message: 'Lazem testa3mel spare part we7ed 3al a9al' })
  @IsNumber({}, { each: true, message: 'Kol spare part ID lazem ykoun nombre' })
  sparePartIds: number[];
}