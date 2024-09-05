import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPagination } from 'src/common/helper/createPagination';
import { PaginationAndFilterDto } from 'src/common/dto/paginationAndFilter.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OwnerService {
  private readonly logger = new Logger('OwnerService');

  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    const take = paginationAndFilterDto?.limit;
    const page = paginationAndFilterDto?.page;
    const search = paginationAndFilterDto?.search;

    const isPagination = take && page;

    const [count, owner] = await Promise.all([
      this.prismaService.owner.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
      this.prismaService.owner.findMany({
        take: isPagination && take,
        skip: isPagination && take * (page - 1),
        include: {
          Product: true
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
      data: owner,
      meta: createPagination({
        page,
        take,
        count: count,
      }),
    };
  }

  public async findOne(id: string) {
    const owner = await this.prismaService.owner.findUnique({
      where: {
        id,
      },
    });

    return owner;
  }

  public async create(createOwnerDto: CreateOwnerDto) {
    try {
      const owner = await this.prismaService.owner.create({
        data: createOwnerDto,
      });
  
      return owner;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch(error.code) {
          case 'P2002':
            throw new ConflictException("Nombre de propietario ya existe")
        }
      }

      throw new InternalServerErrorException("Error al crear un propietario")

    }
  }

  public async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    const ownerExist = await this.findOne(id);

    if (!ownerExist) {
      throw new NotFoundException(`Área con id ${id} no encontrada`);
    }

    const owner = await this.prismaService.owner.update({
      where: {
        id,
      },
      data: updateOwnerDto
    });

    return owner;
  }
}
