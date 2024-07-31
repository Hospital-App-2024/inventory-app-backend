import { Owner } from '@prisma/client';

const OwnerTypes = {
  AREA: 'Área',
  WORKER: 'Trabajador',
};

export interface Product {
  id: string;
  name: string;
  quantity: number;
  status: string;
  ownerId: string;
  image: string;
  inventoryNumber: string;
  owner?: Owner;
}

interface Options {
  products: Product[];
  withOwner?: boolean;
}

export class ProductMapper {
  public constructor() {}

  public static mapToDto(product: Product) {
    return {
      ...product,
    };
  }

  public static mapToProductWithOwnerDto(product: Product) {
    const { owner, ...rest } = product;

    return {
      ...rest,
      ownerName: owner.name,
      ownerType: OwnerTypes[owner.type],
    };
  }

  public static mapToDtos({ products, withOwner }: Options) {
    return withOwner
      ? products.map((product) => this.mapToProductWithOwnerDto(product))
      : products.map((product) => this.mapToDto(product));
  }
}
