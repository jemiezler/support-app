// src/auth/dto/validate-token.dto.ts
import { IsString } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  token: string;
}
