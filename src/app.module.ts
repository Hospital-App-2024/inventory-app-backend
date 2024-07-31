import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './owner/owner.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, ResourceModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
