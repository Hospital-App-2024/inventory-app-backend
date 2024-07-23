import { Module } from '@nestjs/common';
import { AreaModule } from './area/area.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AreaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
