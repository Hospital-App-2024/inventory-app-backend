import { ProductStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
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
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
  @IsEnum(ProductStatus, {
    message: `Propiedad status debe ser uno de los siguientes valores: ${Object.values(
      ProductStatus,
    ).join(', ')}`,
  })
  status: ProductStatus;
  @IsUUID('4', {
    message: 'Propiedad ownerId debe ser un UUID',
  })
  ownerId: string;
  @IsString({
    message: 'Propiedad inventoryNumber debe ser un string',
  })
  @MinLength(3, {
    message: 'Propiedad inventoryNumber debe tener al menos 3 caracteres',
  })
  inventoryNumber: string;
}
