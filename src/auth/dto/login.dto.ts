import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// DTO lel login, bech yvalidé email w password
export class LoginDto {
  // Email lazem ykoun ça7i7 w mch vide
  @IsEmail({}, { message: 'Email mch ça7i7' })
  @IsNotEmpty({ message: 'Email obligatoire' })
  email: string;

  // Password lazem ykoun string w mch vide
  @IsString({ message: 'Password lazem ykoun texte' })
  @IsNotEmpty({ message: 'Password obligatoire' })
  password: string;
}
