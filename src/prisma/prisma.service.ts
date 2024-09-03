import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PrismaService');


  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');

    const users = await this.user.findMany();

    if (users.length === 0) {
      await this.user.create({
        data: {
          email: 'prueba@gmail.com',
          password: bcryptjs.hashSync('12345678'),
          name: "prueba",
          role: UserRole.ADMIN,
          isActive: true
        }
      })
      this.logger.log('User Create');
    }

  }
}
