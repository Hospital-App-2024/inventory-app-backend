import { Injectable, Logger } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationAndFilterDto } from 'src/common/dto/paginationAndFilter.dto';
import { createPagination } from 'src/common/helper/createPagination';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  private readonly logger = new Logger('AreaService');

  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    const take = paginationAndFilterDto?.limit;
    const page = paginationAndFilterDto?.page;
    const search = paginationAndFilterDto?.search;

    const isPagination = take && page;

    const count = await this.prismaService.area.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    const areas = await this.prismaService.area.findMany({
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
    });

    return {
      data: areas,
      meta: createPagination({
        page,
        take,
        count: count,
      }),
    };
  }

  public async create(createAreaDto: CreateAreaDto) {
    const area = await this.prismaService.area.create({
      data: createAreaDto,
    });

    return area;
  }

  public async update(id: string, updateAreaDto: UpdateAreaDto) {
    const area = await this.prismaService.area.update({
      where: {
        id,
      },
      data: updateAreaDto,
    });

    return area;
  }
}
