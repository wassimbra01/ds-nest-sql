import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enum';

// DTO = Data Transfer Object
// Hedha yesta3mel bech nvalidé el data li tejina mel client
export class RegisterDto {
  // Email lazem ykoun format email ça7i7 w mch vide
  @IsEmail({}, { message: 'Email mch ça7i7, lazem format email sé7i7' })
  @IsNotEmpty({ message: 'Email obligatoire, ma tnajjamch tkhalih farigh' })
  email: string;

  // Username lazem ykoun string w mch vide
  @IsString({ message: 'Username lazem ykoun texte' })
  @IsNotEmpty({ message: 'Username obligatoire' })
  username: string;

  // Password lazem ykoun 6 caractères 3al a9al bech ykoun secure
  @IsString({ message: 'Password lazem ykoun texte' })
  @MinLength(6, { message: 'Password lazem ykoun 6 caractères 3al a9al' })
  @IsNotEmpty({ message: 'Password obligatoire' })
  password: string;

  // Role optionnel (ken admin bech y7ott ADMIN, sinon par défaut TECH)
  @IsEnum(UserRole, { message: 'Role lazem ykoun ADMIN walla TECH' })
  @IsOptional() // Optionnel = ken ma 7attéhech yabda TECH
  role?: UserRole;
}