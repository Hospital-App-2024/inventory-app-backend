import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { PaginationAndFilterDto } from '../common/dto/paginationAndFilter.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('area')
export class AreaController {
  public constructor(private readonly areaService: AreaService) {}

  @Get()
  public findAll(paginationAndFilterDto: PaginationAndFilterDto) {
    return this.areaService.findAll(paginationAndFilterDto);
  }

  @Post()
  public create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areaService.update(id, updateAreaDto);
  }
}
