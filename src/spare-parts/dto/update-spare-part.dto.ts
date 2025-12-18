import { IsNumber, IsOptional, Min } from 'class-validator';

// DTO bech nbaddlou pièce (stock walla prix)
// Kol chay optionnel 7atta nbaddlou ken eli n7ebbou
export class UpdateSparePartDto {
  // Stock optionnel, ken bech tbaddlou
  @IsNumber({}, { message: 'Stock lazem ykoun nombre' })
  @Min(0, { message: 'Stock manajjamch ykoun négatif' })
  @IsOptional()
  stock?: number;

  // Prix optionnel, ken bech tbaddlou
  @IsNumber({}, { message: 'Prix lazem ykoun nombre' })
  @Min(0, { message: 'Prix manajjamch ykoun négatif' })
  @IsOptional()
  price?: number;
}
