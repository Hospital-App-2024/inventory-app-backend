import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateWorkerDto {
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

  @IsString({
    message: 'Propiedad lastName debe ser un string',
  })
  @IsUUID(4, {
    message: 'Propiedad areaId debe ser un UUID',
  })
  areaId: string;
}
