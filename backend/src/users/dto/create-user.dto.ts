// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
