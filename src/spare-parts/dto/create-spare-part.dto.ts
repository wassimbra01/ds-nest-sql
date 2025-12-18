import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

// DTO bech na3mlou pièce jdida
export class CreateSparePartDto {
  // Esm el pièce lazem ykoun string w mch vide
  @IsString({ message: 'Esm el pièce lazem ykoun texte' })
  @IsNotEmpty({ message: 'Esm el pièce obligatoire' })
  name: string;

  // Stock lazem ykoun nombre w >= 0 (manajjamch ykoun négatif)
  @IsNumber({}, { message: 'Stock lazem ykoun nombre' })
  @Min(0, { message: 'Stock manajjamch ykoun négatif' })
  stock: number;

  // Prix lazem ykoun nombre w >= 0
  @IsNumber({}, { message: 'Prix lazem ykoun nombre' })
  @Min(0, { message: 'Prix manajjamch ykoun négatif' })
  price: number;
}