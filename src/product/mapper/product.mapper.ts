import { Resource } from '@prisma/client';

const Status = {
  GOOD: 'Bueno',
  BAD: 'Malo',
  DISCONTINUED: 'Dado de baja',
  TRANSFERRED: 'Traspasado',
};

const ResourceTypes = {
  AREA: 'Área',
  WORKER: 'Trabajador',
};

export interface Product {
  id: string;
  name: string;
  quantity: number;
  status: string;
  resourceId: string;
  image: string;
  resource?: Resource;
}

interface Options {
  products: Product[];
  withResource?: boolean;
}

export class ProductMapper {
  public constructor() {}

  public static mapToDto(product: Product) {
    return {
      ...product,
      status: Status[product.status],
    };
  }

  public static mapToProductWithResourceDto(product: Product) {
    const { resource, ...rest } = product;

    return {
      ...rest,
      status: Status[rest.status],
      resourceName: resource.name,
      resourceType: ResourceTypes[resource.type],
    };
  }

  public static mapToDtos({ products, withResource }: Options) {
    return withResource
      ? products.map((product) => this.mapToProductWithResourceDto(product))
      : products.map((product) => this.mapToDto(product));
  }
}
