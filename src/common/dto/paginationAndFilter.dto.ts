import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationAndFilterDto {
  @IsPositive({
    message: 'El valor del límite debe ser un número positivo',
  })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsPositive({
    message: 'El valor de la página debe ser un número positivo',
  })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsString({
    message: 'El valor de la búsqueda debe ser un texto',
  })
  @IsOptional()
  search?: string;
}
