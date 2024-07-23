import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAreaDto {
  @IsString({
    message: 'Propiedad name debe ser un string',
  })
  @MinLength(3, {
    message: 'Propiedad name debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'Propiedad name debe tener como máximo 50 caracteres',
  })
  name: string;
}
