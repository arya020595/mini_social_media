import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the author who is liking the post',
    example: 1, // Optional: You can provide an example value
    required: true,
  })
  authorId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the post that is being liked',
    example: 2, // Optional: You can provide an example value
    required: true,
  })
  postId: number;
}
