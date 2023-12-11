// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  name: string;
}
