import { Module } from '@nestjs/common';
import { AreaModule } from './area/area.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [PrismaModule, AreaModule, WorkerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
