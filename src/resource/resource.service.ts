import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPagination } from 'src/common/helper/createPagination';
import { CreateResourceDto } from './dto/create-resource.dto';
import { PaginationAndFilterDto } from 'src/common/dto/paginationAndFilter.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  private readonly logger = new Logger('ResourceService');

  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    const take = paginationAndFilterDto?.limit;
    const page = paginationAndFilterDto?.page;
    const search = paginationAndFilterDto?.search;

    const isPagination = take && page;

    const [count, resource] = await Promise.all([
      this.prismaService.resource.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
      this.prismaService.resource.findMany({
        take: isPagination && take,
        skip: isPagination && take * (page - 1),
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
      data: resource,
      meta: createPagination({
        page,
        take,
        count: count,
      }),
    };
  }

  public async findOne(id: string) {
    const resource = await this.prismaService.resource.findUnique({
      where: {
        id,
      },
    });

    return resource;
  }

  public async create(createResourceDto: CreateResourceDto) {
    const resource = await this.prismaService.resource.create({
      data: createResourceDto,
    });

    return resource;
  }

  public async update(id: string, updateResourceDto: UpdateResourceDto) {
    const resourceExist = await this.findOne(id);

    if (!resourceExist) {
      throw new NotFoundException(`Área con id ${id} no encontrada`);
    }

    const resource = await this.prismaService.resource.update({
      where: {
        id,
      },
      data: updateResourceDto,
    });

    return resource;
  }
}
