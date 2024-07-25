import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPagination } from 'src/common/helper/createPagination';
import { PaginationAndFilterDto } from 'src/common/dto/paginationAndFilter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Folder } from 'src/common/helper/folder';
import { ProductMapper } from './mapper/product.mapper';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    const take = paginationAndFilterDto?.limit;
    const page = paginationAndFilterDto?.page;
    const search = paginationAndFilterDto?.search;

    const isPagination = take && page;

    const [count, products] = await Promise.all([
      this.prismaService.product.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
      this.prismaService.product.findMany({
        take: isPagination && take,
        skip: isPagination && take * (page - 1),
        include: {
          resource: true,
        },
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'desc',
        },
      }),
    ]);

    return {
      data: ProductMapper.mapToDtos({
        products: products,
        withResource: true,
      }),
      meta: createPagination({
        page,
        take,
        count: count,
      }),
    };
  }

  public async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  public async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    const { secure_url } = await this.cloudinaryService.uploadFile(
      file,
      Folder.PRODUCTS,
    );

    const product = await this.prismaService.product.create({
      data: {
        ...createProductDto,
        image: secure_url,
      },
    });

    return ProductMapper.mapToDto(product);
  }

  public async update(id: string, updateProductDto: UpdateProductDto) {
    const productExist = await this.findOne(id);

    if (!productExist) {
      throw new NotFoundException(`Área con id ${id} no encontrada`);
    }

    const product = await this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    return ProductMapper.mapToDto(product);
  }
}
