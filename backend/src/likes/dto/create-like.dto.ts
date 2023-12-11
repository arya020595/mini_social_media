import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postId: number;
}
