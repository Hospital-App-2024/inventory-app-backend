import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './owner/owner.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, ResourceModule, ProductModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
