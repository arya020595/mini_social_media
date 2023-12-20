import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The caption of the post' })
  @IsString()
  @IsNotEmpty()
  caption: string;

  @ApiProperty({
    description: 'The tag associated with the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({ description: 'The image URL of the post' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'The image ID of the post' })
  @IsString()
  @IsOptional()
  imageId?: string;

  @ApiProperty({
    description: 'The publish status of the post',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
