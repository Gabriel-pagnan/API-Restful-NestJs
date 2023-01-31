import { IsJWT, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsJWT()
  token: string;
}
