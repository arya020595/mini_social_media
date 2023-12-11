import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  postId: number;
}
