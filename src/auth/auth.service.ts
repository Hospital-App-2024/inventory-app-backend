import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserMapper } from 'src/users/mapper/userMapper';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    if (
      !this.usersService.comparePassword(loginUserDto.password, user.password)
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id };

    return {
      token: this.getJwtToken(payload),
      user: UserMapper.toPublicUser(user),
    };
  }

  public async checkAuthStatus(user: User) {
    return {
      user: UserMapper.toPublicUser(user),
      token: this.getJwtToken({ id: user.id }),
    };
  }

  public async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
