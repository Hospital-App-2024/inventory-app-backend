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
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceService } from './resource.service';

@Controller('resources')
export class ResourceController {
  public constructor(private readonly resourceService: ResourceService) {}

  @Get()
  public findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    return this.resourceService.findAll(paginationAndFilterDto);
  }

  @Post()
  public create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(id, updateResourceDto);
  }
}
