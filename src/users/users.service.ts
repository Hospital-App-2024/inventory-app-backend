import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { UserMapper } from './mapper/userMapper';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.findOneByEmail(createUserDto.email);

    if (isUserExist) {
      throw new ConflictException('User with this email already exists');
    }

    const { password, ...rest } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        ...rest,
        password: bcryptjs.hashSync(password, 10),
      },
    });

    return UserMapper.toPublicUser(newUser);
  }

  public comparePassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }
}
