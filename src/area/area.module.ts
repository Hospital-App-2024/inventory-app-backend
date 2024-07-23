import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';

@Module({
  imports: [],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
