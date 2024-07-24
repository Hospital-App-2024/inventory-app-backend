import { ResourceTypes } from '@prisma/client';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateResourceDto {
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
  @IsEnum(ResourceTypes, {
    message: `Propiedad type debe ser uno de los siguientes valores: ${Object.values(
      ResourceTypes,
    ).join(', ')}`,
  })
  type: ResourceTypes;
}
