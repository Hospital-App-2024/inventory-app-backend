import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationAndFilterDto } from '../common/dto/paginationAndFilter.dto';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owners')
export class OwnerController {
  public constructor(private readonly ownerService: OwnerService) {}

  @Get()
  public findAll(@Query() paginationAndFilterDto: PaginationAndFilterDto) {
    return this.ownerService.findAll(paginationAndFilterDto);
  }

  @Post()
  public create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Patch(':id')
  public update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    return this.ownerService.update(id, updateOwnerDto);
  }
}
