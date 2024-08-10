import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(55)
  password: string;
}
