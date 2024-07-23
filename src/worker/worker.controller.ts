import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PaginationAndFilterDto } from '../common/dto/paginationAndFilter.dto';
import { WorkerService } from './worker.service';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { CreateWorkerDto } from './dto/create-worker.dto';

@Controller('workers')
export class WorkerController {
  public constructor(private readonly workerService: WorkerService) {}

  @Get()
  public findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    return this.workerService.findAll(paginationAndFilterDto);
  }

  @Post()
  public create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    return this.workerService.update(id, updateWorkerDto);
  }
}
