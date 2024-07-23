import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationAndFilterDto } from 'src/common/dto/paginationAndFilter.dto';
import { createPagination } from 'src/common/helper/createPagination';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger('WorkerService');

  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    const take = paginationAndFilterDto?.limit;
    const page = paginationAndFilterDto?.page;
    const search = paginationAndFilterDto?.search;

    const isPagination = take && page;

    const count = await this.prismaService.worker.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    const workers = await this.prismaService.worker.findMany({
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
      data: workers,
      meta: createPagination({
        page,
        take,
        count: count,
      }),
    };
  }

  public async findOne(id: string) {
    const worker = await this.prismaService.worker.findUnique({
      where: {
        id,
      },
    });

    return worker;
  }

  public async create(createWorkerDto: CreateWorkerDto) {
    const worker = await this.prismaService.worker.create({
      data: createWorkerDto,
    });

    return worker;
  }

  public async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const workerExist = await this.findOne(id);

    if (!workerExist) {
      throw new NotFoundException(`Trabajador con id ${id} no encontrado`);
    }

    const worker = await this.prismaService.worker.update({
      where: {
        id,
      },
      data: updateWorkerDto,
    });

    return worker;
  }
}
