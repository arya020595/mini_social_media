import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Like } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.create(createLikeDto);
  }

  @Delete()
  remove(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.remove(createLikeDto);
  }
}
