import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './resource/resource.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, ResourceModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
