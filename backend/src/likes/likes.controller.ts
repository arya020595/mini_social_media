import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LikesService } from './likes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: Prisma.LikeCreateInput) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  // @Delete(':authorId/:postId')
  // remove(@Param('authorId') authorId: string, @Param('postId') postId: string) {
  //   return this.likesService.remove(+authorId, +postId);
  // }
}
