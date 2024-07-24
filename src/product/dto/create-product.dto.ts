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
    message: 'Propiedad resourceId debe ser un UUID',
  })
  resourceId: string;
}
